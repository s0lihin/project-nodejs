import { stdBetType } from "./BetTypeService";
import { getUserId, getUsername } from "./SecurityService";

export const generatePermutation = (perm, pre, post, n) => {
    var elem, i, rest, len;
    if (n > 0)
        for (i = 0, len = post.length; i < len; ++i) {
            rest = post.slice(0);
            elem = rest.splice(i, 1);
            generatePermutation(perm, pre.concat(elem), rest, n - 1);
        }
    else
        perm.push(pre);
};

export const generatePermutationArr = (data, n) => {
    var perm = [];
    generatePermutation(perm, [], data, n);
    return perm;
};


export const generatePermutationNumbers = (data) => {
    let num12345 = '' + data.num1 + data.num2 + data.num3 + data.num4 + data.num5;
    let objects = num12345.split('');
    let result = [];
    let requests = [];

    for (let i = objects.length; i >= 2; i--) {
        var perm = [];
        generatePermutation(perm, [], objects, i);
        
        for(let j=0; j<perm.length; j++){
            let num = perm[j].join('');
            if(!result.includes(num)){
                result.push(num);
            }
        }
    }
    
    for(let i=0; i<result.length; i++){
        requests.push(generateRequest(data, result[i].split('')));
    }
    
    return requests.filter(request => request['betAmountOri'] !== '');
};

export const generateRequest = (data, nums) => {
    let request = {
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
        "checked": true
    }

    if (nums.length === 4) {
        request.num1 = nums[0];
        request.num2 = nums[1];
        request.num3 = nums[2];
        request.num4 = nums[3];

        if (data.betAll) {
            request.betAmountOri = data.betAll;
        } else if(data.bet4D) {
            request.betAmountOri = data.bet4D;
        }

    } else if (nums.length === 3) {
        request.num2 = nums[0];
        request.num3 = nums[1];
        request.num4 = nums[2];

        if (data.betAll) {
            request.betAmountOri = data.betAll;
        } else if(data.bet3D) {
            request.betAmountOri = data.bet3D;
        }

    } else if (nums.length === 2) {
        request.num3 = nums[0];
        request.num4 = nums[1];

        if (data.betAll) {
            request.betAmountOri = data.betAll;
        } else if(data.bet2D) {
            request.betAmountOri = data.bet2D;
        }

    }

    const { betType, betTypeName, discount } = stdBetType(request);

    request['betType'] = betType;
    request['betTypeName'] = betTypeName;
    request['discount'] = discount;
    request['betAmount'] = request['betAmountOri'] - ((discount / 100) * request['betAmountOri']);

    return request;
}
