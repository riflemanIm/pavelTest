import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { formatDateStr } from "../../helpers/dateFormat";
import PropTypes from "prop-types";

const QuoteRow = ({ item, index, onClick }) => {
  return (
    <Table.Row onClick={() => onClick(index)}>
      <Table.Cell>
        {item.fav ? (
          <Icon name="star" className="star" />
        ) : (
          <Icon name="star outline" className="star" />
        )}
      </Table.Cell>
      <Table.Cell>{item.asset}</Table.Cell>
      <Table.Cell>{formatDateStr(item.startDate)}</Table.Cell>
      <Table.Cell>{item.quote}</Table.Cell>
    </Table.Row>
  );
};

QuoteRow.propTypes = {
  item: PropTypes.shape({
    fav: PropTypes.bool.isRequired,
    asset: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default QuoteRow;
