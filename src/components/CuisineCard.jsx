import React from "react";
import { Link } from "react-router-dom";

const CuisineCard = ({ cuisine }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center">
      <img
        src={`https://flagcdn.com/w320/${cuisine.code}.png`} // Placeholder for country flags
        alt={cuisine.strArea}
        className="w-16 h-16 rounded-full mb-3"
      />
      <h3 className="text-lg font-semibold">{cuisine.strArea}</h3>
      <Link
        to={`/cuisine/${cuisine.strArea}`}
        className="mt-2 text-orange-500 hover:underline"
      >
        View More
      </Link>
    </div>
  );
};

export default CuisineCard;