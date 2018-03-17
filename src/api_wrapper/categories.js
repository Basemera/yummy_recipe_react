import {post, get, put, del} from './api_wrapper';
import { getTokenConfig } from '../utils/authservice'


export const createCategory = (data) => post('/category', data, getTokenConfig());

export const getCategories = () => get('/category', getTokenConfig());

export const searchCategories = (category_name) => get(`category/search?q=${category_name}`, getTokenConfig())

export const editCategory = (category_id, data) => put(`/category/${category_id}`, data, getTokenConfig()); 

export const deleteCategory = (category_id) => del(`/category/${category_id}`, getTokenConfig());

export const categoriesSearchChangePage = (number) => get(`/category?page=${number}`, getTokenConfig());

export const searchClickCategories = (category_name, pages) => get(`/category/search?q=${category_name}&page=${pages}`, getTokenConfig());

