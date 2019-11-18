import React, { useLayoutEffect, useContext, useState } from "react";
import AuthStateGlobal from "../../context/AuthStateGlobal";
import { Form, Button, Container } from "semantic-ui-react";
import { loginUser } from "../../context/actions/authentication.action";
import { useHistory } from "react-router-dom";

const Login = props => {
  const context = useContext(AuthStateGlobal);
  const [login, setLogin] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  useLayoutEffect(() => {
    console.log(
      "context.stateUser.isAuthenticated",
      context.stateUser.isAuthenticated
    );
    if (context.stateUser.isAuthenticated === true) {
      history.push("/");
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      login,
      password,
      action: "login"
    };
    loginUser(user, context.dispatch);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Логин</label>
          <Form.Input
            onChange={e => setLogin(e.target.value)}
            name="login"
            type="text"
          />
        </Form.Field>

        <Form.Field>
          <label>Пароль</label>
          <Form.Input
            type="password"
            onChange={e => setPass(e.target.value)}
            name="password"
          />
        </Form.Field>

        <Button variant="primary" type="submit">
          Вход
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
