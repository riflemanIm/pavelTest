import {
  SET_CURRENT_USER,
  SET_WRONG_AUTH
} from "../actions/authentication.action";
import isEmpty from "../../helpers/isEmpty";

export default function(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_WRONG_AUTH:
      return {
        ...state,
        isAuthenticated: false,
        errMess: action.payload
      };
    default:
      return state;
  }
}
