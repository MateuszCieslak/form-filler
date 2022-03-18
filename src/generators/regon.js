import { getRandomInt, prependZeros } from './common.js';

const generateProvinceCode = () => prependZeros(getRandomInt(1, 97), 2);
const generateRandomPart = () => prependZeros(getRandomInt(0, 999999), 6);
const calculateControlSum = (number) => {
    const weights = [8, 9, 2, 3, 4, 5, 6, 7];
    const sum = weights.reduce((acc, val, i) => acc + val * number[i], 0);
    const modulo = sum % 11;
    return modulo === 10 ? "0" : modulo.toString();
}

export function generateRegon() {
    const provinceCode = generateProvinceCode();
    const randomPart = generateRandomPart();
    const controlSum = calculateControlSum(provinceCode + randomPart);
    return provinceCode + randomPart + controlSum;
}