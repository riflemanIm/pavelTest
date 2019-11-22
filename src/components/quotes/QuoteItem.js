import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { formatDateStr } from "../../helpers/dateFormat";
import PropTypes from "prop-types";

const QuoteItem = ({ item, index, onClick }) => {
  return (
    <Table.Row onClick={() => onClick(index)}>
      <Table.Cell>
        {item.fav ? <Icon name="star" /> : <Icon name="star outline" />}
      </Table.Cell>
      <Table.Cell>{item.asset}</Table.Cell>
      <Table.Cell>{formatDateStr(item.startDate)}</Table.Cell>
      <Table.Cell>{item.quote}</Table.Cell>
    </Table.Row>
  );
};
QuoteItem.propTypes = {
  item: PropTypes.shape({
    fav: PropTypes.bool,
    asset: PropTypes.string,
    quote: PropTypes.string
  })
};
export default QuoteItem;
