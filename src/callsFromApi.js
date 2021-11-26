import axios from "axios";

export const callLogin = async (cred, dispatch) => {
  dispatch({ type: "BEGIN_LOGIN" });
  try {
    const res = await axios.post("/auth/login", cred);
    dispatch({ type: "SUCCESSFUL_LOGIN", payload: res.data });
  } catch (err) {
    dispatch({ type: "ERROR_LOGIN", payload: err });
  }
};
