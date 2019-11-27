import React, { useState } from "react";
import { Table } from "semantic-ui-react";
import { orderBy } from "lodash";
import QuoteRow, { IQuote } from "./QuoteRow";
import PropTypes from "prop-types";

interface IProps {
  data: IQuote[];
}
const QuotesTable = (props: IProps) => {
  const { data } = props;
  const [stateQuotes, setStateQuotes] = useState(data);

  const handlerFav = (index: number) => {
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
          <QuoteRow
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
  data: PropTypes.array.isRequired
};

export default QuotesTable;
