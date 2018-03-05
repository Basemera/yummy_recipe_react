import axios from 'axios'
// create an instance of axios
let api = null

const getInitialiseApi = () => {
    if (api) return api;
    api = axios.create({
        baseURL:baseurl(),
        responseType: 'json'
    });
    return api;
};

const baseurl = () => "http://localhost:5000";

export const get = (url, config = null) => getInitialiseApi().get(url, config)

export const post = (url, data, config = null) => getInitialiseApi().post(url, data, config)

export const put = (url, data, config = null) => getInitialiseApi().put(url, data, config)

export const del = (url, config = null) => getInitialiseApi().delete(url, config)