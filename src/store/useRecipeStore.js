// src/store/useRecipeStore.js
import { create } from "zustand";
import {
  fetchAllRecipes,
  fetchRecipesByCategory,
  fetchRecipesByCuisine,
  fetchCategories,
  fetchCuisines,
} from "../services/recipeService";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  categories: [],
  cuisines: [],
  selectedMeal: null,
  searchTerm: "",
  selectedCategory: "",
  selectedCuisine: "",
  favoriteRecipes: [],
  visibleCount: 9,

  setVisibleCount: (count) => set({ visibleCount: count }),

  fetchRecipes: async () => {
    const recipes = await fetchAllRecipes();
    set({ recipes, visibleCount: 9 });
  },

  fetchRecipesByCategory: async (category) => {
    const recipes = await fetchRecipesByCategory(category);
    set({ recipes, selectedCategory: category, selectedCuisine: "", visibleCount: 9 });
  },

  fetchRecipesByCuisine: async (cuisine) => {
    const recipes = await fetchRecipesByCuisine(cuisine);
    set({ recipes, selectedCuisine: cuisine, selectedCategory: "", visibleCount: 9 });
  },

  fetchCategories: async () => {
    const categories = await fetchCategories();
    set({ categories });
  },

  fetchCuisines: async () => {
    const cuisines = await fetchCuisines();
    console.log("Cuisines fetched:", cuisines)
    set({ cuisines });
  },

  setSearchTerm: (term) => set({ searchTerm: term, visibleCount: 9 }),

  setSelectedCategory: (category) => set({ selectedCategory: category, visibleCount: 10 }),

  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine, visibleCount: 10 }),

  getFilteredRecipes: () => get().recipes,

  toggleFavorite: (meal) => {
    const favorites = get().favoriteRecipes;
    const exists = favorites.find((fav) => fav.idMeal === meal.idMeal);
    if (exists) {
      set({ favoriteRecipes: favorites.filter((fav) => fav.idMeal !== meal.idMeal) });
    } else {
      set({ favoriteRecipes: [...favorites, meal] });
    }
  },

  loadMoreRecipes: () => set((state) => ({ visibleCount: state.visibleCount + 10 })),

  selectMeal: (meal) => set({ selectedMeal: meal }),
}));
