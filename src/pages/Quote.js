import React, { useEffect, useState } from "react";
import "../styles/Quote.css";
import { Table, Loader, Icon } from "semantic-ui-react";
import { orderBy } from "lodash";
import Body from "./Body";
import { formatDateStr } from "../helpers/dateFormat";

const Quote = props => {
  const [stateQuotes, setStateQuotes] = useState([]);
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
    <Body>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Валютная пара</Table.HeaderCell>
              <Table.HeaderCell>Котировка</Table.HeaderCell>
              <Table.HeaderCell>Дата получения</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {stateQuotes.map((item, index) => (
              <Table.Row key={index} onClick={() => handlerFav(index)}>
                <Table.Cell>
                  {item.fav ? (
                    <Icon name="star" />
                  ) : (
                    <Icon name="star outline" />
                  )}
                </Table.Cell>
                <Table.Cell>{item.asset}</Table.Cell>
                <Table.Cell>{formatDateStr(item.startDate)}</Table.Cell>
                <Table.Cell>{item.quote}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Body>
  );
};

export default Quote;
