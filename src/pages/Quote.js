import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../components/index.components";
import "../styles/Quote.css";
import { Table, Container, Loader } from "semantic-ui-react";
import AuthStateGlobal from "../context/AuthStateGlobal";
import { orderBy } from "lodash";

const Quote = props => {
  const context = useContext(AuthStateGlobal);
  const [stateQuotes, setStateQuotes] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://35.195.25.70/api.php", {
      method: "POST",
      body: JSON.stringify({ action: "quote" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === "ok") {
          console.log("RESULT ", data);
          setStateQuotes(data.assets.map(item => ({ ...item, fav: false })));
        } else {
          console.log("RESULT NOT OK");
        }
        setLoading(false);
      })
      .catch(err => {
        console.log("ERROR:", err);
        setLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      history.push("/login");
    }
  });

  const handlerFav = index => {
    console.log(
      "stateQuotes",
      stateQuotes[index],
      stateQuotes.filter((it, inx) => inx !== index)
    );
    setStateQuotes(
      orderBy(
        [
          { ...stateQuotes[index], fav: !stateQuotes[index].fav },
          ...stateQuotes.filter((it, inx) => inx !== index)
        ],
        "fav",
        "desc"
      )
    );
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stateQuotes.map((item, index) => (
                <Table.Row key={index} onClick={() => handlerFav(index)}>
                  <Table.Cell>{item.fav ? 1 : 0}</Table.Cell>
                  <Table.Cell>{item.asset}</Table.Cell>
                  <Table.Cell>{item.startDate}</Table.Cell>
                  <Table.Cell>{item.quote}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      )}
    </>
  );
};

export default Quote;
