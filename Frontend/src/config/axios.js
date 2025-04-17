// import packages
import axios from 'axios';

// import lib
import config from './index';
import { getAuthToken,removeAuthToken } from '../lib/localStorage'
import isLogin from '../lib/isLogin';

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.common['Authorization'] = getAuthToken();

axios.defaults.headers.common['Content-Security-Policy'] =
    "default-src 'self'; " +
    `script-src 'self' ${config.FRONT_URL} 'unsafe-inline' 'unsafe-eval'; ` +
    `style-src 'self'  ${config.FRONT_URL} 'unsafe-inline'; ` +
    `img-src 'self' data:  ${config.FRONT_URL}; ` +
    `font-src 'self'  ${config.FRONT_URL}; ` +
    `connect-src 'self'  ${config.FRONT_URL}; ` +
    `media-src 'self'  ${config.FRONT_URL}; ` +
    `frame-src 'self'  ${config.FRONT_URL}; ` +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "upgrade-insecure-requests; " +
    "block-all-mixed-content;";

export const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export const removeAuthorization = () => {
    delete axios.defaults.headers.common["Authorization"];
}

export const handleResp = (respData, type = 'success') => {
    try {
        // console.log('respDatarespDatarespDatarespData-----', respData);
        // return false;
        if (isLogin() && type == 'error' && respData && respData.response && respData.response.status == 401) {
            removeAuthToken()
            removeAuthorization()
            window.location.href = '/login'
            return true
        }
    } catch (err) {
        return false
    }
}

export default axios;