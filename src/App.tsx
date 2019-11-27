import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthState from "./context/AuthState";
import "semantic-ui-css/semantic.min.css";

const Converter = lazy(() => import("./pages/Converter"));
const History = lazy(() => import("./pages/History"));
const Quote = lazy(() => import("./pages/Quote"));
const Login = lazy(() => import("./pages/login/Login"));

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/converter">
              <Converter />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/">
              <Quote />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AuthState>
  );
};

export default App;
