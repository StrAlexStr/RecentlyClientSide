import NavBar from "../reusable_comp/NavBar";
import CreatePostForm from "./CreatePostForm";
import MapComp from "../reusable_comp/MapComp";
import { useState } from "react";

function CreatePostPage() {
  const [coord, setCoord] = useState({});

  return (
    <div className="flex h-screen w-screen relative z-0">
      <NavBar />
      <CreatePostForm coordinates={coord} />
      <MapComp
        fromCreatePost={true}
        coordinates={coord}
        setCoordinates={setCoord}
      />
    </div>
  );
}

export default CreatePostPage;
