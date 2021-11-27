import axios from "axios";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { BsPinMapFill } from "react-icons/bs";
import PostAvatar from "./PostAvatar";
import { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

//useEffect for the user data
function Post({ isFullPost, postData }) {
  const [user, setUser] = useState({});
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${postData.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col my-4">
      {user && user.dob && postData.createdAt && postData.img ? (
        <>
          {isFullPost && (
            <PostAvatar userData={user} postDate={postData.createdAt} />
          )}

          {isFullPost && (
            <div className="flex flex-row items-center justify-end pr-5 font-semibold text-lg">
              <button className="mx-3 hover:text-secondary-dark">
                <BsPinMapFill />
              </button>
              <button className="mx-3 hover:text-secondary-dark">
                <HiOutlineArrowsExpand />
              </button>
            </div>
          )}
          <span className=" text-main font-semibold text-opacity-100 m-1">
            {postData.title}
          </span>

          <span className="font-normal text-md text-main text-opacity-90 mb-1">
            {postData.description}
          </span>
          <img
            src={PublicFolder + "/posts/" + postData.img}
            alt="Fr_media_1"
            className="rounded-lg"
          />
          {!isFullPost && (
            <div className="flex flex-row items-center justify-items-end px-5 font-semibold text-lg mt-3">
              <span className="flex flex-row font-bold text-sm text-opacity-90 text-main ml-3">
                <AiOutlineCalendar className="font-bold text-lg mr-2" />
                {postData.updatedAt.split("T")[0]}
                <AiOutlineClockCircle className="text-lg ml-4 mr-1" />
                {postData.updatedAt.split("T")[1].split(".")[0]}
              </span>
              <button className="pl-16 hover:text-secondary-dark">
                <BsPinMapFill />
              </button>
            </div>
          )}
        </>
      ) : (
        <SpinnerDotted
          size={50}
          thickness={120}
          speed={100}
          className="pt-4"
          color="rgba(155,106,108, 1)"
        />
      )}
    </div>
  );
}

export default Post;
