import { SET_QUOTES } from "../actions/quote.action";

export default function(state, action) {
  switch (action.type) {
    case SET_QUOTES:
      return {
        ...state,
        quotes: action.payload
      };
    default:
      return state;
  }
}
