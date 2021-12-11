import Post from "./Post";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { BiGhost } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { SpinnerDotted } from "spinners-react";

function MapBar({
  isFollowingBar,
  profileUser,
  setSelectedPostId,
  isCurrentUser,
}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [postsLoaded, setPostsLoaded] = useState(false);

  useEffect(() => {
    const postsFetch = async () => {
      if (isFollowingBar) {
        if (user) {
          const res = await axios.get(`/posts/get/following/${user._id}`, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          });
          setPosts(res.data);
          setPostsLoaded(true);
        }
      } else {
        if (profileUser && profileUser._id) {
          const res = await axios.get(`/posts/all_posts/${profileUser._id}`, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          });
          setPosts(res.data);
          setPostsLoaded(true);
        }
      }
    };
    postsFetch();
  }, [profileUser, user, isFollowingBar, setSelectedPostId]);

  return (
    <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md w-1/5 p-6 absolute z-10 inset-y-0 right-0 m-5 overflow-auto rounded-lg flex flex-col items-center scrollbar scrollbar-thumb-secondary-dark scrollbar-thin scrollbar-thumb-rounded-lg">
      <p
        className="text-2xl text-secondary-dark mb-4"
        style={{ fontFamily: "Baloo2" }}
      >
        {isFollowingBar ? "Following Feed" : `${profileUser.username}'s posts`}
      </p>
      {postsLoaded ? (
        posts.length > 0 ? (
          posts.map((postData) => {
            return (
              <Post
                isFullPost={isFollowingBar}
                postData={postData}
                key={postData._id}
                setSelectedPostId={setSelectedPostId}
                isCurrentUser={isCurrentUser}
              />
            );
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
        )
      ) : (
        <SpinnerDotted
          size={50}
          thickness={120}
          speed={100}
          className="mt-8"
          color="rgba(155,106,108, 1)"
        />
      )}
    </div>
  );
}

export default MapBar;
