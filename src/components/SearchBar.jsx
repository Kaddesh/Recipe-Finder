import React from "react";
import { useRecipeStore } from "../store/useRecipeStore";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useRecipeStore();

  return (
    <div className="max-w-3xl mx-auto">
    <input
      type="text"
      placeholder="Search for a recipe..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-orange-500"
    />
    </div>
  );
};

export default SearchBar;
