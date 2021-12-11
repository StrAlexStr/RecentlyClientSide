import { Link } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

function PostAvatar({ userData, postDate }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${userData.username}`}>
      <button className="my-6 rounded-lg w-4/5">
        <div className="flex flex-row items-center justify-start">
          <img
            src={PublicFolder + "/avatars/" + userData.profilePicture}
            alt="Avatar_1"
            className="object-cover w-14 h-14 rounded-full mr-3 border-2 border-logo"
          />
          <div className="flex flex-col items-start">
            <span className="font-medium text-main text-opacity-100">
              {userData.username}
            </span>
            <span className="flex flex-row font-medium text-sm text-opacity-75 text-main ">
              <AiOutlineCalendar className="text-lg mr-1" />
              {timeAgo.format(new Date(postDate))}
            </span>
          </div>
        </div>
      </button>
    </Link>
  );
}

export default PostAvatar;
