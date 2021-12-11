import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import { AuthContext } from "../../context/AuthContext";

function ProfileMainData({
  profileUser,
  isCurrentUser,
  followed,
  setFollowed,
}) {
  const [posts, setPosts] = useState([]);
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [fromApprove, setFromApprove] = useState(false);

  const [file, setFile] = useState(null);

  const handleFollowClick = async () => {
    try {
      if (followed) {
        await axios.put(
          "/users/unfollow/" + profileUser._id,
          {
            userId: currentUser._id,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        dispatch({ type: "UNFOLLOW_USER", payload: profileUser._id });
      } else {
        await axios.put(
          "/users/follow/" + profileUser._id,
          {
            userId: currentUser._id,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        dispatch({ type: "FOLLOW_USER", payload: profileUser._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const changeAvatarHandler = async (e) => {
    e.preventDefault();
    if (fromApprove) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        await axios.post("/upload/avatar", data, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        await axios.put(
          "/users/" + currentUser._id,
          {
            profilePicture: fileName,
            userId: currentUser._id,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    }
    setFile(null);
  };

  useEffect(() => {
    if (profileUser._id != null) {
      const postsFetch = async () => {
        const res = await axios.get(`/posts/all_posts/${profileUser._id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        setPosts(res.data);
      };
      postsFetch();
      setFollowed(currentUser?.following.includes(profileUser?._id));
    }
  }, [profileUser, currentUser, file, fromApprove, followed, setFollowed]);

  const genders = ["Male", "Female", "Custom"]; //change to database
  return (
    <div
      className="h-full w-1/4 bg-bg_login flex flex-col items-center justify-center text-main font-bold"
      style={{ fontFamily: "Josefin" }}
    >
      {profileUser &&
      profileUser.followers &&
      profileUser.following &&
      currentUser &&
      posts ? (
        <>
          {isCurrentUser && (
            <form onSubmit={changeAvatarHandler} className="mb-6">
              {file === null ? (
                <>
                  <label
                    htmlFor="avatar"
                    className=" cursor-pointer text-main mb-4 text-lg font-bold bg-secondary-light py-2 px-3 rounded-lg mr-3"
                    style={{ fontFamily: "Baloo2" }}
                  >
                    Change avatar
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="avatar"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </>
              ) : (
                <>
                  <label
                    htmlFor="submit_afirm"
                    className=" cursor-pointer text-main mb-4 text-lg font-bold bg-secondary-light py-2 px-3 rounded-lg mr-3"
                    style={{ fontFamily: "Baloo2" }}
                  >
                    Confirm
                  </label>
                  <input
                    className="hidden"
                    type="submit"
                    id="submit_afirm"
                    onClick={() => {
                      setFromApprove(true);
                    }}
                  />
                  <label
                    htmlFor="submit_neg"
                    className=" cursor-pointer text-main mb-4 text-lg font-bold bg-secondary-light py-2 px-3 rounded-lg mr-3"
                    style={{ fontFamily: "Baloo2" }}
                  >
                    Cancel
                  </label>
                  <input
                    className="hidden"
                    type="submit"
                    id="submit_neg"
                    onClick={() => {
                      setFile(null);
                      setFromApprove(false);
                    }}
                  />
                </>
              )}
            </form>
          )}
          <img
            src={PublicFolder + "/avatars/" + profileUser.profilePicture}
            alt="Avatar_1"
            className="object-cover w-48 h-48 rounded-full mr-3 shadow-md border-4 border-logo"
          />
          <br />
          <p className="text-3xl" style={{ fontFamily: "Baloo2" }}>
            {profileUser.username}
          </p>
          <div className="flex flex-row items-center ">
            <div className="flex flex-col items-center m-5 pr-10">
              <p
                className="text-lg text-logo mt-2"
                style={{ fontFamily: "Baloo2" }}
              >
                Email:
              </p>
              <p className="text-2xl">{profileUser.email}</p>
              <p
                className="text-lg text-logo mt-2 "
                style={{ fontFamily: "Baloo2" }}
              >
                DOB:
              </p>
              <p className="text-2xl">{profileUser.dob.split("T")[0]}</p>
              <p
                className="text-lg text-logo mt-2"
                style={{ fontFamily: "Baloo2" }}
              >
                Gender:
              </p>
              <p className="text-2xl">{genders[profileUser.gender]}</p>
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
              <p className="text-3xl">{profileUser.followers.length}</p>
              <p
                className="text-lg text-logo mt-2 "
                style={{ fontFamily: "Baloo2" }}
              >
                Following:
              </p>
              <p className="text-3xl">{profileUser.following.length}</p>
            </div>
          </div>
          {!isCurrentUser && (
            <button
              className="font-bold text-2xl bg-secondary px-3 py-2 mt-10 hover:bg-secondary-light rounded-md disabled"
              onClick={handleFollowClick}
            >
              <p style={{ fontFamily: "Baloo2" }}>
                {followed ? "Unfollow" : "Follow"}
              </p>
            </button>
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

export default ProfileMainData;
