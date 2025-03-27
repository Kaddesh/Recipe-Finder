import { create } from "zustand";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  categories: [],
  cuisines: [],
  selectedMeal: null,
  searchTerm: "",
  selectedCategory: "",
  selectedCuisine: "",
  favoriteRecipes: [],
  visibleCount: 9, // Initial count of visible recipes

  // Fetch All Recipes
  fetchRecipes: async () => {
    try {
      const response = await axios.get(`${API_URL}search.php?s=`);
      console.log("All Recipes:", response.data.meals); // Debugging Log
      set({ recipes: response.data.meals || [], visibleCount: 9 });
    } catch (error) {
      console.error("Error fetching all recipes:", error);
    }
  },

  // Fetch Recipes by Category
  fetchRecipesByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}filter.php?c=${category}`);
      console.log(`Recipes in category ${category}:`, response.data.meals); // Debugging Log
      set({
        recipes: response.data.meals || [],
        selectedCategory: category,
        selectedCuisine: "", // Reset cuisine
        visibleCount: 9,
      });
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
    }
  },

  // Fetch Recipes by Cuisine
  fetchRecipesByCuisine: async (cuisine) => {
    try {
      const response = await axios.get(`${API_URL}filter.php?a=${cuisine}`);
      console.log(`Recipes in cuisine ${cuisine}:`, response.data.meals); // Debugging Log
      set({
        recipes: response.data.meals || [],
        selectedCuisine: cuisine,
        selectedCategory: "", // Reset category
        visibleCount: 9,
      });
    } catch (error) {
      console.error("Error fetching recipes by cuisine:", error);
    }
  },

  // Fetch Categories
  fetchCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}categories.php`);
      console.log("Categories:", response.data.categories); // Debugging Log
      set({ categories: response.data.categories || [] });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  // Fetch Cuisines
  fetchCuisines: async () => {
    try {
      const response = await axios.get(`${API_URL}list.php?a=list`);
      console.log("Cuisines:", response.data.meals); // Debugging Log
      set({ cuisines: response.data.meals || [] });
    } catch (error) {
      console.error("Error fetching cuisines:", error);
    }
  },

  // Set Search Term
  setSearchTerm: (term) => set({ searchTerm: term, visibleCount: 9 }),

  // Set Selected Category
  setSelectedCategory: (category) => set({ selectedCategory: category, visibleCount: 10 }),

  // Set Selected Cuisine
  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine, visibleCount: 10 }),

  // Get Filtered Recipes
  getFilteredRecipes: () => {
    return get().recipes; // Directly return recipes as they are already filtered by API
  },

  // Toggle Favorite Recipes
  toggleFavorite: (meal) => {
    const favorites = get().favoriteRecipes;
    const exists = favorites.find((fav) => fav.idMeal === meal.idMeal);
    if (exists) {
      set({ favoriteRecipes: favorites.filter((fav) => fav.idMeal !== meal.idMeal) });
    } else {
      set({ favoriteRecipes: [...favorites, meal] });
    }
  },

  // Load More Recipes
  loadMoreRecipes: () => set((state) => ({ visibleCount: state.visibleCount + 10 })),

  selectMeal: (meal) => set({ selectedMeal: meal }),
}));

