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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-500">{cuisine} Cuisine</h1>
      <p className="text-gray-600 mt-2">Enjoy traditional recipes from {cuisine}.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p className="text-gray-500">No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default CuisinePage;