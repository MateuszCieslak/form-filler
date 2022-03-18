import { getRandomInt, prependZeros } from './common.js';

/**
 * Generates random PESEL number
 * @returns {string}
 */
export function generatePesel() {
    const date = new Date(getRandomInt(1950, 2020), getRandomInt(0, 11), getRandomInt(1, 28));
    const sex = getRandomInt(0, 1) % 2 == 0 ? "male" : "female";
    const birthDatePart = generateBrithDatePart(date);
    const seriesPart = prependZeros(getRandomInt(0, 999), 3) + getSexNumber(sex);
    const controlSum = calculateControlSum(birthDatePart + seriesPart);
    return birthDatePart + seriesPart + controlSum;
}

function generateBrithDatePart(date) {
    let month = date.getMonth() + 1;
    if(date.getFullYear() >= 2000) {
        month += 20;
    }
    return date.getFullYear().toString().substring(2, 4)
        + prependZeros(month, 2)
        + prependZeros(date.getDate(), 2);
}

/**
 *
 * @param sex male|female
 * @returns {number}
 */
function getSexNumber(sex) {
    const result = getRandomInt(0, 4) * 2;
    if (sex == "male") {
        return result + 1;
    }

    return result;
}

/**
 *
 * @param base pesel number part without control sum
 * @returns {string}
 */
function calculateControlSum(base) {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const sum = base.split('').reduce((acc, val, i) => acc + val * weights[i], 0);
    const lastDigit = sum % 10;
    const controlSum = 10 - lastDigit;
    return controlSum === 10 ? "0" : controlSum.toString();
}