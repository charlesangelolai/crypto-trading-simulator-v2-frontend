const initialState = {
  coins: [],
};

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COINS":
      return {
        ...state,
        coins: action.payload,
      };
    default:
      return state;
  }
};

export default coinsReducer;
