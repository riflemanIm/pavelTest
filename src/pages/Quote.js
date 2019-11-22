import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Body from "./Body";
import { URL_API } from "../config";
import QuotesTable from "../components/quotes/QuotesTable";
import "../styles/Quote.css";

const result = [];
const Quote = props => {
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
          console.log("RESULT ", data);
          result.push(...data.assets.map(item => ({ ...item, fav: false })));
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
        <QuotesTable data={result} />
      )}
    </Body>
  );
};

export default Quote;
