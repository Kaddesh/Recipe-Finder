import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";
import { useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

const CuisinePage = () => {
  const { cuisine } = useParams();
  const { recipes, fetchRecipesByCuisine } = useRecipeStore();

  useEffect(() => {
    fetchRecipesByCuisine(cuisine);
  }, [cuisine, fetchRecipesByCuisine]);

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-20 ">
      <div className="text-center mt-20 space-y-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-black font-inter">
          {cuisine} Cuisine
        </h1>
        <h2 className="text-Black text-lg lg:text-3xl text-center font-quicksand">
          Enjoy{" "}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            traditional recipes
          </span>{" "}
          from {cuisine}.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p className="text-gray-500">No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default CuisinePage;
