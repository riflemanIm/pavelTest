import React, { useEffect, useState, useLayoutEffect, useContext } from "react";

import { Header } from "../components/index.components";
import { Form, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import AuthStateGlobal from "../context/AuthStateGlobal";
import isEmpty from "../context/validations/isEmpty";

const Converter = props => {
  const history = useHistory();
  const context = useContext(AuthStateGlobal);
  const [stateNum, setStateNum] = useState(1);
  const [val1, setVal1] = useState("");

  useLayoutEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      history.push("/");
    }
  });

  const options1 = [
    {
      key: 1,
      text: "USD",
      value: "USD"
    },
    {
      key: 2,
      text: "RUB",
      value: "RUB"
    }
  ];
  return (
    <>
      <Header />
      {context.stateUser.isAuthenticated === true && !isEmpty(options1) && (
        <Container>
          <Form>
            <Form.Group>
              <Form.Input
                // onInput={e => setStateNum(parseInt(e.target.value))}
                onChange={e =>
                  setStateNum(
                    parseInt(e.target.value) ? parseInt(e.target.value) : 1
                  )
                }
                name="num"
                type="tel"
                value={stateNum}
              />
              <Form.Select
                onChange={(e, { value }) => setVal1(value)}
                options={options1}
                placeholder="Choose an option"
                selection
                value={val1}
              />
            </Form.Group>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Converter;
