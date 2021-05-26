const initialState = {
  loading: true,
  coin: null,
  chartData: [],
};

const chartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_COIN_DATA":
      return {
        ...state,
        loading: false,
        coin: action.payload,
      };
    case "FETCH_CHART_DATA":
      return {
        ...state,
        loading: false,
        chartData: action.payload,
      };
    default:
      return state;
  }
};

export default chartReducer;
