import NavBar from "../reusable_comp/NavBar";
import MapComp from "../reusable_comp/MapComp";
import MapBar from "../reusable_comp/MapBar";
import Feed from "./Feed";

import { useState } from "react";
function Home() {
  const isFullPost = true;
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="flex h-screen w-screen relative z-0">
      <NavBar />
      <Feed isFullPost={isFullPost} setSelectedPostId={setSelectedId} />
      <MapComp selectedPostId={selectedId} setSelectedPostId={setSelectedId} />
      <MapBar
        isFullPost={isFullPost}
        isFollowingBar={true}
        setSelectedPostId={setSelectedId}
      />
    </div>
  );
}

export default Home;
