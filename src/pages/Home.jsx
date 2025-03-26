import { useEffect } from "react";
import { useRecipeStore } from "../store/useRecipeStore";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import CategoryList from "../components/CategoryList";
import CuisineList from "../components/CuisineList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { recipes, fetchRecipes, categories, fetchCategories, cuisines, fetchCuisines } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
    fetchCuisines();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-orange-500">Discover Delicious Recipes</h1>
          <p className="text-gray-600 mt-2">Find, cook, and enjoy meals from around the world.</p>
        </section>

        {/* Search Bar */}
        <SearchBar />

        {/* Featured Recipes */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Featured Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {recipes.slice(0, 6).map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Recipe Categories</h2>
          <CategoryList categories={categories} />
        </section>

        {/* Cuisines */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Cuisines</h2>
          <CuisineList cuisines={cuisines} />
        </section>
      </div>
    </div>
  );
};

export default Home;
