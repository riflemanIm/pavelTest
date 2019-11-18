export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  fetch("http://35.195.25.70/api.php", {
    method: "POST",
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "ok") {
        const token = 12345; // must be arrived from server
        localStorage.setItem("token", token);
        dispatch(setCurrentUser(token));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      logoutUser(dispatch);
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = dispatch => {
  localStorage.removeItem("token");
  dispatch(setCurrentUser({}));
};
