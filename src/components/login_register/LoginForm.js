import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { callLogin } from "../../callsFromApi";
import { AuthContext } from "../../context/AuthContext";
import { SpinnerDotted } from "spinners-react";

function LoginForm() {
  const emailRef = useRef();
  const passRef = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    callLogin(
      {
        email: emailRef.current.value,
        password: passRef.current.value,
      },
      dispatch
    );
  };

  return (
    <div
      className="w-4/5 md:w-3/5 xl:w-2/5 2xl:w-2/6 flex flex-col items-center rounded-lg py-9
    px-6 bg-bg_login scale-75 lg:scale-100 my-10"
    >
      <span
        className="text-5xl  font-bold mb-9 mx-5 text-secondary"
        style={{ fontFamily: "Josefin" }}
      >
        Login
      </span>
      <form
        action="#"
        className="w-full max-w-sm flex flex-col"
        onSubmit={handleLogin}
      >
        <label
          htmlFor="email"
          className="block text-logo text-lg font-bold ml-2"
          style={{ fontFamily: "Baloo2" }}
        >
          Email:
        </label>
        <div className="flex items-center border-b border-secondary py-2">
          <input
            required
            ref={emailRef}
            type="email"
            placeholder="JaneDoe@gmail.com"
            aria-label="Email"
            className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="email"
          />
        </div>

        <label
          htmlFor="pass"
          className="block text-logo text-lg font-bold ml-2 mt-6"
          style={{ fontFamily: "Baloo2" }}
        >
          Password:
        </label>
        <div className="flex items-center border-b border-secondary py-2">
          <input
            required
            ref={passRef}
            type="password"
            placeholder="•••••••"
            aria-label="Password"
            className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="pass"
          />
        </div>
        {isFetching ? (
          <div className="flex flex-col items-center w-full">
            <SpinnerDotted
              size={50}
              thickness={120}
              speed={100}
              className="pt-4"
              color="rgba(155,106,108, 1)"
            />
          </div>
        ) : (
          <button
            className="bg-secondary text-main mt-5 p-2 rounded-md font-bold text-lg hover:bg-secondary-light cursor-pointer mx-10"
            style={{ fontFamily: "Josefin" }}
            type="submit"
            id="login_submit"
            name="login_submit"
          >
            <span>Log in</span>
          </button>
        )}
      </form>
      <Link
        to="/register"
        className="mt-5 mb-3 p-2 rounded-md bg-no_acc  mx-10 text-main cursor-pointer text-lg px-5 hover:bg-no_acc-light"
      >
        <button className="font-bold">
          <span style={{ fontFamily: "Josefin" }}>I don't have an account</span>
        </button>
      </Link>
    </div>
  );
}

export default LoginForm;
