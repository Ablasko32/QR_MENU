import React from "react";

const SearchBar = () => {
  return (
    <div className="p-4 relative ">
      <form className="flex space-x-2">
        <input
          type="search"
          placeholder="Unesi naziv"
          className="p-1 rounded-md opacity-75"
        ></input>
        <input type="submit" value="Traži" />
      </form>
    </div>
  );
};

export default SearchBar;
