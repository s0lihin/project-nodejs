import { getUserId, getUsername } from "./SecurityService"

export const generateQuick2DNumbers = (type, betAmount) => {

    let result = [];

    for (let index = 0; index < 100; index++) {

        if (type === 'small' && index < 50) {
            result.push(getNumbersByBetType(betAmount, index));
        } else if (type === 'big' && index > 49) {
            result.push(getNumbersByBetType(betAmount, index));
        } else if (type === 'even' && index % 2 === 0) {
            result.push(getNumbersByBetType(betAmount, index));
        } else if (type === 'odd' && index % 2 !== 0) {
            result.push(getNumbersByBetType(betAmount, index));
        }

    }

    return result;
}

const getNumbersByBetType = (betAmount, index) => {
    let request = {
        "userId": getUserId(),
        "username": getUsername(),
        "providerName": '',
        "betOn": '',
        "betAmountOri": betAmount,
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
        "checked": true
    }

    let nums = ('0' + index).slice(-2);
    request.num3 = nums[0];
    request.num4 = nums[1];

    return request;
}