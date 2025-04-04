import React from "react";
import { useRecipeStore } from "../store/useRecipeStore";

const CategoryList = () => {
  const { categories: recipeCategories, selectedCategory, setSelectedCategory } = useRecipeStore();

  return (
    <div className="flex space-x-4 mt-4 overflow-x-auto">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          selectedCategory === "" ? "bg-orange-400 text-white" : "bg-gray-200 hover:bg-orange-200 hover:text-white"
        }`}
        onClick={() => setSelectedCategory("")} // Reset category selection
      >
        All
      </button>

      {/* Category buttons */}
      {recipeCategories?.map((category) => (
        <button
          key={category.idCategory}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === category.strCategory ? "bg-orange-400 text-white" : "bg-gray-200 hover:bg-orange-200 hover:text-white"
          }`}
          onClick={() => setSelectedCategory(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
