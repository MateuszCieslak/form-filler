/**
 * Generates random int value between min and max param
 * @param min
 * @param max
 * @returns {*}
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Functions adds 0 characters before value a certain number of times
 * @param value
 * @param numberOfPrepends
 * @returns {string}
 */
export function prependZeros(value, numberOfPrepends) {
    const amount = numberOfPrepends - value.toString().length;
    return [...Array(amount)].reduce((acc, val) => '0' + acc, value);
}