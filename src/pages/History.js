import React, { useEffect, useState } from "react";
import "../styles/Quote.css";
import { Table, Loader, Container, Button } from "semantic-ui-react";
import Body from "./Body";
import { formatDateStr } from "../helpers/dateFormat";
import { orderBy, find, remove, some } from "lodash";
import { URL_API } from "../config";

const transHistory = [];
const Quote = props => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 10;
  useEffect(() => {
    setLoading(true);
    fetch(URL_API, {
      method: "POST",
      body: JSON.stringify({ action: "history" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === "ok") {
          const preData = orderBy(
            data.deals.map((item, inx) => ({
              ...item,
              id: inx,
              finishDateDate: new Date(item.finishDate)
            })),
            "finishDateDate",
            "desc"
          );

          const lessThenZero = preData.filter(it => it.profit < 0);
          const moreThenHundred = preData.filter(it => it.profit > 100);
          const middle = preData.filter(
            it => it.profit >= 0 && it.profit <= 100
          );
          /** for checking
          console.log("RESULT ", preData);
          console.log("< 0 ", lessThenZero);
          console.log("> 100 ", moreThenHundred);
          console.log("middle ", middle);
          */

          const perChunk = limit; // items per chunk

          transHistory.push(
            ...preData.reduce((resultArray, item, index) => {
              const chunkIndex = Math.floor(index / perChunk);

              if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []; // start a new chunk

                /** ------ начитяем десятки по условиям ----- */
                const partLe = lessThenZero.splice(0, 2);
                resultArray[chunkIndex].push(...partLe); //  < 0

                const partMo = moreThenHundred
                  .filter(
                    (it, inx) =>
                      !some(resultArray[chunkIndex], { asset: it.asset })
                  )
                  .slice(0, 2);
                remove(moreThenHundred, it =>
                  find(partMo, itt => itt.id === it.id)
                );
                resultArray[chunkIndex].push(...partMo); //  > 100

                let partMiddle = middle
                  .filter(
                    (it, inx) =>
                      inx <= !some(resultArray[chunkIndex], { asset: it.asset })
                  )
                  .slice(0, 6);
                remove(middle, it => find(partMiddle, itt => itt.id === it.id));
                resultArray[chunkIndex].push(...partMiddle); // остальные

                /** ----  добовляем все что  осталось  --- */
                let addCount = perChunk - resultArray[chunkIndex].length;
                if (middle.length > 0 && addCount > 0) {
                  const removedRest = middle.splice(0, addCount);
                  resultArray[chunkIndex].push(...removedRest);
                }

                addCount = perChunk - resultArray[chunkIndex].length;
                if (moreThenHundred.length > 0 && addCount > 0) {
                  const removedMore = moreThenHundred.splice(0, addCount);
                  resultArray[chunkIndex].push(...removedMore);
                }
                addCount = perChunk - resultArray[chunkIndex].length;
                if (lessThenZero.length > 0 && addCount > 0) {
                  const removedLess = lessThenZero.splice(0, addCount);
                  resultArray[chunkIndex].push(...removedLess);
                }

                resultArray[chunkIndex] = orderBy(
                  resultArray[chunkIndex],
                  "finishDateDate",
                  "desc"
                );
              }

              return resultArray;
            }, [])
          );

          /* for checking 
          console.log("transHistory ", transHistory);
          console.log("lessThenZero ", lessThenZero);
          console.log("moreThenHundred ", moreThenHundred);
          console.log("middle ", middle);
          */
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
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

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
              {transHistory.length > 0 &&
                transHistory[page].map((item, index) => {
                  return (
                    <Table.Row
                      key={index}
                      positive={item.profit > 100}
                      negative={item.profit < 0}
                    >
                      <Table.Cell>{item.asset}</Table.Cell>
                      <Table.Cell>{formatDateStr(item.startDate)}</Table.Cell>
                      <Table.Cell>{item.startQuote}</Table.Cell>
                      <Table.Cell>{formatDateStr(item.finishDate)}</Table.Cell>
                      <Table.Cell>{item.finishQuote}</Table.Cell>
                      <Table.Cell>{item.profit}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
          <Container textAlign="center">
            <Button
              basic
              circular
              icon="arrow left"
              onClick={prevPage}
              disabled={page === 0}
            />
            {page + 1} / {transHistory.length}{" "}
            <Button
              basic
              circular
              icon="arrow right"
              name="arrow right"
              onClick={nextPage}
              disabled={page === limit - 1}
            />
          </Container>
        </>
      )}
    </Body>
  );
};

export default Quote;
