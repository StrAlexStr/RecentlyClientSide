import NavBar from "../reusable_comp/NavBar";
import WrappedMap from "../reusable_comp/WrappedMap";
import MapBar from "../reusable_comp/MapBar";
import Feed from "./Feed";

function Home() {
  const isFullPost = true;
  return (
    <div className="flex h-screen w-screen relative z-0">
      <NavBar />
      <Feed isFullPost={isFullPost} />
      <WrappedMap />
      <MapBar isFullPost={isFullPost} isFollowingBar={true} />
    </div>
  );
}

export default Home;
