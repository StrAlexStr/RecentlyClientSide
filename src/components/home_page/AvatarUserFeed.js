import { RiUserFollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function AvatarUserFeed({ userData, includesCurrentUser }) {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${userData.username}`}>
      <button className="my-5">
        <div className="flex flex-row items-center justify-around">
          <img
            src={PublicFolder + "/avatars/" + userData.profilePicture}
            alt="Avatar_1"
            className="object-cover w-14 h-14 rounded-full mr-3 border-2 border-logo"
          />
          <div className="flex flex-col items-start">
            <span className="font-medium text-main text-opacity-100">
              {userData.username}
            </span>
            <span className="font-medium text-sm text-opacity-75 text-main ">
              {userData.email}
            </span>
            <span className="font-medium text-sm text-opacity-50 text-main ">
              {"Joined: " + userData.createdAt.split("T")[0]}
            </span>
          </div>
          {includesCurrentUser && (
            <RiUserFollowFill className="text-2xl text-main text-opacity-75 ml-4" />
          )}
        </div>
      </button>
    </Link>
  );
}

export default AvatarUserFeed;
