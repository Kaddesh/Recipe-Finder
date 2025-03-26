import { useEffect, useState } from "react";
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
    if (!selectedMeal && idMeal) {
      setLoading(true);
      axios
        .get(`${API_URL}lookup.php?i=${idMeal}`)
        .then((res) => {
          if (res.data.meals) {
            setMeal(res.data.meals[0]);
            selectMeal(res.data.meals[0]); // Store in Zustand for state consistency
          } else {
            setError("Recipe not found.");
          }
        })
        .catch(() => setError("Failed to fetch recipe."))
        .finally(() => setLoading(false));
    }
  }, [idMeal, selectedMeal, selectMeal]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!meal) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="bg-orange-500 text-white px-4 py-2 rounded mb-4">
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-orange-500">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg shadow-md mt-4" />

      <p className="text-lg mt-4"><strong>Category:</strong> {meal.strCategory}</p>
      <p className="text-lg"><strong>Cuisine:</strong> {meal.strArea}</p>

      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-6 mt-2">
        {[...Array(20)].map((_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
        })}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <p className="mt-2 text-gray-700">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Video Tutorial</h2>
          <iframe
            className="w-full h-64 mt-2"
            src={meal.strYoutube.replace("watch?v=", "embed/")}
            title="Recipe Video"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
