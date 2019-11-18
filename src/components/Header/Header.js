import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";

import AuthStateGlobal from "./../../context/AuthStateGlobal";
import { logoutUser } from "./../../context/actions/authentication.action";

const Header = props => {
  const [activeItem, handleItemClick] = useState("");

  const context = useContext(AuthStateGlobal);
  const logOut = () => {
    logoutUser(context.dispatch);
  };

  return (
    <Menu>
      <Menu.Item
        name="editorials"
        active={activeItem === "/"}
        onClick={() => handleItemClick("/")}
        as={Link}
        to="/"
      >
        котировки
      </Menu.Item>

      <Menu.Item
        name="converter"
        active={activeItem === "converter"}
        onClick={() => handleItemClick("converter")}
        as={Link}
        to="/converter"
      >
        конвертер
      </Menu.Item>

      <Menu.Item position="right" onClick={logOut}>
        выход
      </Menu.Item>
    </Menu>
  );
};
export default Header;
