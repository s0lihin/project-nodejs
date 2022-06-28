import axios from "axios";
import { createSecuredConfig } from "./AxiosService";
import { getUserId, getUsername } from "./SecurityService";

export const initFttdRequest = () => {
    const request = [];

    for (let i = 0; i < 10; i++) {
        request.push({
            "userId": getUserId(),
            "username": getUsername(),
            "providerName": '',
            "betOn": '',
            "betAmountOri": '',
            "discount": '',
            "betAmount": '',
            "betType": '',
            "betTypeName": '',
            "openingSession": '',
            "shift": 1,
            "num1": '',
            "num2": '',
            "num3": '',
            "num4": '',
            "checked": false
        })
    }

    return request;
}

export const initFttdSetRequest = () => {
    const request = [];

    for (let i = 0; i < 10; i++) {
        request.push({
            "num1": '',
            "num2": '',
            "num3": '',
            "num4": '',
            "bet2D": '',
            "bet3D": '',
            "bet4D": '',
            "betall": ''
        })
    }

    return request;
}

export const bet = async (data) => {
    return await axios.post('/bet/', data, createSecuredConfig());
};

export const postBetAPI = async (data) => {
    return await axios.post('/bet/', data, createSecuredConfig());
};