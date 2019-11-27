import React from "react";
import { Table } from "semantic-ui-react";
import { formatDateStr } from "../../helpers/dateFormat";
import PropTypes from "prop-types";

export interface IHistoryRow {
  asset: string;
  finishDate: string;
  finishQuote: string;
  profit: string;
  startDate: string;
  startQuote: string;
}
interface IProps {
  item: IHistoryRow;
}

const HistoryRow = (props: IProps) => {
  const { item } = props;
  return (
    <Table.Row
      positive={parseInt(item.profit) > 100}
      negative={parseInt(item.profit) < 0}
    >
      <Table.Cell>{item.asset}</Table.Cell>
      <Table.Cell>{formatDateStr(item.startDate)}</Table.Cell>
      <Table.Cell>{item.startQuote}</Table.Cell>
      <Table.Cell>{formatDateStr(item.finishDate)}</Table.Cell>
      <Table.Cell>{item.finishQuote}</Table.Cell>
      <Table.Cell>{item.profit}</Table.Cell>
    </Table.Row>
  );
};

HistoryRow.propTypes = {
  item: PropTypes.shape({
    asset: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    startQuote: PropTypes.string.isRequired,
    finishDate: PropTypes.string.isRequired,
    profit: PropTypes.string.isRequired
  }).isRequired
};

export default HistoryRow;
