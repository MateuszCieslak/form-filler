import { getRandomInt, addLeadingZeros, prependZeros } from "./common.js";

const lettersWithValues = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach((l, i) => {
    lettersWithValues[l] = i;
});

export function generateIdNumber() {
    var lettersPart = generateSeries(lettersWithValues);
    var digitsPart = getDigitsPart();
    var controlSum = getControlSum(lettersPart, digitsPart);
    return lettersPart + controlSum + digitsPart;
}

function generateSeries(lettersWithValues) {
    const letters = Object.keys(lettersWithValues);
    const rands = [1,2,3].map(() => getRandomInt(0, letters.length - 1));
    return rands.reduce((prev, current) => prev += letters[current], '');
}

function getDigitsPart() {
    var randomInt = getRandomInt(0, 99999);
    return "" + prependZeros(randomInt, 5);
}

function getControlSum(lettersPart, digitsPart) {
    var controlSum =  7 * lettersWithValues[lettersPart[0]] + 3 * lettersWithValues[lettersPart[1]] + 1 * lettersWithValues[lettersPart[2]] +
        7 * digitsPart[0] + 3 * digitsPart[1] + 1 * digitsPart[2] + 7 * digitsPart[3] + 3 * digitsPart[4];
    var controlSumLastDigit = controlSum % 10;
    return controlSumLastDigit;
}

