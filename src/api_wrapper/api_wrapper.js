import axios from 'axios';

/**
 * create an instance of axios*.
 */
const baseurl = () => 'https://basemera-recipes.herokuapp.com/';

let api = null;

const getInitialiseApi = () => {
    if (api) return api;
    api = axios.create({
        baseURL: baseurl(),
        responseType: 'json',
    });
    return api;
};

export const get = (url, config = null) => getInitialiseApi().get(url, config);

export const post = (url, data, config = null) =>
    getInitialiseApi().post(url, data, config);

export const put = (url, data, config = null) =>
    getInitialiseApi().put(url, data, config);

export const del = (url, config = null) =>
    getInitialiseApi().delete(url, config);
