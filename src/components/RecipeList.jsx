import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
      ) : (
        <p className="text-gray-500 text-center col-span-3">No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
