import React, { useReducer, useEffect, useState } from "react";
import reducer, { initialState } from "./reducers/authentication.reducer";
import { setCurrentUser } from "./actions/authentication.action";
import AuthStateGlobal from "./AuthStateGlobal";

export interface IProps {
  children: [JSX.Element] | JSX.Element;
}

const AuthState = (props: IProps) => {
  const [stateUser, dispatch] = useReducer(reducer, initialState);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(setCurrentUser(localStorage.token ? localStorage.token : ""));
    }
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  } else {
    return (
      <AuthStateGlobal.Provider
        value={{
          ...stateUser,
          dispatch
        }}
      >
        {props.children}
      </AuthStateGlobal.Provider>
    );
  }
};

export default AuthState;
