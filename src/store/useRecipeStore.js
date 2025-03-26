// Zustand Store - src/store/useRecipeStore.js
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

  fetchRecipes: async () => {
    const response = await axios.get(`${API_URL}search.php?s=`);
    set({ recipes: response.data.meals || [] });
  },

  fetchCategories: async () => {
    const response = await axios.get(`${API_URL}categories.php`);
    set({ categories: response.data.categories || [] });
  },

  fetchCuisines: async () => {
    const response = await axios.get(`${API_URL}list.php?a=list`);
    set({ cuisines: response.data.meals || [] });
  },

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine }),

  getFilteredRecipes: () => {
    let filtered = get().recipes;
    if (get().searchTerm)
      filtered = filtered.filter((r) =>
        r.strMeal.toLowerCase().includes(get().searchTerm.toLowerCase())
      );
    if (get().selectedCategory)
      filtered = filtered.filter((r) => r.strCategory === get().selectedCategory);
    if (get().selectedCuisine)
      filtered = filtered.filter((r) => r.strArea === get().selectedCuisine);

    return filtered;
  },

  toggleFavorite: (meal) => {
    const favorites = get().favoriteRecipes;
    const exists = favorites.find((fav) => fav.idMeal === meal.idMeal);
    if (exists) {
      set({ favoriteRecipes: favorites.filter((fav) => fav.idMeal !== meal.idMeal) });
    } else {
      set({ favoriteRecipes: [...favorites, meal] });
    }
  },

  selectMeal: (meal) => set({ selectedMeal: meal }),
}));
