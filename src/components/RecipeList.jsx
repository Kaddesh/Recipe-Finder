import { useEffect } from "react";
import { useRecipeStore } from "../store/useRecipeStore";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const {
    fetchRecipes,
    fetchCategories,
    fetchCuisines,
    setSearchTerm,
    setSelectedCategory,
    setSelectedCuisine,
    getFilteredRecipes,
    searchTerm,
    selectedCategory,
    selectedCuisine,
    categories,
    cuisines,
  } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
    fetchCuisines();
  }, []);

  const filteredRecipes = getFilteredRecipes();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>

        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/4"
        >
          <option value="">All Cuisines</option>
          {cuisines.map((cuisine) => (
            <option key={cuisine.strArea} value={cuisine.strArea}>
              {cuisine.strArea}
            </option>
          ))}
        </select>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p className="text-gray-500 text-center col-span-3">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
