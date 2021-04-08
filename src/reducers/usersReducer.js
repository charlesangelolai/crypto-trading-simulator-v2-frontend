const initialState = {
  userData: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        userData: action.payload,
      };
    case "SIGN_UP":
      return {
        ...state,
        userData: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
