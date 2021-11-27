import axios from "axios";
import { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";

function ProfileMainData({ user }) {
  const [posts, setPosts] = useState([]);
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const postsFetch = async () => {
      const res = await axios.get(`/posts/all_posts/${user._id}`);
      setPosts(res.data);
    };
    postsFetch();
  }, [user]);

  const genders = ["Male", "Female", "Custom"];
  return (
    <div
      className="h-full w-1/4 bg-bg_login flex flex-col items-center justify-center text-main font-bold"
      style={{ fontFamily: "Josefin" }}
    >
      {user && user.followers && user.following && posts ? (
        <>
          <img
            src={PublicFolder + "/avatars/" + user.profilePicture}
            alt="Avatar_1"
            className="object-cover w-48 h-48 rounded-full mr-3 shadow-md border-4 border-logo"
          />
          <br />
          <p className="text-3xl" style={{ fontFamily: "Baloo2" }}>
            {user.username}
          </p>
          <div className="flex flex-row items-center ">
            <div className="flex flex-col items-center m-5 pr-10">
              <p
                className="text-lg text-logo mt-2"
                style={{ fontFamily: "Baloo2" }}
              >
                Email:
              </p>
              <p className="text-2xl">{user.email}</p>
              <p
                className="text-lg text-logo mt-2 "
                style={{ fontFamily: "Baloo2" }}
              >
                DOB:
              </p>
              <p className="text-2xl">{user.dob.split("T")[0]}</p>
              <p
                className="text-lg text-logo mt-2"
                style={{ fontFamily: "Baloo2" }}
              >
                Gender:
              </p>
              <p className="text-2xl">{genders[user.gender]}</p>
            </div>
            <div className="flex flex-col items-center m-5 mr-10">
              <p
                className="text-lg text-logo mt-2 "
                style={{ fontFamily: "Baloo2" }}
              >
                Posts:
              </p>
              <p className="text-3xl">{posts.length}</p>
              <p
                className="text-lg text-logo mt-2 "
                style={{ fontFamily: "Baloo2" }}
              >
                Followers:
              </p>
              <p className="text-3xl">{user.followers.length}</p>
              <p
                className="text-lg text-logo mt-2 "
                style={{ fontFamily: "Baloo2" }}
              >
                Following:
              </p>
              <p className="text-3xl">{user.following.length}</p>
            </div>
          </div>

          <button className="font-bold text-2xl bg-secondary px-3 py-2 mt-10 hover:bg-secondary-light rounded-md">
            <p style={{ fontFamily: "Baloo2" }}>Follow</p>
          </button>
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

export default ProfileMainData;
