import Cookies from 'js-cookie';

export const COOKIES_OPTIONS = { expires: 1 };

export const CookiesConstant = {
    TOKEN: 'INFINI4D_TOKEN',
    USER_ID: 'INFINI4D_USER_ID',
    USERNAME: 'INFINI4D_USERNAME',
    PROVIDERS: 'INFINI4D_PROVIDERS',
    SHIFTS: 'INFINI4D_SHIFTS',
    LANGUAGE: 'INFINI4D_LANGUAGE',
    PROVIDER_STATUS: 'INFINI4D_PROVIDER_STATUS',
    GAME_ID: 'INFINI4D_GAME_ID',
    DISCOUNTS: 'INFINI4D_DISCOUNTS',
    MULTIPLIER : 'INFINI4D_MULTIPLIER'
}

export const setCookies = (name, value) => {
    Cookies.set(name, value, COOKIES_OPTIONS);
}

export const getCookies = (name) => {
    return Cookies.get(name);
}

export const removeCookies = (name) => {
    Cookies.remove(name);
}

export const removeAllCookies = () => {
    for (var value of Object.values(CookiesConstant)) {
        Cookies.remove(value);
    }
}