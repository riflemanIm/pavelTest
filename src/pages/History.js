import React, { useEffect, useState } from "react";
import "../styles/Quote.css";
import { Table, Loader, Container, Icon } from "semantic-ui-react";
import Body from "./Body";
import { formatDateStr } from "../helpers/dateFormat";

const Quote = props => {
  const [stateHistory, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const count = 100;
  const [begin, setBegin] = useState(0);
  const [end, setEnd] = useState(limit);

  useEffect(() => {
    setLoading(true);
    fetch("http://35.195.25.70/api.php", {
      method: "POST",
      body: JSON.stringify({ action: "history" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === "ok") {
          console.log("RESULT ", data);
          setHistory(data.deals.map(item => item));
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

  const nextPage = () => {
    setBegin(begin + limit);
    setEnd(end + limit);
  };
  const prevPage = () => {
    setBegin(begin - limit);
    setEnd(end - limit);
  };
  console.log(begin, end);
  return (
    <Body>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Актив</Table.HeaderCell>
                <Table.HeaderCell>Начало</Table.HeaderCell>
                <Table.HeaderCell>Котировка</Table.HeaderCell>
                <Table.HeaderCell>Конец</Table.HeaderCell>
                <Table.HeaderCell>Котировка</Table.HeaderCell>
                <Table.HeaderCell>Прибыль</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stateHistory.slice(begin, end).map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.asset}</Table.Cell>
                  <Table.Cell>{formatDateStr(item.startDate)}</Table.Cell>
                  <Table.Cell>{item.startQuote}</Table.Cell>
                  <Table.Cell>{formatDateStr(item.finishDate)}</Table.Cell>
                  <Table.Cell>{item.finishQuote}</Table.Cell>
                  <Table.Cell>{item.profit}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Container textAlign="center">
            <Icon name="arrow left" onClick={prevPage} disabled={begin === 0} />
            {end / limit} / {limit}{" "}
            <Icon
              name="arrow right"
              onClick={nextPage}
              disabled={begin === count - limit}
            />
          </Container>
        </>
      )}
    </Body>
  );
};

export default Quote;
