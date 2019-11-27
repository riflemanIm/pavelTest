import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { orderBy, find, remove, some } from "lodash";
import Body from "./Body";
import HistoryTable from "../components/history/HistoryTable";
import { IHistoryRow } from "../components/history/HistoryRow";
import { post } from "../api/http";

let transHistory: IHistoryRow[][] = [];
const limit = 10;
const profitMax = 100;
const numNegativeRows = 2;
const numPositiveRows = 2;
const numRestRows = limit - numNegativeRows - numPositiveRows;

const History = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    post<{ result: "ok" | "error"; deals: [] }>({ action: "history" })
      .then(data => {
        if (data.result === "ok") {
          const preData = orderBy(
            data.deals.map((item: IHistoryRow, inx: number) => ({
              ...item,
              id: inx,
              finishDateDate: new Date(item.finishDate)
            })),
            "finishDateDate",
            "desc"
          );

          const lessThenZero = preData.filter(it => parseInt(it.profit) < 0);
          const moreThenHundred = preData.filter(
            it => parseInt(it.profit) > profitMax
          );
          const middle = preData.filter(
            it => parseInt(it.profit) >= 0 && parseInt(it.profit) <= profitMax
          );
          /** for checking
          console.log("RESULT ", preData);
          console.log("< 0 ", lessThenZero);
          console.log("> 100 ", moreThenHundred);
          console.log("middle ", middle);
          */

          const perChunk = limit; // items per chunk

          transHistory = preData.reduce(
            (resultArray: any[], item: IHistoryRow, index: number) => {
              const chunkIndex = Math.floor(index / perChunk);

              if (chunkIndex != null && !resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []; // start a new chunk

                /** ------ начитяем десятки по условиям ----- */
                const partLe = lessThenZero.splice(0, numNegativeRows);
                resultArray[chunkIndex].push(...partLe); //  < 0

                const partMo = moreThenHundred
                  .filter(
                    it => !some(resultArray[chunkIndex], { asset: it.asset })
                  )
                  .slice(0, numPositiveRows);
                remove(moreThenHundred, it =>
                  find(partMo, itt => itt.id === it.id)
                );
                resultArray[chunkIndex].push(...partMo); //  > 100

                let partMiddle = middle
                  .filter(
                    it => !some(resultArray[chunkIndex], { asset: it.asset })
                  )
                  .slice(0, numRestRows);
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
            },
            []
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

  return (
    <Body>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <HistoryTable data={transHistory} limit={limit} />
      )}
    </Body>
  );
};

export default History;
