function ChooseFeed({ userFeed, setUserFeed, setSortElement }) {
  return (
    <div
      className="flex flex-row w-full items-center justify-center bg-logo py-4"
      style={{ fontFamily: "Baloo2" }}
    >
      <button
        className={`px-4 text-lg ${
          userFeed
            ? "bg-main text-white"
            : "bg-white text-main hover:bg-opacity-70"
        } rounded-l-md`}
        onClick={() => {
          setUserFeed(true);
          setSortElement("");
        }}
      >
        Users
      </button>
      <button
        className={`px-4 text-lg  ${
          userFeed
            ? "bg-white text-main hover:bg-opacity-70"
            : "bg-main text-white"
        }  rounded-r-md`}
        onClick={() => {
          setUserFeed(false);
          setSortElement("");
        }}
      >
        Posts
      </button>
    </div>
  );
}

export default ChooseFeed;
