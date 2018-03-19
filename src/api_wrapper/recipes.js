import { post, get, put, del } from './api_wrapper';
import { getTokenConfig } from '../utils/authservice';

export const createRecipes = (category, data) =>
    post(`/category/${category}/recipes`, data, getTokenConfig());

export const getRecipes = category =>
    get(`/category/${category}/recipes`, getTokenConfig());

export const editRecipes = (category, recipe_id, data) =>
    put(`/category/${category}/recipes/${recipe_id}`, data, getTokenConfig());
export const deleteRecipes = (category, recipe_id) =>
    del(`/category/${category}/recipes/${recipe_id}`, getTokenConfig());

export const recipesSearchChangePage = (number, category) =>
    get(`/category/${category}/recipes?page=${number}`, getTokenConfig());

export const searchClickRecipes = (recipeName, pages, category) =>
    get(
        `/category/${category}/recipes?q=${recipeName}&page=${pages}`,
        getTokenConfig(),
    );

export const searchRecipes = (recipeName, category) =>
    get(
        `/category/${category}/recipes/search?q=${recipeName}`,
        getTokenConfig(),
    );
