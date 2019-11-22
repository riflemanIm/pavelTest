import React, { useLayoutEffect, useContext } from "react";
import { HeaderMenu } from "../components/index.components";
import { Container, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import AuthStateGlobal from "../context/AuthStateGlobal";
import "../styles/Body.css";

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
    <div className="container-body">
      <Container>
        <HeaderMenu />
        <Segment attached="bottom" className="segment-body">
          {props.children}
        </Segment>
      </Container>
    </div>
  );
};

export default Body;
