import { CookiesConstant, getCookies } from "./CookiesService"

export const BET_TYPES = [
    "2DR.STD",
    "3DR.STD",
    "4D.STD",
    "1D.STD",
    "NAGA",
    "MACAU",
    "PINGGIRAN.BESAR",
    "PINGGIRAN.KECIL",
    "PINGGIRAN.GENAP",
    "PINGGIRAN.GANJIL"
]

export const BET_TYPE_NAMES = {
    "2DR.STD": {
        "betTypeName": "2D BELAKANG",
        "betTypeNameRule": "2D"
    },
    "3DR.STD": {
        "betTypeName": "3D BELAKANG",
        "betTypeNameRule": "3D"
    },
    "4D.STD": {
        "betTypeName": "4D",
        "betTypeNameRule": "4D"
    },
    "1D.STD": {
        "betTypeName": "1D",
        "betTypeNameRule": "1D"
    },
    "NAGA": {
        "betTypeName": "NAGA",
        "betTypeNameRule": "NAGA"
    },
    "MACAU": {
        "betTypeName": "MACAU",
        "betTypeNameRule": "MACAU"
    },
    "PINGGIRAN.BESAR": {
        "betTypeName": "PINGGIRAN.BESAR",
        "betTypeNameRule": "PINGGIRAN.BESAR"
    },
    "PINGGIRAN.KECIL": {
        "betTypeName": "PINGGIRAN.KECIL",
        "betTypeNameRule": "PINGGIRAN.KECIL"
    },
    "PINGGIRAN.GENAP": {
        "betTypeName": "PINGGIRAN.GENAP",
        "betTypeNameRule": "PINGGIRAN.GENAP"
    },
    "PINGGIRAN.GANJIL": {
        "betTypeName": "PINGGIRAN.GANJIL",
        "betTypeNameRule": "PINGGIRAN.GANJIL"
    }
}

export const MIN_BETS = {
    "2DR.STD": 500,
    "3DR.STD": 500,
    "4D.STD": 500,
    "1D.STD": 500,
    "NAGA": 500,
    "MACAU": 500,
    "PINGGIRAN.BESAR": 500,
    "PINGGIRAN.KECIL": 500,
    "PINGGIRAN.GENAP": 500,
    "PINGGIRAN.GANJIL": 500
}

export const MAX_BETS = {
    "2DR.STD": 20000000,
    "3DR.STD": 2500000,
    "4D.STD": 100000,
    "1D.STD": 20000000,
    "NAGA": 100000,
    "MACAU": 100000,
    "PINGGIRAN.BESAR": 20000000,
    "PINGGIRAN.KECIL": 20000000,
    "PINGGIRAN.GENAP": 20000000,
    "PINGGIRAN.GANJIL": 20000000
}

export const stdBetType = ({ num1, num2, num3, num4 }) => {
    if (num1 === '' && num2 === '' && num3 !== '' && num4 !== '') {
        return "2DR.STD";
    } else if (num1 === '' && num2 !== '' && num3 !== '' && num4 !== '') {
        return "3DR.STD";
    } else if (num1 !== '' && num2 !== '' && num3 !== '' && num4 !== '') {
        return "4D.STD";
    } else {
        return "UNKNOWN";
    }
}


export const getDiscounts = (betType) => {
    if (!window.discounts) {
        if (getCookies(CookiesConstant.DISCOUNTS)) {
            window.discounts = JSON.parse(getCookies(CookiesConstant.DISCOUNTS));
            return window.discounts[betType];
        }
    }else{
        return window.discounts[betType];
    }
}

export const getMultipliers = (betType) => {
    if (!window.multipliers) {
        if (getCookies(CookiesConstant.MULTIPLIER)) {
            window.multipliers = JSON.parse(getCookies(CookiesConstant.MULTIPLIER));
            return window.multipliers[betType];
        }
    }else{
        return window.multipliers[betType];
    }
}

export const stdRules = () => {
    const BET_TYPES = [
        "2DR.STD",
        "3DR.STD",
        "4D.STD"
    ]

    const rules = {
        "discount" : [],
        "price" : [],
        "minBet" : [],
        "maxBet": [],
        "description": "message.std.description"
    }

    for(let i=0; i<BET_TYPES.length; i++){
        let key = BET_TYPE_NAMES[BET_TYPES[i]]['betTypeNameRule'];
        
        let discount = getDiscounts(BET_TYPES[i]) + '%';
        rules.discount.push({ [key] : discount});

        let price = getMultipliers(BET_TYPES[i]) + 'x';
        rules.price.push({ [key] : price});

        let minBet = "IDR " +  MIN_BETS[BET_TYPES[i]];
        rules.minBet.push({ [key] : minBet});

        let maxBet = "IDR " +  MAX_BETS[BET_TYPES[i]];
        rules.maxBet.push({ [key] : maxBet});
    }

    return rules;
}

