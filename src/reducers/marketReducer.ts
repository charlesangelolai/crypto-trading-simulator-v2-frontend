const initialState = {
  loading: true,
  coins: [],
  search: "",
};

const marketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_COINS":
      return {
        ...state,
        loading: false,
        coins: action.payload,
      };
    default:
      return state;
  }
};

export default marketReducer;
