import React, { useState } from "react";
import { Form, Divider, Button, Header } from "semantic-ui-react";
import isEmpty from "../../helpers/isEmpty";
import PropTypes from "prop-types";
import "../../styles/ConverterForm.css";

const ConverterForm = ({ allOptions, possiblePairs }) => {
  const [stateNum, setStateNum] = useState(1);
  const [val1, setVal1] = useState("USD");
  const [val2, setVal2] = useState("RUB");
  const [res, setRes] = useState("");
  const [options1, setOptions1] = useState(allOptions);
  const [options2, setOptions2] = useState(allOptions);

  const handlerSelect = (v1, v2) => {
    let options = [];
    setRes("");
    if (v1 != null) {
      setVal1(v1);
      /** оставляем только те что есть  */
      options = possiblePairs
        .filter(item => item.val1 === v1 || item.val2 === v1)
        .map((item, index) => ({
          key: index,
          text: item.val1 === v1 ? item.val2 : item.val1,
          value: item.val1 === v1 ? item.val2 : item.val1
        }));
      setOptions2([...options]);
      if (!isEmpty(options)) {
        //setVal2(options[0].value);
        //calc(v1, options[0].value, stateNum);
      } else {
        setVal2("");
      }
    }
    if (v2 != null) {
      setVal2(v2);
      /** оставляем только те что есть  */
      options = possiblePairs
        .filter(item => item.val2 === v2 || item.val1 === v2)
        .map((item, index) => ({
          key: index,
          text: item.val2 === v2 ? item.val1 : item.val2,
          value: item.val2 === v2 ? item.val1 : item.val2
        }));
      setOptions1([...options]);
      if (!isEmpty(options)) {
        //setVal1(options[0].value);
        //calc(options[0].value, v2, stateNum);
      } else {
        setVal1("");
      }
    }
  };

  const handlerInput = num => {
    setStateNum(num);
    if (num.trim() !== "") {
      calc(val1, val2, num);
    }
  };

  const calc = (v1, v2, num) => {
    setOptions1([...allOptions]);
    setOptions2([...allOptions]);
    num = parseFloat(num);
    let asset = possiblePairs.filter(
      item => item.val1 === v1 && item.val2 === v2
    );
    if (!isEmpty(asset) && num) {
      setRes((parseFloat(asset[0].quote) * num).toFixed(3));
      return;
    }
    asset = possiblePairs.filter(item => item.val1 === v2 && item.val2 === v1);
    if (!isEmpty(asset) && num) {
      setRes(((1 / parseFloat(asset[0].quote)) * num).toFixed(3));
      return;
    }
    if (!num) {
      setRes("ведите количество");
      return;
    }

    setRes("нет такой пары значений");
  };

  return (
    <>
      <Header className="header-main">Конвертер валют</Header>
      <Form>
        <Form.Group>
          <Form.Input
            className="numInput"
            onChange={e => handlerInput(e.target.value)}
            name="num"
            type="tel"
            value={stateNum}
            placeholder="количество"
          />
          <Form.Select
            onChange={(e, { value }) => handlerSelect(value, null)}
            options={options1}
            value={val1}
          />
          <Form.Select
            onChange={(e, { value }) => handlerSelect(null, value)}
            options={options2}
            value={val2}
          />
          <Form.Field>
            <Button onClick={() => calc(val1, val2, stateNum)} primary>
              Рассчитать
            </Button>
          </Form.Field>
        </Form.Group>
        <Divider />
        {res && (
          <>
            Итого:{" "}
            <Header size="medium" className="itogo-res">
              {res}
            </Header>
          </>
        )}
      </Form>
    </>
  );
};

ConverterForm.propTypes = {
  allOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  possiblePairs: PropTypes.arrayOf(
    PropTypes.shape({
      val1: PropTypes.string.isRequired,
      val2: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default ConverterForm;
