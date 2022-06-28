import { getCookies, setCookies, removeAllCookies, CookiesConstant, COOKIES_OPTIONS } from './CookiesService';


export const setTokenAndUser = ({ id, username, token }) => {
    setCookies(CookiesConstant.TOKEN, token);
    setCookies(CookiesConstant.USER_ID, id);
    setCookies(CookiesConstant.USERNAME, username, COOKIES_OPTIONS);
}

export const isLoggedIn = () => {
    return (getToken() && getUserId());
}

export const getToken = () => {
    return getCookies(CookiesConstant.TOKEN);
}

export const getUserId = () => {
    return getCookies(CookiesConstant.USER_ID);
}

export const getUsername = () => {
    return getCookies(CookiesConstant.USERNAME);
}

export const logout = () => {
    removeAllCookies();
}