import person from "../../assets/placeholder_media/person_holder.jpg";
import axios from "axios";
import { useState, useEffect } from "react";

function ProfileMainData({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsFetch = async () => {
      const res = await axios.get(`/posts/all_posts/?userId=${user._id}`);
      setPosts(res.data);
    };
    postsFetch();
  }, [user]);

  console.log(user.followers);
  // console.log(user.followers.length);

  return (
    <div
      className="h-full w-1/4 bg-bg_login flex flex-col items-center justify-center text-main font-bold"
      style={{ fontFamily: "Baloo2" }}
    >
      <img
        src={person}
        alt="Avatar_1"
        className="object-cover w-48 h-48 rounded-full mr-3 shadow-md border-4 border-logo"
      />
      <br />
      <p className="text-3xl">{user.username}</p>
      <p className="text-1xl">{user.email}</p>
      <br />
      <p className="text-2xl">Posts: {posts.length}</p>
      {/* <p className="text-2xl">Followers: {user.followers.length}</p> */}
      <br />
      <button className="font-bold bg-secondary px-3 py-2 hover:bg-secondary-light rounded-md">
        <p style={{ fontFamily: "Josefin" }}>Follow</p>
      </button>
    </div>
  );
}

export default ProfileMainData;
