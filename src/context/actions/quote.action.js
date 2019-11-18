export const SET_QUOTES = "SET_QUOTES";

export const getQuotes = dispatch => {
  fetch("http://35.195.25.70/api.php", {
    method: "POST",
    body: JSON.stringify({ action: "quote" })
  })
    .then(res => res.json())
    .then(data => {
      if (data.result === "ok") {
        //console.log("RESULT ", data.assets);
        dispatch(setQuotes(data.assets));
      } else {
        console.log("RESULT NOT OK");
      }
    })
    .catch(err => {
      console.log("ERROR:", err);
    });
};

export const setQuotes = payload => {
  return {
    type: SET_QUOTES,
    payload
  };
};
