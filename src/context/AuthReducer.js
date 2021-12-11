const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        isError: false,
      };
    case "BEGIN_LOGIN":
      return {
        user: null,
        isFetching: false,
        isError: false,
      };
    case "SUCCESSFUL_LOGIN":
      return {
        user: action.payload,
        isFetching: false,
        isError: false,
      };
    case "ERROR_LOGIN":
      return {
        user: null,
        isFetching: false,
        isError: true,
      };
    case "FOLLOW_USER":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (fol) => fol !== action.payload
          ),
        },
      };
    default: {
      return { user: null, isFetching: false, isError: false };
    }
  }
};

export default AuthReducer;
