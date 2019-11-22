import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import { orderBy } from "lodash";
import QuoteItem from "./QuoteItem";
import PropTypes from "prop-types";

const QuotesTable = ({ data }) => {
  const [stateQuotes, setStateQuotes] = useState(data);

  const handlerFav = index => {
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
          <QuoteItem
            key={index}
            index={index}
            item={item}
            onClick={handlerFav}
          />
        ))}
      </Table.Body>
    </Table>
  );
};
QuotesTable.propTypes = {
  data: PropTypes.array
};

export default QuotesTable;
