import Post from "../reusable_comp/Post";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//sec
function PostFeed({
  isFullPost,
  setSelectedPostId,
  searchRefValue,
  sortElement,
}) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/get/all_posts/${user._id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log(sortElement);
      setPosts(
        res.data.sort((post_data_1, post_data_2) => {
          return (
            new Date(post_data_2.createdAt) - new Date(post_data_1.createdAt)
          );
        })
      );
    };
    fetchPosts();
  }, [user, searchRefValue, sortElement]);

  return (
    <div className="flex flex-col items-center w-full p-4 overflow-auto scrollbar scrollbar-thumb-logo scrollbar-thin scrollbar-thumb-rounded-lg divide-y divide-logo">
      {posts.map((pd) => {
        if (sortElement) {
          if (pd.title.toLowerCase().includes(sortElement.toLowerCase())) {
            return (
              <Post
                isFullPost={isFullPost}
                postData={pd}
                key={pd._id}
                setSelectedPostId={setSelectedPostId}
              />
            );
          } else {
            return null;
          }
        } else {
          return (
            <Post
              isFullPost={isFullPost}
              postData={pd}
              key={pd._id}
              setSelectedPostId={setSelectedPostId}
            />
          );
        }
      })}
    </div>
  );
}

export default PostFeed;
