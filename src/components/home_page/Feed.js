import { useState, useEffect } from "react";
import SearchFeed from "./SearchFeed";
import ChooseFeed from "./ChooseFeed";
import PostFeed from "./PostFeed";
import UserFeed from "./UserFeed";
//main
function Feed({ isFullPost }) {
  const [userFeed, setUserFeed] = useState(false);

  return (
    <div className="bg-bg_login w-1/4 flex flex-col items-center">
      <ChooseFeed userFeed={userFeed} setUserFeed={setUserFeed} />
      <SearchFeed userFeed={userFeed} />
      {userFeed ? <UserFeed /> : <PostFeed isFullPost={isFullPost} />}
    </div>
  );
}

export default Feed;
