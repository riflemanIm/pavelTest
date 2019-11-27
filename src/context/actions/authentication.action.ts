import { URL_API } from "../../config";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_WRONG_AUTH = "SET_WRONG_AUTH";

interface User {
  login: string;
  password: string;
  action: string;
}

export const loginUser = (user: User, dispatch: any) => {
  fetch(URL_API, {
    method: "POST",
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "ok") {
        const token = "12345"; // must be arrived from server
        localStorage.setItem("token", token);
        dispatch(setCurrentUser(token));
      } else if (data.result === "error") {
        dispatch(setWrongAuth(data.error));
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      logoutUser(dispatch);
    });
};

export const setCurrentUser = (token: string) => {
  return {
    type: SET_CURRENT_USER,
    payload: token
  };
};

export const setWrongAuth = (err: string) => {
  return {
    type: SET_WRONG_AUTH,
    payload: err
  };
};

export const logoutUser = (dispatch: any) => {
  localStorage.removeItem("token");
  dispatch(setCurrentUser(""));
};
