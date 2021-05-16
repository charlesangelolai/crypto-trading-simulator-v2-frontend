const initialState = {
  userData: null,
};

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER":
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
