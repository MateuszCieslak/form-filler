import { getRandomInt, addLeadingZeros, prependZeros } from "./common.js";

const lettersWithValues = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach((l, i) => {
    lettersWithValues[l] = i;
});

export function generateIdNumber() {
    const series = generateSeries(lettersWithValues);
    const number = generateNumber();
    const controlSum = getControlSum(series, number, lettersWithValues);
    return series + controlSum + number;
}

function generateSeries(lettersWithValues) {
    const letters = Object.keys(lettersWithValues);
    const rands = [1,2,3].map(() => getRandomInt(0, letters.length - 1));
    return rands.reduce((prev, current) => prev += letters[current], '');
}

function generateNumber() {
    return prependZeros(getRandomInt(0, 99999), 5);
}

function getControlSum(series, number, lettersWithValues) {
    var controlSum =  7 * lettersWithValues[series[0]] + 3 * lettersWithValues[series[1]] + 1 * lettersWithValues[series[2]] +
        7 * number[0] + 3 * number[1] + 1 * number[2] + 7 * number[3] + 3 * number[4];
    var controlSumLastDigit = controlSum % 10;
    return controlSumLastDigit;
}

