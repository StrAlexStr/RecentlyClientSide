import AvatarUserFeed from "./AvatarUserFeed";
//sec
function UserFeed() {
  return (
    <div className="flex flex-col w-full p-4 mt-4 overflow-auto scrollbar scrollbar-thumb-logo scrollbar-thin scrollbar-thumb-rounded-lg">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">Friends only</span>
        </label>
      </div>
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
      <AvatarUserFeed />
    </div>
  );
}

export default UserFeed;
