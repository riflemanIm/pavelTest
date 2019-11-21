import React, { useReducer, useEffect, useState } from "react";
import authReducer from "./reducers/authentication.reducer";
import { setCurrentUser } from "./actions/authentication.action";
import AuthStateGlobal from "./AuthStateGlobal";

const AuthState = props => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
    errMess: ""
  });
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
          stateUser,
          dispatch
        }}
      >
        {props.children}
      </AuthStateGlobal.Provider>
    );
  }
};

export default AuthState;
