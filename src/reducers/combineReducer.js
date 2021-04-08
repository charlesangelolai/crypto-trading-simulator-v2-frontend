import { combineReducers } from "redux";
import marketReducer from "./marketReducer";
import chartReducer from "./chartReducer";
import usersReducer from "./usersReducer";
import tradesReducer from "./tradesReducer";
import positionsReducer from "./positionsReducer";

const rootReducer = combineReducers({
  market: marketReducer,
  chart: chartReducer,
  user: usersReducer,
  trades: tradesReducer,
  positions: positionsReducer,
});

export default rootReducer;
