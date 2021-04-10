const initialState = {
  loading: true,
  wallet: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_WALLET":
      return {
        ...state,
        loading: false,
        wallet: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
