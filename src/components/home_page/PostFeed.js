import Post from "../reusable_comp/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//sec
function PostFeed({ isFullPost }) {
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/get/all_posts/${user._id}`);
      setPosts(
        res.data.sort((post_data_1, post_data_2) => {
          return (
            new Date(post_data_2.createdAt) - new Date(post_data_1.createdAt)
          );
        })
      );
      setPostsLoaded(true);
    };
    fetchPosts();
  }, [user]);

  return (
    <div className="flex flex-col items-center p-4 overflow-auto scrollbar scrollbar-thumb-logo scrollbar-thin scrollbar-thumb-rounded-lg divide-y divide-logo">
      {posts.map((pd) => {
        return <Post isFullPost={isFullPost} postData={pd} key={pd._id} />;
      })}
    </div>
  );
}

export default PostFeed;
