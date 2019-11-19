import React, { useState, useEffect } from "react";
import { Form, Divider, Button, Loader } from "semantic-ui-react";
import isEmpty from "../helpers/isEmpty";
import { find } from "lodash";
import Body from "./Body";

const allOptions = [];
const possiblePairs = [];
const Converter = () => {
  const [stateNum, setStateNum] = useState(1);
  const [val1, setVal1] = useState("USD");
  const [val2, setVal2] = useState("RUB");
  const [res, setRes] = useState("");
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://35.195.25.70/api.php", {
      method: "POST",
      body: JSON.stringify({ action: "quote" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === "ok") {
          console.log("RESULT ", data);
          data.assets.forEach((item, i1) => {
            const assets = item.asset.split("/");
            console.log("assets", assets);
            assets.forEach((it, i2) => {
              if (isEmpty(find(allOptions, { value: it })))
                allOptions.push({
                  key: `${i1}${i2}`,
                  text: it,
                  value: it
                });
            });
            if (
              isEmpty(find(possiblePairs, { val1: assets[0], val2: assets[1] }))
            ) {
              possiblePairs.push({
                val1: assets[0],
                val2: assets[1],
                quote: item.quote
              });
            }

            setLoading(false);
          });
          setOptions1([...allOptions]);
          setOptions2([...allOptions]);
        } else {
          console.log("RESULT NOT OK");
          setLoading(false);
        }
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  }, []);

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
      setRes(parseFloat(asset[0].quote) * num);
      return;
    }
    asset = possiblePairs.filter(item => item.val1 === v2 && item.val2 === v1);
    if (!isEmpty(asset) && num) {
      setRes((1 / parseFloat(asset[0].quote)) * num);
      return;
    }
    if (!num) {
      setRes("ведите количество");
      return;
    }

    setRes("нет такой пары значений");
  };

  console.log("options2", options2);
  return (
    <Body>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Form>
          <Form.Group>
            <Form.Input
              onChange={e => handlerInput(e.target.value)}
              name="num"
              type="tel"
              value={stateNum}
              placeholder="количество"
            />
            <Form.Select
              onChange={(e, { value }) => handlerSelect(value, null)}
              options={options1}
              placeholder="Choose an option"
              value={val1}
            />
            <Form.Select
              onChange={(e, { value }) => handlerSelect(null, value)}
              options={options2}
              placeholder="Choose an option"
              value={val2}
            />
            <Button onClick={() => calc(val1, val2, stateNum)} primary>
              посчитать
            </Button>
          </Form.Group>
          <Divider />
          <div>{res}</div>
        </Form>
      )}
    </Body>
  );
};

export default Converter;
