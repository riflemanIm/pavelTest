import { post } from "../../api/http";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_WRONG_AUTH = "SET_WRONG_AUTH";

interface User {
  login: string;
  password: string;
  action: string;
}

export const loginUser = (user: User, dispatch: any) => {
  post<{ result: "ok" | "error"; error: string }>(user)
    .then(data => {
      if (data != null && data.result === "ok") {
        const token = "12345"; // must be arrived from server
        localStorage.setItem("token", token);
        dispatch(setCurrentUser(token));
      } else if (data != null && data.result === "error") {
        dispatch(setWrongAuth(data.error));
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      console.log("ERROR:", err);
      logoutUser(dispatch);
    });
};

export const setCurrentUser = (token: string) => {
  return {
    type: SET_CURRENT_USER,
    payload: token
  };
};

export const setWrongAuth = (error: string) => {
  return {
    type: SET_WRONG_AUTH,
    payload: error
  };
};

export const logoutUser = (dispatch: any) => {
  localStorage.removeItem("token");
  dispatch(setCurrentUser(""));
};
