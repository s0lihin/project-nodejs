import axios from "axios";
import { createSecuredConfig } from "./AxiosService";
import { CookiesConstant, setCookies } from "./CookiesService";
import { BET_TYPE_NAMES, getDiscounts, MAX_BETS, MIN_BETS } from "./RuleService";


export const getAllBetTypes = async (token) => {
    const response = await axios.get('/betType/getAll', createSecuredConfig(token));
    let discounts = {};
    let multipliers = {};

    for (let i = 0; i < response.data.length; i++) {

        if (!(response.data[i].betType in discounts)) {
            discounts[response.data[i].betType] = response.data[i].discount;
            multipliers[response.data[i].betType] = response.data[i].multiplier;
        }

    }

    setCookies(CookiesConstant.DISCOUNTS, JSON.stringify(discounts));
    setCookies(CookiesConstant.MULTIPLIER, JSON.stringify(multipliers));
};

export const stdBetType = ({ num1, num2, num3, num4 }) => {
    let betType;

    if (num1 === '' && num2 === '' && num3 !== '' && num4 !== '') {
        betType = "2DR.STD";
    } else if (num1 === '' && num2 !== '' && num3 !== '' && num4 !== '') {
        betType = "3DR.STD";
    } else if (num1 !== '' && num2 !== '' && num3 !== '' && num4 !== '') {
        betType = "4D.STD";
    }

    let betTypeName = (betType && BET_TYPE_NAMES[betType]) ? BET_TYPE_NAMES[betType].betTypeName : '';
    let minBet = (betType) ? MIN_BETS[betType] : '';
    let maxBet = (betType) ? MAX_BETS[betType] : '';
    let discount = getDiscounts(betType);
    return { betType, betTypeName, discount, minBet, maxBet };
}

export const stdBetValidate = ({ betType, betAmountOri }) => {
    const betTypeName = (betType && BET_TYPE_NAMES[betType]) ? BET_TYPE_NAMES[betType].betTypeName : '';
    const minBet = (betType) ? MIN_BETS[betType] : '';
    const maxBet = (betType) ? MAX_BETS[betType] : '';

    if (betAmountOri > 0 && betAmountOri < minBet) {
        return `Bet  ${betTypeName}  tidak valid, min bet ${minBet}`;
    } else if (betAmountOri && betAmountOri > maxBet) {
        return `Bet  ${betTypeName}  tidak valid, max bet ${maxBet}`;
    } else {
        return null;
    }

}
