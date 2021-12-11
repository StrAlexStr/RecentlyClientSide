import NavBar from "../reusable_comp/NavBar";
import ProfileMainData from "./ProfileMainData";
import MapBar from "../reusable_comp/MapBar";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MapComp from "../reusable_comp/MapComp";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const username = useParams().username;
  const [profileUser, setProfileUser] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const { user } = useContext(AuthContext);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [followed, setFollowed] = useState(
    user?.following.includes(profileUser?._id)
  );
  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(`/users?username=${username}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setProfileUser(res.data);
    };
    userFetch();
    setIsCurrentUser(profileUser._id === user._id);
  }, [username, profileUser._id, user._id, followed]);

  return (
    <div className="flex h-screen w-screen relative z-0">
      <NavBar />
      <ProfileMainData
        profileUser={profileUser}
        isCurrentUser={isCurrentUser}
        followed={followed}
        setFollowed={setFollowed}
      />
      <MapComp
        profileUser={profileUser}
        selectedPostId={selectedId}
        setSelectedPostId={setSelectedId}
      />
      <MapBar
        isFollowingBar={false}
        profileUser={profileUser}
        setSelectedPostId={setSelectedId}
        isCurrentUser={isCurrentUser}
      />
    </div>
  );
}

export default Profile;
