import React, { useLayoutEffect, useContext } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidation";
import AuthStateGlobal from "../../context/AuthStateGlobal";
import { Form, Button, Container, Message } from "semantic-ui-react";
import { loginUser } from "../../context/actions/authentication.action";
import { useHistory } from "react-router-dom";

const Login = () => {
  const context = useContext(AuthStateGlobal);
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  function login() {
    const user = {
      login: values.email,
      password: values.password,
      action: "login"
    };
    loginUser(user, context.dispatch);
  }
  const MessageExampleWarning = text => (
    <Message warning>
      <p>{text}</p>
    </Message>
  );

  const history = useHistory();
  useLayoutEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      history.push("/");
    }
  });

  return (
    <Container>
      {context.stateUser.errMess &&
        MessageExampleWarning(context.stateUser.errMess)}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Field>
          <label>Логин</label>
          <Form.Input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            required
            error={errors.email}
          />
        </Form.Field>

        <Form.Field>
          <label>Пароль</label>
          <Form.Input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password || ""}
            required
            error={errors.password}
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
