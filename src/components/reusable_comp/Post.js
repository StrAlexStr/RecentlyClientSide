import image1 from "../../assets/placeholder_media/fr_med_1.jpg";
import axios from "axios";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { BsPinMapFill } from "react-icons/bs";
import PostAvatar from "./PostAvatar";
import { useState, useEffect } from "react";

//useEffect for the user data
function Post({ isFullPost, postData }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${postData.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col my-4">
      {isFullPost && (
        <PostAvatar userData={user} postDate={postData.updatedAt} />
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
      <img src={postData.img} alt="Fr_media_1" className="rounded-lg" />
      {!isFullPost && (
        <div className="flex flex-row items-center justify-between px-5 font-semibold text-lg mt-3">
          <span className="font-bold text-sm text-opacity-90 text-main ml-3">
            {postData.updatedAt}
          </span>
          <button className="mx-3 pl-16 hover:text-secondary-dark">
            <BsPinMapFill />
          </button>
          <button className="mx-3 hover:text-secondary-dark">
            <HiOutlineArrowsExpand />
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
