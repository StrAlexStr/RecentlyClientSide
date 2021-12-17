import axios from "axios";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { BsPinMapFill } from "react-icons/bs";
import PostAvatar from "./PostAvatar";
import { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import { AiOutlineCalendar } from "react-icons/ai";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { MdDelete } from "react-icons/md";

function Post({ isFullPost, postData, setSelectedPostId, isCurrentUser }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const [user, setUser] = useState({});
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  // const handlePinClick = (postId) => {
  //   setSelectedPostId(postId);
  // };
  const handlePinClick = () => {
    setSelectedPostId(postData._id);
  };

  const handleDeletePostClick = async () => {
    try {
      await axios.delete("/posts/" + postData._id + "/" + postData.userId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${postData.userId}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setUser(res.data);
    };
    fetchUser();
  }, [postData.userId]);

  return (
    <div className="flex flex-col my-4 w-11/12">
      {user && user.dob && postData.createdAt && postData.img ? (
        <>
          {isFullPost && (
            <PostAvatar userData={user} postDate={postData.createdAt} />
          )}

          {isFullPost && (
            <div className="flex flex-row items-center justify-end pr-5 font-semibold text-lg">
              <button className="mx-3 text-lg  hover:text-secondary-dark">
                <BsPinMapFill
                  onClick={() => {
                    handlePinClick();
                  }}
                />
              </button>
            </div>
          )}
          <span className=" text-main font-semibold text-opacity-100 m-1 truncate ">
            {postData.title}
          </span>

          <span className="font-normal text-md mb-2 text-main text-opacity-90 break-words">
            {postData.description}
          </span>
          <img
            src={PublicFolder + "/posts/" + postData.img}
            alt="Fr_media_1"
            className="rounded-lg w-full"
          />
          {!isFullPost && (
            <div className="flex flex-row items-center px-5 justify-between text-md mt-3 mx-4">
              <div className="flex flex-row">
                <AiOutlineCalendar className="text-lg mr-1 mt-1" />
                {timeAgo.format(new Date(postData.createdAt))}
              </div>
              {isCurrentUser && (
                <button className="text-2xl text-secondary-dark hover:text-secondary ">
                  <MdDelete
                    onClick={() => {
                      handleDeletePostClick();
                    }}
                  />
                </button>
              )}

              <button className="text-lg hover:text-secondary-dark">
                <BsPinMapFill
                  onClick={() => {
                    handlePinClick(postData._id);
                  }}
                />
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