export const bebasRules = () => {
    const BET_TYPES = [
        "1D.STD"
    ]

    const rules = {
        "discount" : [],
        "price" : [],
        "minBet" : [],
        "maxBet": [],
        "description": "message.bebas.description"
    }

    for(let i=0; i<BET_TYPES.length; i++){
        let key = BET_TYPE_NAMES[BET_TYPES[i]]['betTypeNameRule'];
        
        let discount = getDiscounts(BET_TYPES[i]) + '%';
        rules.discount.push({ [key] : discount});

        let price = getMultipliers(BET_TYPES[i]) + 'x';
        rules.price.push({ [key] : price});

        let minBet = "IDR " +  MIN_BETS[BET_TYPES[i]];
        rules.minBet.push({ [key] : minBet});

        let maxBet = "IDR " +  MAX_BETS[BET_TYPES[i]];
        rules.maxBet.push({ [key] : maxBet});
    }

    return rules;
}

export const macauRules = () => {
    const BET_TYPES = [
        "MACAU"
    ]

    const rules = {
        "discount" : [],
        "price" : [],
        "minBet" : [],
        "maxBet": [],
        "description": "message.macau.description"
    }

    for(let i=0; i<BET_TYPES.length; i++){
        let key = BET_TYPE_NAMES[BET_TYPES[i]]['betTypeNameRule'];
        
        let discount = getDiscounts(BET_TYPES[i]) + '%';
        rules.discount.push({ [key] : discount});

        let price = getMultipliers(BET_TYPES[i]) + 'x';
        rules.price.push({ [key] : price});

        let minBet = "IDR " +  MIN_BETS[BET_TYPES[i]];
        rules.minBet.push({ [key] : minBet});

        let maxBet = "IDR " +  MAX_BETS[BET_TYPES[i]];
        rules.maxBet.push({ [key] : maxBet});
    }

    return rules;
}

export const nagaRules = () => {
    const BET_TYPES = [
        "NAGA"
    ]

    const rules = {
        "discount" : [],
        "price" : [],
        "minBet" : [],
        "maxBet": [],
        "description": "message.naga.description"
    }

    for(let i=0; i<BET_TYPES.length; i++){
        let key = BET_TYPE_NAMES[BET_TYPES[i]]['betTypeNameRule'];
        
        let discount = getDiscounts(BET_TYPES[i]) + '%';
        rules.discount.push({ [key] : discount});

        let price = getMultipliers(BET_TYPES[i]) + 'x';
        rules.price.push({ [key] : price});

        let minBet = "IDR " +  MIN_BETS[BET_TYPES[i]];
        rules.minBet.push({ [key] : minBet});

        let maxBet = "IDR " +  MAX_BETS[BET_TYPES[i]];
        rules.maxBet.push({ [key] : maxBet});
    }

    return rules;
}
export const pinggiranRules = () => {
    const BET_TYPES = [
        "PINGGIRAN.BESAR",
        "PINGGIRAN.KECIL",
        "PINGGIRAN.GENAP",
        "PINGGIRAN.GANJIL"
    ]

    const rules = {
        "discount" : [],
        "price" : [],
        "minBet" : [],
        "maxBet": [],
        "description": "message.pinggiran.description"
    }

    for(let i=0; i<BET_TYPES.length; i++){
        let key = BET_TYPE_NAMES[BET_TYPES[i]]['betTypeNameRule'];
        
        let discount = getDiscounts(BET_TYPES[i]) + '%';
        rules.discount.push({ [key] : discount});

        let price = getMultipliers(BET_TYPES[i]) + 'x';
        rules.price.push({ [key] : price});

        let minBet = "IDR " +  MIN_BETS[BET_TYPES[i]];
        rules.minBet.push({ [key] : minBet});

        let maxBet = "IDR " +  MAX_BETS[BET_TYPES[i]];
        rules.maxBet.push({ [key] : maxBet});
    }

    return rules;
}