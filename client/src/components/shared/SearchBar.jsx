import React from "react";

const SearchBar = ({ handleSearch, searchOn = "Name" }) => {
  return (
    <div>
      <input
        className=" w-1/2 mt-3 p-1 pl-3 border border-gray-300 rounded-sm h-12"
        type="text"
        name="search"
        placeholder={`Search by ${searchOn}`}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
