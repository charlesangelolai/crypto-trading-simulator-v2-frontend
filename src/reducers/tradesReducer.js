const initialState = {
  loading: true,
  trades: [],
};

const tradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_TRADES":
      return {
        ...state,
        loading: false,
        trades: action.payload,
      };
    case "BUY_COIN":
      return {
        ...state,
        trades: [...state.trades, action.payload],
      };
    case "SELL_COIN":
      return {
        ...state,
        trades: action.payload,
      };
    default:
      return state;
  }
};

export default tradesReducer;
