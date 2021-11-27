import NavBar from "../reusable_comp/NavBar";
import WrappedMap from "../reusable_comp/WrappedMap";
import ProfileMainData from "./ProfileMainData";
import MapBar from "../reusable_comp/MapBar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const username = useParams().username;
  const [profileUser, setProfileUser] = useState({});
  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setProfileUser(res.data);
    };
    userFetch();
  }, [username]);

  return (
    <div className="flex h-screen w-screen relative z-0">
      <NavBar />
      <ProfileMainData user={profileUser} />
      <WrappedMap />
      <MapBar isFollowingBar={false} profileUser={profileUser} />
    </div>
  );
}

export default Profile;
