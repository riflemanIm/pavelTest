import React, { useLayoutEffect, useContext } from "react";
import { Header } from "../components/index.components";
import { Container, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import AuthStateGlobal from "../context/AuthStateGlobal";

const Body = props => {
  const history = useHistory();
  const context = useContext(AuthStateGlobal);

  useLayoutEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      history.push("/login");
    }
  });
  return (
    <Container>
      <Header />
      <Segment attached="bottom" color="blue">
        {props.children}
      </Segment>
    </Container>
  );
};

export default Body;
