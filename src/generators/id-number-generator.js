import { getRandomInt, prependZeros } from "./common.js";

const lettersWithValues = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach((letter, i) => {
    lettersWithValues[letter] = i + 10;
});

export function generateIdDocument() {
    const series = generateSeries(lettersWithValues);
    const number = prependZeros(getRandomInt(0, 99999), 5);
    const controlSum = calculateControlSum(series, number, lettersWithValues);
    return series + controlSum + number;
}

function generateSeries(lettersWithValues) {
    const letters = Object.keys(lettersWithValues);
    const rands = [1,2,3].map(() => getRandomInt(0, letters.length - 1));
    return rands.reduce((prev, current) => prev += letters[current], '');
}

function calculateControlSum(series, number, lettersWithValues) {
    const sum = 7 * lettersWithValues[series[0]]
        + 3 * lettersWithValues[series[1]]
        + 1 * lettersWithValues[series[2]]
        + 7 * number[0]
        + 3 * number[1]
        + 1 * number[2]
        + 7 * number[3]
        + 3 * number[4];

    return sum % 10;
}

