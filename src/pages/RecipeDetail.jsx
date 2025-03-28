import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/useRecipeStore";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const RecipeDetails = () => {
  const { selectedMeal, selectMeal } = useRecipeStore();
  const { idMeal } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(selectedMeal);
  const [loading, setLoading] = useState(!selectedMeal);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idMeal) return; // Prevent errors if no ID

    // Check if selectedMeal exists and has full details
    const hasFullDetails =
      selectedMeal &&
      selectedMeal.idMeal === idMeal &&
      selectedMeal.strInstructions;
    console.log("SelectdMeal:", selectedMeal);

    if (hasFullDetails) {
      setMeal(selectedMeal);
      return;
    }

    // Fetch full recipe details
    setLoading(true);
    axios
      .get(`${API_URL}lookup.php?i=${idMeal}`)
      .then((res) => {
        if (res.data.meals) {
          setMeal(res.data.meals[0]);
          selectMeal(res.data.meals[0]); // Store in Zustand
        } else {
          setError("Recipe not found.");
        }
      })
      .catch(() => setError("Failed to fetch recipe."))
      .finally(() => setLoading(false));
  }, [idMeal, selectedMeal, selectMeal]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!meal) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-orange-500">{meal.strMeal}</h1>

      {/* Responsive Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full sm:w-3/4 mx-auto rounded-lg shadow-md mt-4"
      />

      <p className="text-lg mt-4">
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p className="text-lg">
        <strong>Cuisine:</strong> {meal.strArea}
      </p>

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-6 mt-2">
        {[...Array(20)].map((_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ingredient ? (
            <li key={i}>
              {measure} {ingredient}
            </li>
          ) : null;
        })}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <p className="mt-2 text-gray-700">{meal.strInstructions}</p>

      {/* Responsive YouTube Embed */}
      {meal.strYoutube && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Video Tutorial</h2>
          <div className="relative w-full overflow-hidden rounded-lg aspect-video mt-2">
            <iframe
              className="w-full h-full"
              src={meal.strYoutube.replace("watch?v=", "embed/")}
              title="Recipe Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
