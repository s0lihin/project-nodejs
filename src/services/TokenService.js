const axios = require('axios');

export const checkToken = async (query) => {
    const url = '/gameToken/check' + query;
    const config = {
        timeout: 15000,
        baseURL: process.env.REACT_APP_HOST,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    return axios.get(url, config);
};