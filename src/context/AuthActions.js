export const BeginLogin = (authData) => ({
  type: "BEGIN_LOGIN",
});

export const SuccessfulLogin = (user) => ({
  type: "SUCCESSFUL_LOGIN",
  payload: user,
});

export const ErrorLogin = () => ({
  type: "ERROR_LOGIN",
});

export const FollowUser = (userId) => ({
  type: "FOLLOW_USER",
  payload: userId,
});

export const UnfollowUser = (userId) => ({
  type: "UNFOLLOW_USER",
  payload: userId,
});

export const Logout = () => ({
  type: "LOGOUT",
});
