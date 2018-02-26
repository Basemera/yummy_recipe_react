import {post, get, put, del} from './api_wrapper';


export const createRecipes = (category_id, recipe) => post('/category/${category}/recipes', recipe, {'x-access-token':localStorage.getItem('token')});

export const getRecipes = (category_id) => get('/category/${category}/recipes', {'x-access-token':localStorage.getItem('token')});

export const editRecipes = (recipe_id, data) => put(`/category/recipes/${recipe_id}`, 
                            data, {'x-access-token':localStorage.getItem('token')});
export const deleteRecipes = (category, recipe_id, data) => del(`/category/${category}/recipes/${recipe_id}`, 
{'x-access-token':localStorage.getItem('token')});

