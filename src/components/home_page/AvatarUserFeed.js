import person from "../../assets/placeholder_media/person_holder.jpg";
import { RiUserFollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function AvatarUserFeed() {
  return (
    <Link to="/profile">
      <button className="my-5">
        <div className="flex flex-row items-center justify-start">
          <img
            src={person}
            alt="Avatar_1"
            className="object-cover w-14 h-14 rounded-full mr-3"
          />
          <div className="flex flex-col items-start">
            <span className="font-medium text-main text-opacity-100">
              Username Username
            </span>
            <span className="font-medium text-sm text-opacity-75 text-main ">
              Username@gmail.com
            </span>
          </div>
          <RiUserFollowFill className="text-2xl text-main text-opacity-75 ml-4" />
        </div>
      </button>
    </Link>
  );
}

export default AvatarUserFeed;
