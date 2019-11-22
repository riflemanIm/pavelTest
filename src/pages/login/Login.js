import React, { useLayoutEffect, useContext } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidation";
import AuthStateGlobal from "../../context/AuthStateGlobal";
import { Form, Button, Message, Card } from "semantic-ui-react";
import { loginUser } from "../../context/actions/authentication.action";
import { useHistory } from "react-router-dom";
import "../../styles/Body.css";
import "../../styles/Login.css";

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
  const MessageWarning = text => (
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
    <div className="container-login">
      <Card centered>
        <Card.Header textAlign="center" className="card-heder">
          Вход в личный кабинет
        </Card.Header>
        <Card.Content extra centered>
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
            <Form.Field centered>
              <Button primary type="submit">
                Вход
              </Button>
            </Form.Field>
          </Form>
          {context.stateUser.errMess &&
            MessageWarning(context.stateUser.errMess)}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Login;
