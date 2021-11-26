import { HiSearch } from "react-icons/hi";

function SearchFeed({ userFeed }) {
  return (
    <div className="flex items-center border-b w-3/4 border-main py-2 mt-3">
      <div className="bg-bg_login w-full flex flex-row items-center justify-start">
        <HiSearch className="text-lg pt-1 text-main text-opacity-70" />
        <input
          type="text"
          placeholder={`${
            userFeed ? "Search by username" : "Search by key word"
          }`}
          className="appearance-none bg-bg_login border-none w-full text-main mr-3 text-lg py-1 px-2 leading-tight focus:outline-none"
        />
      </div>
    </div>
  );
}

export default SearchFeed;
