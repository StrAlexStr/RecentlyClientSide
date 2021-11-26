import Post from "./Post";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { BiGhost } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";

function MapBar({ isFollowingBar, username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const postsFetch = async () => {
      if (isFollowingBar) {
        const res = await axios.get(`/posts/get/following/${user._id}`);
        setPosts(res.data);
      } else {
        const res = await axios.get(`/posts/all_posts/?username=${username}`);
        setPosts(res.data);
      }
    };
    postsFetch();
  }, [username]); //maybe use username here

  return (
    <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md w-1/5 p-6 absolute z-10 inset-y-0 right-0 m-5 overflow-auto rounded-lg flex flex-col items-center scrollbar scrollbar-thumb-secondary-dark scrollbar-thin scrollbar-thumb-rounded-lg">
      <p
        className="text-2xl text-secondary-dark mb-4"
        style={{ fontFamily: "Baloo2" }}
      >
        {isFollowingBar ? "Following Feed" : `${username}'s posts'`}
      </p>
      {posts.length > 0 ? (
        posts.map((postData) => {
          <Post
            isFullPost={isFollowingBar}
            postData={postData}
            key={postData._id}
          />;
        })
      ) : (
        <div className="flex flex-col items-center text-center justify-center w-full">
          <span
            className="pt-20 font-bold text-logo text-3xl text-center"
            style={{ fontFamily: "Baloo2" }}
          >
            {isFollowingBar
              ? "You are currently following no one"
              : "No posts to be seen here"}
            <div className="flex flex-row items-center justify-center mt-10  animate-bounce ">
              {isFollowingBar ? (
                <BiGhost className="font-bold text-6xl" />
              ) : (
                <BsSignpost className="font-bold text-5xl" />
              )}
            </div>
          </span>
        </div>
      )}
    </div>
  );
}

export default MapBar;
