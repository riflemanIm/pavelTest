import React from "react";
import { initialState, IState } from "./reducers/authentication.reducer";

export default React.createContext<IState>(initialState);
