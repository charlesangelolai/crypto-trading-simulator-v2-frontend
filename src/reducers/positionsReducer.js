const initialState = {
  loading: true,
  positions: [],
};

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_USER_POSITIONS":
      return {
        ...state,
        loading: false,
        positions: action.payload,
      };
    case "POST_POSITION":
      return {
        ...state,
        positions: [...state.positions, action.payload],
      };
    case "PATCH_POSITION":
      return {
        ...state,
        positions: action.payload,
      };
    case "DELETE_POSITION":
      return {
        ...state,
        positions: action.payload,
      };
    default:
      return state;
  }
};

export default positionsReducer;
