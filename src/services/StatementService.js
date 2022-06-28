import axios from 'axios';
import { dateToString } from '../utility/DateUtility';
import { createSecuredConfig } from "./AxiosService";
import { getUserId } from './SecurityService';

export const getStatementByDate = async (openingSession, itemsPerPage, page) => {
    var userId = getUserId();
    var date = dateToString(openingSession);
    var offset = itemsPerPage;

    return await axios.get(`/statement/getStatementByDate`, { 
        params: { userId, date, offset, page }, ...createSecuredConfig() 
    });
};

export const getAndCountStatementByDate = async (openingSession, itemsPerPage, page) => {
    var userId = getUserId();
    var date = dateToString(openingSession);
    var offset = itemsPerPage;

    const countResponse = await axios.get(`/statement/getStatementCountByDate`, { 
        params: { userId, date }, ...createSecuredConfig() 
    });

    const getResponse = await axios.get(`/statement/getStatementByDate`, { 
        params: { userId, date, offset, page }, ...createSecuredConfig() 
    });

    return {
        data: getResponse['data'],
        count: countResponse['data'],
    }
};