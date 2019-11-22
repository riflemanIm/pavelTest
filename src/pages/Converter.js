import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import isEmpty from "../helpers/isEmpty";
import { find } from "lodash";
import Body from "./Body";
import { URL_API } from "../config";
import ConverterForm from "../components/converter/ConverterForm";

const allOptions = [];
const possiblePairs = [];

const Converter = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(URL_API, {
      method: "POST",
      body: JSON.stringify({ action: "quote" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === "ok") {
          data.assets.forEach((item, i1) => {
            const assets = item.asset.split("/");
            assets.forEach((it, i2) => {
              if (isEmpty(find(allOptions, { value: it })))
                allOptions.push({
                  key: `${i1}${i2}`,
                  text: it,
                  value: it
                });
            });
            if (
              isEmpty(find(possiblePairs, { val1: assets[0], val2: assets[1] }))
            ) {
              possiblePairs.push({
                val1: assets[0],
                val2: assets[1],
                quote: item.quote
              });
            }

            setLoading(false);
          });
        } else {
          console.log("RESULT NOT OK");
          setLoading(false);
        }
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  }, []);

  return (
    <Body>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <ConverterForm allOptions={allOptions} possiblePairs={possiblePairs} />
      )}
    </Body>
  );
};

export default Converter;
