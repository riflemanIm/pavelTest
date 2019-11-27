import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import Body from "./Body";
import { post } from "../api/http";
import QuotesTable from "../components/quotes/QuotesTable";
import { IQuote } from "../components/quotes/QuoteRow";
import "../styles/Quote.css";

let result: IQuote[] = [];
const Quote = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    post<{ result: "ok" | "error"; assets: [] }>({ action: "quote" })
      .then(data => {
        if (data != null && data.result === "ok") {
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
