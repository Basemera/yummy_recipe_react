import {post, get, put, del} from './api_wrapper';


export const createCategory = (data) => post('http://127.0.0.1:5000/category', data, {'x-access-token':localStorage.getItem('token')});

export const getCategories = () => get('/category', {'x-access-token':localStorage.getItem('token')});

export const editCategory = (category_id, data) => put('/category/${category_id', data, {'x-access-token':localStorage.getItem('token')}); 

export const deleteCategory = (category_id) => del('/category/${category_id}', {'x-access-token':localStorage.getItem('token')});

