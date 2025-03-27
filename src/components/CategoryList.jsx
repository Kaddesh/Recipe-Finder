import React from "react";

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="flex space-x-4 mt-4 overflow-x-auto">
      <button
        className="bg-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-500 hover:text-white transition"
        onClick={() => onSelectCategory(null)} // Reset category
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.idCategory}
          className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-500 hover:text-white transition"
          onClick={() => onSelectCategory(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
