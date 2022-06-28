import axios from "axios";
import { createConfig, createSecuredConfig } from "./AxiosService";
import { getUserId, setTokenAndUser } from "./SecurityService";

export const checkTokenAPI = async (query) => {
    const url = '/gameToken/check' + query;
    const { data } = await axios.get(url, createConfig());
    setTokenAndUser(data);
    return data;
};

export const getBalanceWithIdAndToken = async ({ id, token }) => {
    const url = '/user/balance/' + id;
    const { data } = await axios.get(url, createSecuredConfig(token))
    return data.balance;
};

export const getBalanceAPI = async () => {
    const url = '/user/balance/' + getUserId();
    const { data } = await axios.get(url, createSecuredConfig())
    return data.balance;
};


export const getProviders = async () => {
    const { data } = await axios.get('/shift/getAllProvider', createSecuredConfig());

    let shifts = [...data];
    let shiftsGroup = {};

    shifts = shifts.map(shift => {
        let arr = shift.labelName.split('-');
        let time = arr.length === 2 ? arr[1].trim() : '';
        return { ...shift, time };
    });

    let openShifts = data.filter(shift => shift.status === 'open');
    let shift = openShifts[0];

    for (let i = 0; i < shifts.length; i++) {
        if (shiftsGroup[shifts[i].providerName]) {
            shiftsGroup[shifts[i].providerName].push(shifts[i]);
        } else {
            shiftsGroup[shifts[i].providerName] = [shifts[i]]
        }
    }

    return { shift, shiftsGroup, shifts };
};


export const splitProviderName = (name) => {
    name = capitalize(name);
    return name.replace("Pools", " Pools");
}

export const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
}
