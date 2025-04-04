import React, { useEffect, useState } from "react";
import { useRecipeStore } from "../store/useRecipeStore";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import CuisineCard from "../components/CuisineCard";
import CategoryList from "../components/CategoryList";
import { useNavigate } from "react-router-dom";
import Hero from "../components/hero";

const Home = () => {
  const {
    searchTerm, 
    fetchRecipesByCategory,
    fetchRecipesByCuisine,
    fetchRecipes,
    categories,
    fetchCategories,
    cuisines,
    fetchCuisines,
    setSelectedCategory,
    setSelectedCuisine,
    selectedCategory,
    selectedCuisine,
    getFilteredRecipes,
    loadMoreRecipes,
    visibleCount,
    setVisibleCount,
  } = useRecipeStore();

  const navigate = useNavigate();
  const [visibleCuisines, setVisibleCuisines] = useState(9); // State for cuisines visibility

  // Initial Data Fetch
  useEffect(() => {
    fetchCategories();
    fetchCuisines();
    fetchRecipes();
  }, []);

  // Fetch Recipes on Category/Cuisine Change
  useEffect(() => {
    if (selectedCategory) {
      fetchRecipesByCategory(selectedCategory);
    } else if (selectedCuisine) {
      fetchRecipesByCuisine(selectedCuisine);
    } else {
      fetchRecipes();
    }
  }, [selectedCategory, selectedCuisine]);

   const recipes = getFilteredRecipes().filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  {/*  const recipes = getFilteredRecipes()
  console.log('recipeso', recipes)  */}

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
        <Hero />
        <main className="p-6 lg:p-20">
             {/* Search Bar & Filters */}
        <SearchBar />

      {/* Recipe Categories */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Recipe Categories</h2>
        {categories.length > 0 ? (
          <CategoryList  />
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </section>

      {/* Display Recipes */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">
          {selectedCategory
            ? `Recipes in Category: ${selectedCategory}`
            : selectedCuisine
            ? `Recipes in Cuisine: ${selectedCuisine}`
            : "Featured Recipes"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {recipes.length > 0 ? (
            recipes.slice(0, visibleCount).map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No recipes found matching your search.</p>
          )}
        </div>
        {/* Show More / Show Less Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          {visibleCount < recipes.length && (
            <LoadMoreButton
              onClick={() => loadMoreRecipes()}
              label="Show More"
              condition={visibleCount < recipes.length}
            />
          )}
          {visibleCount > 10 && (
            <LoadMoreButton
              onClick={() => setVisibleCount(9)}
              label="Show Less"
              condition={visibleCount > 10}
            />
          )}
        </div>
      </section>

      {/* Cuisines */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Cuisines</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {cuisines.slice(0, visibleCuisines).map((cuisine, index) => (
            <CuisineCard
              key={`${cuisine}-${index}`}
              cuisine={cuisine}
              onClick={() => {
                setSelectedCuisine(cuisine);
                navigate(`/cuisine/${cuisine}`);
              }}
            />
          ))}
        </div>
        {/* Show More / Show Less Buttons for Cuisines */}
        <div className="flex justify-center mt-6 space-x-4">
          {visibleCuisines < cuisines.length && (
            <button
              onClick={() => setVisibleCuisines(visibleCuisines + 9)}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Show More
            </button>
          )}
          {visibleCuisines > 9 && (
            <button
              onClick={() => setVisibleCuisines(9)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Show Less
            </button>
          )}
        </div>
      </section>
      </main>
    </div>
    
  );
};

// Load More Button Component
const LoadMoreButton = ({ onClick, label, condition }) => {
  if (!condition) return null;
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
    >
      {label}
    </button>
  );
};

export default Home;
