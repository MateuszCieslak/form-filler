export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addLeadingZeros(number, length) {
    number = "" + number;
    var zerosNumber = length - number.length;

    for (let i = 0; i < zerosNumber; i++) {
        number = "0" + number;
    }
    return number;
}