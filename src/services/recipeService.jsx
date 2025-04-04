import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}search.php?s=`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
};

export const fetchRecipesByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
};

export const fetchRecipesByCuisine = async (cuisine) => {
  try {
    const response = await axios.get(`${API_URL}filter.php?a=${cuisine}`);
    console.log("cuisine response:", response.data.meal)
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by cuisine:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchCuisines = async () => {
  try {
    const response = await axios.get(`${API_URL}list.php?a=list`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    return [];
  }
};
