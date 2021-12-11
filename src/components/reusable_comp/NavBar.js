import { AiOutlineHome } from "react-icons/ai";
import { RiAddBoxLine, RiUser3Line } from "react-icons/ri";
import { RiBellFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("token", null);
  };

  return (
    <div className="flex flex-col h-full text-3xl px-1 py-4 justify-between items-center bg-main text-white">
      <span className="text-5xl text-white h-3/6 px-2 ">
        <RiBellFill />
      </span>
      <div className="flex flex-col h-full ">
        <Link to="/home">
          <button className="my-8 hover:text-secondary-light">
            <AiOutlineHome />
          </button>
        </Link>
        <Link to={`/profile/${user.username}`}>
          <button className="my-8 hover:text-secondary-light">
            <RiUser3Line />
          </button>
        </Link>
        <Link to={"/createPost"}>
          <button className="my-8 hover:text-secondary-light">
            <RiAddBoxLine />
          </button>
        </Link>
      </div>
      <Link to="/login">
        <button
          className="text-3xl text-white mt-2 p-2 hover:text-secondary-dark"
          onClick={handleLogout}
        >
          <MdLogout />
        </button>
      </Link>
    </div>
  );
}

export default NavBar;
