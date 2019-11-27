import React, { useLayoutEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Segment, Icon, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../context/actions/authentication.action";
import AuthStateGlobal from "../context/AuthStateGlobal";
import "../styles/Body.css";

const Body = props => {
  const history = useHistory();
  const context = useContext(AuthStateGlobal);
  const [isResp, setIsResp] = useState(false);

  const logOut = () => {
    logoutUser(context.dispatch);
  };

  const handleClick = e => {
    e.preventDefault();
    setIsResp(!isResp);
  };

  useLayoutEffect(() => {
    if (context.isAuthenticated === false || context.isAuthenticated === null) {
      history.push("/login");
    }
  });

  return (
    <div className="container-body">
      <Container textAlign="right" style={{ margin: "0 0 30px 0 " }}>
        <Button primary basic onClick={() => logOut()}>
          Выход
        </Button>
      </Container>
      <Container>
        <div className={!isResp ? "topnav" : "topnav responsive"} id="myTopnav">
          <NavLink to="/" exact>
            Курсы валют
          </NavLink>
          <NavLink to="converter">Конвертер</NavLink>
          <NavLink to="history">История</NavLink>
          <a href="!#" className="icon-item" onClick={e => handleClick(e)}>
            <Icon name="list" />
          </a>
        </div>
        <Segment attached="bottom">
          <div className="up">{props.children}</div>
        </Segment>
      </Container>
    </div>
  );
};

export default Body;
