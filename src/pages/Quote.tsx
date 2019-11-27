import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Body from "./Body";
import { URL_API } from "../config";
import QuotesTable from "../components/quotes/QuotesTable";
import { IQuote } from "../components/quotes/QuoteRow";
import "../styles/Quote.css";

let result: [] = [];
const Quote = () => {
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
          result = data.assets.map((item: IQuote) => ({ ...item, fav: false }));
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
