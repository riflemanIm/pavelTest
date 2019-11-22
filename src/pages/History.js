import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { orderBy, find, remove, some } from "lodash";
import { URL_API } from "../config";
import Body from "./Body";
import HistoryTable from "../components/history/HistoryTable";

let transHistory = [];
const History = () => {
  const [loading, setLoading] = useState(false);
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

          transHistory = preData.reduce((resultArray, item, index) => {
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
          }, []);

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
        <Loader />
      ) : (
        <HistoryTable data={transHistory} limit={limit} />
      )}
    </Body>
  );
};

export default History;
