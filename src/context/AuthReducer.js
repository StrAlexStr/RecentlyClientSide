const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "BEGIN_LOGIN":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "SUCCESSFUL_LOGIN":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "ERROR_LOGIN":
      return {
        user: null,
        isFetching: false,
        error: true,
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
            (fol) => fol != action.payload
          ),
        },
      };
  }
};

export default AuthReducer;
