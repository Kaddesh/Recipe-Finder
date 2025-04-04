import React from "react";

const CuisineList = ({ cuisines, onSelectCuisine }) => {
  return (
    <div className="flex space-x-4 mt-4 overflow-x-auto">
      {cuisines.map((cuisine, index) => (
        <button
          key={index}
          className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-500 hover:text-white transition"
          onClick={() => onSelectCuisine(cuisine.strArea)} 
        >
          {cuisine.strArea}
        </button>
      ))}
    </div>
  );
};

export default CuisineList;
