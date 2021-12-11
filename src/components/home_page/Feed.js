import { useState } from "react";
import SearchFeed from "./SearchFeed";
import ChooseFeed from "./ChooseFeed";
import PostFeed from "./PostFeed";
import UserFeed from "./UserFeed";
//main
function Feed({ isFullPost, setSelectedPostId }) {
  const [userFeed, setUserFeed] = useState(false);
  const [sortElement, setSortElement] = useState(null);

  return (
    <div className="bg-bg_login w-1/4 flex flex-col items-center">
      <ChooseFeed
        userFeed={userFeed}
        setUserFeed={setUserFeed}
        setSortElement={setSortElement}
      />
      <SearchFeed
        userFeed={userFeed}
        sortElement={sortElement}
        setSortElement={setSortElement}
      />
      {userFeed ? (
        <UserFeed sortElement={sortElement} />
      ) : (
        <PostFeed
          sortElement={sortElement}
          setSelectedPostId={setSelectedPostId}
          isFullPost={isFullPost}
        />
      )}
    </div>
  );
}

export default Feed;
