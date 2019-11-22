import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import AuthStateGlobal from "../../context/AuthStateGlobal";
import { logoutUser } from "../../context/actions/authentication.action";

const HeaderMenu = ({ title }) => {
  const context = useContext(AuthStateGlobal);
  const logOut = () => {
    logoutUser(context.dispatch);
  };
  return (
    <>
      <Menu attached="top" tabular color="blue">
        <Menu.Item name="quote" as={NavLink} to="/" exact>
          Курсы валют
        </Menu.Item>
        <Menu.Item name="converter" as={NavLink} to="/converter" exact>
          Конвертер
        </Menu.Item>
        <Menu.Item name="history" as={NavLink} to="/history" exact>
          История
        </Menu.Item>

        <Menu.Item position="right" onClick={logOut}>
          Выход
        </Menu.Item>
      </Menu>
    </>
  );
};
export default HeaderMenu;
