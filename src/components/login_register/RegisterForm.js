import { Link } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const confPassword = useRef();
  const email = useRef();
  const gender = useRef();
  const dob = useRef();
  const [error, setError] = useState();
  const [regUserError, setRegUserError] = useState();

  function validatePassword() {
    if (
      /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(
        password.current.value
      )
    ) {
      setError("");
      return true;
    }
    setError(
      "Your password must contain a minimum of eight characters, at least one letter,one capital letter, one number and one special character"
    );
    return false;
  }

  function deltaDate(input, days, months, years) {
    return new Date(
      input.getFullYear() + years,
      input.getMonth() + months,
      Math.min(
        input.getDate() + days,
        new Date(
          input.getFullYear() + years,
          input.getMonth() + months + 1,
          0
        ).getDate()
      )
    );
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (validatePassword() === false) {
      return;
    }
    if (password.current.value === confPassword.current.value) {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        dob: dob.current.value,
        gender: gender.current.value,
        profilePicture: "DEFAULT.png",
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err.message);
        if (err.message.includes("403")) {
          setRegUserError("Username or email is already taken");
        }
      }
    } else {
      confPassword.current.setCustomValidity("The passwords aren't the same");
    }
  };

  return (
    <div
      className="w-4/5 md:w-3/5 xl:w-2/5 2xl:w-2/6 flex flex-col items-center rounded-lg py-9
    px-6 bg-bg_login scale-75 lg:scale-100 my-10"
    >
      {error && (
        <p
          className="text-center bg-no_acc px-4 py-2 rounded-lg mt-2 mb-4 text-main"
          style={{ fontFamily: "Baloo2" }}
        >
          {error}
        </p>
      )}

      {regUserError && (
        <p
          className="text-center bg-no_acc px-4 py-2 rounded-lg mt-2 mb-4 text-main"
          style={{ fontFamily: "Baloo2" }}
        >
          {regUserError}
        </p>
      )}

      <span
        className="text-5xl  font-bold mb-9 mx-5 text-secondary"
        style={{ fontFamily: "Josefin" }}
      >
        Register
      </span>
      <form
        action="#"
        className="w-full max-w-sm flex flex-col"
        onSubmit={handleClick}
      >
        <div className="flex flex-row ">
          <div className="flex flex-col pr-3 w-3/4">
            <label
              htmlFor="username"
              className="block text-logo text-lg font-bold ml-2"
              style={{ fontFamily: "Baloo2" }}
            >
              Username:
            </label>
            <div className="flex items-center border-b border-secondary py-2">
              <input
                required
                ref={username}
                type="text"
                placeholder="JaneDoe"
                aria-label="username"
                className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
                id="username"
                minLength="4"
                maxLength="30"
              />
            </div>
          </div>
          <div className="flex flex-col pl-3">
            <label
              htmlFor="gender"
              className="block text-logo text-lg font-bold ml-2"
              style={{ fontFamily: "Baloo2" }}
            >
              Gender:
            </label>
            <div className="flex items-center border-b border-secondary py-2">
              <select
                ref={gender}
                id="gender"
                name="gender"
                className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
                <option value="2">Other</option>
              </select>
            </div>
          </div>
        </div>

        <label
          htmlFor="username"
          className="block text-logo text-lg font-bold ml-2 mt-2"
          style={{ fontFamily: "Baloo2" }}
        >
          Email:
        </label>
        <div className="flex items-center border-b border-secondary py-2">
          <input
            required
            ref={email}
            type="email"
            placeholder="JaneDoe@gmail.com"
            aria-label="Email"
            className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="email"
          />
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col pr-3">
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
                ref={password}
                type="password"
                placeholder="••••••••"
                aria-label="Password"
                className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
                id="pass"
                minLength="8"
              />
            </div>
          </div>
          <div className="flex flex-col pl-3">
            <label
              htmlFor="conf_pass"
              className="block text-logo text-lg font-bold ml-2 mt-6"
              style={{ fontFamily: "Baloo2" }}
            >
              Confirm:
            </label>
            <div className="flex items-center border-b border-secondary py-2">
              <input
                required
                ref={confPassword}
                type="password"
                placeholder="••••••••"
                aria-label="ConfPassword"
                className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
                id="conf_pass"
              />
            </div>
          </div>
        </div>
        <label
          htmlFor="date_of_birth"
          className="block text-logo text-lg font-bold ml-2 mt-6"
          style={{ fontFamily: "Baloo2" }}
        >
          Date of birth:
        </label>
        <div className="flex items-center border-b border-secondary py-2">
          <input
            required
            ref={dob}
            type="date"
            placeholder="01/01/1990"
            aria-label="DateOfBirth"
            className="appearance-none bg-bg_login border-none w-full text-main mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="date_of_birth"
            min={deltaDate(new Date(), 0, 0, -118)
              .toISOString()
              .substring(0, 10)}
            max={deltaDate(new Date(), 0, 0, -16)
              .toISOString()
              .substring(0, 10)}
          />
        </div>

        <input
          className="bg-secondary text-main mt-5 p-2 rounded-md font-bold text-lg hover:bg-secondary-light cursor-pointer mx-10"
          style={{ fontFamily: "Josefin" }}
          type="submit"
          id="login_submit"
          name="login_submit"
          value="Register"
          required
        />
      </form>
      <Link
        to="/login"
        className="mt-5 mb-3 p-2 rounded-md bg-no_acc  mx-10 text-main cursor-pointer text-lg px-5 hover:bg-no_acc-light"
      >
        <button className="font-bold">
          <span style={{ fontFamily: "Josefin" }}>
            I already have an account
          </span>
        </button>
      </Link>
    </div>
  );
}

export default RegisterForm;
