import {
  SET_CURRENT_USER,
  SET_WRONG_AUTH
} from "../actions/authentication.action";
import isEmpty from "../../helpers/isEmpty";

export const initialState = {
  isAuthenticated: null,
  user: "",
  errMess: ""
};

export interface IAction {
  type: string;
  payload: string;
}

export interface IState {
  isAuthenticated: boolean | null;
  user: string;
  errMess: string;
  dispatch?: React.Dispatch<IAction>;
}

export default function(state: IState = initialState, action: IAction) {
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
