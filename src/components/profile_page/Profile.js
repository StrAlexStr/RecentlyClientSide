import NavBar from "../reusable_comp/NavBar";
import WrappedMap from "../reusable_comp/WrappedMap";
import ProfileMainData from "./ProfileMainData";
import MapBar from "../reusable_comp/MapBar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const username = useParams().username;
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const userFetch = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      setCurrentUser(res.data);
    };
    userFetch();
  }, [username]);

  return (
    <div className="flex h-screen w-screen relative z-0">
      <NavBar />
      <ProfileMainData user={currentUser} />
      {/* <WrappedMap /> */}
      <MapBar isFollowingBar={false} username={username} />
    </div>
  );
}

export default Profile;
