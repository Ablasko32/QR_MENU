import React from "react";

const SearchBar = (props) => {
  return (
    <div className="ml-10 pb-4 relative ">
      <input
        onChange={(event) => props.handleSearch(event)}
        value={props.searchTerm}
        type="search"
        placeholder="Unesi naziv"
        className="p-1 rounded-md opacity-75 text-gray-500"
      ></input>
    </div>
  );
};

export default SearchBar;
