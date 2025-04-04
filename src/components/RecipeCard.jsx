import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { toggleFavorite, favoriteRecipes, selectMeal } = useRecipeStore();

  const isFavorite = favoriteRecipes.some((fav) => fav.idMeal === recipe.idMeal);

  const handleClick = () => {
    console.log("Full recipe object:", recipe);
    if (!recipe?.idMeal) {
      console.warn("Cannot navigate: recipe.idMeal is missing", recipe);
      return;
    }
    selectMeal(recipe);
    navigate(`/recipe/${recipe.idMeal}`);
  };

  console.log("Navigating to recipe with id:", recipe.idMeal);
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover cursor-pointer"
        onClick={handleClick}
      />
      <div className="p-4 flex justify-between items-center">
        <div onClick={handleClick} className="cursor-pointer">
          <h3 className="text-lg font-bold font-inter">{recipe.strMeal}</h3>
          <p className="text-sm text-gray-500 font-quicksand">{recipe.strCategory}</p>
        </div>
        <button onClick={() => toggleFavorite(recipe)} className="text-red-500 text-xl">
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
