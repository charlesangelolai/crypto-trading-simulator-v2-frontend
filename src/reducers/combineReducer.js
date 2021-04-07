import { combineReducers } from "redux";
import marketReducer from "./marketReducer";
import chartReducer from "./chartReducer";

const rootReducer = combineReducers({
  market: marketReducer,
  chart: chartReducer,
});

export default rootReducer;
