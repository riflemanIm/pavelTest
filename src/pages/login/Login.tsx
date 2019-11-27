import React, { useLayoutEffect, useContext } from "react";
import useForm from "./useForm";
import validate from "./LoginFormValidation";
import AuthStateGlobal from "../../context/AuthStateGlobal";
import { Form, Button, Card } from "semantic-ui-react";
import { loginUser } from "../../context/actions/authentication.action";
import { useHistory } from "react-router-dom";
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

  const MessageWarning = (text: string) => (
    <div className="message-warning">
      <p>{text}</p>
    </div>
  );

  const history = useHistory();

  useLayoutEffect(() => {
    if (context.isAuthenticated === true) {
      history.push("/");
    }
  });

  return (
    <div className="container-login">
      <Card centered={true}>
        <Card.Header textAlign="center" className="card-heder">
          Вход в личный кабинет
        </Card.Header>
        <Card.Content extra centered="true">
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Field>
              <label>Логин</label>
              <Form.Input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                required
                error={errors.email !== "" && errors.email}
              />
            </Form.Field>

            <Form.Field>
              <label>Пароль</label>
              <Form.Input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                required
                error={errors.password !== "" && errors.password}
              />
            </Form.Field>
            <Form.Field className="contButton">
              <Button primary type="submit">
                Вход
                <span style={{ fontSize: "30px", lineHeight: "1px" }}>
                  &#8594;
                </span>
              </Button>
            </Form.Field>
          </Form>
          {context.errMess && MessageWarning(context.errMess)}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Login;
