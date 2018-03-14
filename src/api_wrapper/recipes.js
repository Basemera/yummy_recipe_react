import {post, get, put, del} from './api_wrapper';
import { getTokenConfig } from '../utils/authservice';


export const createRecipes = (category, recipe) => post(`/category/${category}/recipes`, recipe, getTokenConfig());

export const getRecipes = (category) => get(`/category/${category}/recipes`, getTokenConfig());

export const editRecipes = (category, recipe_id, data) => put(`/category/${category}/recipes/${recipe_id}`, 
                            data, getTokenConfig());
export const deleteRecipes = (category, recipe_id) => del(`/category/${category}/recipes/${recipe_id}`, 
getTokenConfig());

export const recipesSearchChangePage = (number, category) => get(`/category/${category}/recipes?page=${number}`, getTokenConfig());

export const searchClickRecipes = (recipe_name, pages, category) => get(`/category/${category}/recipes?q=${recipe_name}&page=${pages}`, getTokenConfig());

export const searchRecipes = (recipe_name, category) => get(`/category/${category}/recipes/search?q=${recipe_name}`, getTokenConfig());

