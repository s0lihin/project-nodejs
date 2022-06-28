import axios from "axios";
import { createSecuredConfig } from "./AxiosService";

export const getWinBetOn = ({ providerName, shift }) => {
    const config = {
        params: {
            providerName, shift
        }, ...createSecuredConfig()
    }
    return axios.get('/winbet/getWinBetOn', config);
};