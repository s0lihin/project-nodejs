import { format, parse, subDays, addDays } from 'date-fns';
import { enUS, id } from 'date-fns/locale'
import { CookiesConstant, getCookies } from '../services/CookiesService';

export const DATE_FORMAT = 'dd-MM-yyyy';
export const NUMBER_FORMAT = 'yyyyMMdd';

export const isOpeningSessionValid = (openingSession) => {
    if(openingSession){
        let currentStr = format(new Date(), NUMBER_FORMAT);
        let openingSessionStr = format(openingSession, NUMBER_FORMAT);

        return parseInt(openingSessionStr) >= parseInt(currentStr);
    }else{
        return false;
    }
    
}

export const stringToDate = (str) => {
    return parse(str, DATE_FORMAT, new Date());
}

export const dateToString = (date) => {
    if(date){
        return format(date, DATE_FORMAT, new Date());
    }else{
        return null;
    }
}

export const datetimeToString = (date) => {
    if(date){
        return format(date, 'dd-MM-yyyy HH:mm', new Date());
    }else{
        return null;
    }
}

export const getWeekDay = (str) => {
    let date = parse(str, DATE_FORMAT, new Date());
    return format(date, 'EEEE', getLocale());
}

export const subtractDate = (date, num) => {
    return subDays(date, num);
}


export const addDate = (num) => {
    return addDays(new Date(), num);
}

const getLocale = () => {
    if (getCookies(CookiesConstant.LANGUAGE) === 'id') {
        return { locale: id };
    } else {
        return { locale: enUS };
    }
}