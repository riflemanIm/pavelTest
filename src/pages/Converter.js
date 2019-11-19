import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Header } from "../components/index.components";
import { Form, Container, Divider, Button, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import AuthStateGlobal from "../context/AuthStateGlobal";
import isEmpty from "../context/validations/isEmpty";
import { find } from "lodash";

const options = [];
const vals = [];
const Converter = () => {
  const history = useHistory();
  const context = useContext(AuthStateGlobal);
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
              if (isEmpty(find(options, { value: it })))
                options.push({
                  key: `${i1}${i2}`,
                  text: it,
                  value: it
                });
            });
            vals.push({ val1: assets[0], val2: assets[1], quote: item.quote });
            setLoading(false);
          });
          setOptions1(options);
          setOptions2(options);
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
    let op = [];
    setRes("");
    if (v1 != null) {
      setVal1(v1);
      /** оставляем только те что есть  */
      op = vals
        .filter(item => item.val1 === v1 || item.val2 === v1)
        .map((item, index) => ({
          key: index,
          text: item.val1 === v1 ? item.val2 : item.val1,
          value: item.val1 === v1 ? item.val2 : item.val1
        }));
      setOptions2([...op]);
      if (!isEmpty(op)) {
        //setVal2(op[0].value);
        //calc(v1, op[0].value, stateNum);
      } else {
        setVal2("");
      }
    }
    if (v2 != null) {
      setVal2(v2);
      /** оставляем только те что есть  */
      op = vals
        .filter(item => item.val2 === v2 || item.val1 === v2)
        .map((item, index) => ({
          key: index,
          text: item.val2 === v2 ? item.val1 : item.val2,
          value: item.val2 === v2 ? item.val1 : item.val2
        }));
      setOptions1([...op]);
      if (!isEmpty(op)) {
        //setVal1(op[0].value);
        //calc(op[0].value, v2, stateNum);
      } else {
        setVal2("");
      }
    }
  };

  const handlerInput = num => {
    setStateNum(num);
    calc(val1, val2, num);
  };
  const calc = (v1, v2, num) => {
    setOptions1(options);
    setOptions2(options);

    let asset = vals.filter(item => item.val1 === v1 && item.val2 === v2);
    if (!isEmpty(asset) && num != null) {
      setRes(parseFloat(asset[0].quote) * parseFloat(num));
      return;
    }
    asset = vals.filter(item => item.val1 === v2 && item.val2 === v1);
    if (!isEmpty(asset) && num !== null) {
      setRes((1 / parseFloat(asset[0].quote)) * parseFloat(num));
      return;
    }
    setRes("нет такой пары значений");
  };

  useLayoutEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      history.push("/");
    }
  });

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Form>
            <Form.Group>
              <Form.Input
                onChange={e => handlerInput(e.target.value)}
                name="num"
                type="tel"
                value={stateNum}
              />
              <Form.Select
                onChange={(e, { value }) => handlerSelect(value, null)}
                options={options1}
                placeholder="Choose an option"
                selection
                value={val1}
              />
              <Form.Select
                onChange={(e, { value }) => handlerSelect(null, value)}
                options={options2}
                placeholder="Choose an option"
                selection
                value={val2}
              />
              <Button onClick={() => calc(val1, val2, stateNum)} primary>
                посчитать
              </Button>
            </Form.Group>
            <Divider />
            <div>{res}</div>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Converter;
