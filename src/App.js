import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"; //rutas
import Converter from "./pages/Converter";
import Quote from "./pages/Quote";
import Login from "./pages/Authentication/Login";
import AuthState from "./context/AuthState"; // estado global usando context api
import "semantic-ui-css/semantic.min.css";
const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/converter">
            <Converter />
          </Route>
          <Route path="/">
            <Quote />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
};

export default App;
