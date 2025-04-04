import React, { useEffect, useState } from "react";

import { useRecipeStore } from "../store/useRecipeStore";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const RecipeDetails = () => {
  const { selectedMeal, selectMeal } = useRecipeStore();
  const { idMeal } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(selectedMeal);
  const [loading, setLoading] = useState(!selectedMeal);
  const [error, setError] = useState(null);

  console.log("Fetched ID from URL:", idMeal);

  useEffect(() => {
    const fetchMeal = async () => {
      if (!idMeal) {
        setError("Invalid meal ID.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching meal with ID: ${idMeal}`);
        const res = await axios.get(`${API_URL}lookup.php?i=${idMeal}`);
        console.log("API Response:", res.data);

        if (res.data.meals && res.data.meals.length > 0) {
          setMeal(res.data.meals[0]);
          selectMeal(res.data.meals[0]); // Save to store
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [idMeal]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!meal) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 mt-20">
      <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 text-white px-4 py-2 rounded mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold font-inter text-orange-500">{meal.strMeal}</h1>

      {/* Responsive Image */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full sm:w-[30rem] mx-auto h-[25rem] rounded-lg shadow-md mt-4"
      />
       
       <div className="flex flex-col items-center justify-center gap-10">
      <p className="text-lg mt-4 font-quicksand">
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p className="text-lg font-quicksand">
        <strong>Cuisine:</strong> {meal.strArea}
      </p>
      </div>
      </div>

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold font-quicksand mt-6">Ingredients</h2>
      <ul className="list-disc pl-6 mt-2">
        {[...Array(20)].map((_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ingredient ? (
            <li key={i} className="text-base font-quicksand ">
              {measure} {ingredient}
            </li>
          ) : null;
        })}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold font-inter mt-6">Instructions</h2>
      <p className="mt-2 text-gray-700 font-quicksand">{meal.strInstructions}</p>

      {/* Responsive YouTube Embed */}
      {meal.strYoutube && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Video Tutorial</h2>
          <div className="relative max-w-3xl max-h-96 overflow-hidden rounded-lg aspect-video mt-2">
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

