import person from "../../assets/placeholder_media/person_holder.jpg";
import { Link } from "react-router-dom";

function PostAvatar({ userData, postDate }) {
  return (
    <Link to="/profile">
      <button className="my-6 rounded-lg w-4/5">
        <div className="flex flex-row items-center justify-start">
          <img
            src={person} //to change
            alt="Avatar_1"
            className="object-cover w-14 h-14 rounded-full mr-3"
          />
          <div className="flex flex-col items-start">
            <span className="font-medium text-main text-opacity-100">
              {userData.username}
            </span>
            <span className="font-medium text-sm text-opacity-75 text-main ">
              {postDate}
            </span>
          </div>
        </div>
      </button>
    </Link>
  );
}

export default PostAvatar;
