import { getToken } from "./SecurityService";

export const createConfig = () => {
    return {
        timeout: 30000,
        baseURL: process.env.REACT_APP_HOST,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
};

export const createSecuredConfig = (token) => {
    const config = {
        timeout: 30000,
        baseURL: process.env.REACT_APP_HOST,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
    }

    return config;
};
