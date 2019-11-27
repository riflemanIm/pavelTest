import React, { useState } from "react";
import { Table, Container, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import HistoryRow, { IHistoryRow } from "./HistoryRow";
import isEmpty from "../../helpers/isEmpty";

interface IProps {
  data: IHistoryRow[][];
  limit: number;
}

const HistoryTable = (props: IProps) => {
  const { data, limit } = props;
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Актив</Table.HeaderCell>
            <Table.HeaderCell>Начало</Table.HeaderCell>
            <Table.HeaderCell>Котировка</Table.HeaderCell>
            <Table.HeaderCell>Конец</Table.HeaderCell>
            <Table.HeaderCell>Котировка</Table.HeaderCell>
            <Table.HeaderCell>Прибыль</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!isEmpty(data[page]) &&
            data[page].map((item, index) => {
              return <HistoryRow key={index} item={item} />;
            })}
        </Table.Body>
      </Table>
      <Container textAlign="center">
        <Button
          basic
          circular
          icon="arrow left"
          onClick={prevPage}
          disabled={page === 0}
        />
        {page + 1} / {data.length}{" "}
        <Button
          basic
          circular
          icon="arrow right"
          name="arrow right"
          onClick={nextPage}
          disabled={page === limit - 1}
        />
      </Container>
    </>
  );
};
HistoryTable.propTypes = {
  data: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired
};

export default HistoryTable;
