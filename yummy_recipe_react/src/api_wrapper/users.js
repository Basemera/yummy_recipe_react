import {post} from './api_wrapper';

export const userSignUp = data => post('/register', data);

export const logInUser = data => post('/login', data);

