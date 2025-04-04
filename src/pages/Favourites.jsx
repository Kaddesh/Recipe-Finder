import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useRecipeStore } from "../store/useRecipeStore";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const { isAuthenticated } = useAuthStore();
  const { favoriteRecipes } = useRecipeStore(); 

  if (!isAuthenticated) return  <Navigate to="/signin" />; 

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold font-inter text-center mb-6 pt-20">Your Favorite <span className="text-orange-500">Recipes</span> </h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet. Add some from the home page!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
