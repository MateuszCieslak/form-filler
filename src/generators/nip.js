import { getRandomInt, prependZeros } from './common.js';

const officeCodes = [
  "107", "108", "109", "111", "112", "113", "114", "115", "116", "117", "118", "119", "121", "122", "123", "124", "125",
  "154", "156", "157", "158", "337", "338", "339", "341", "342", "355", "356", "375", "376", "377", "378", "379", "381",
  "389", "392", "393", "394", "416", "417", "496", "497", "509", "511", "512", "519", "521", "522", "523", "524", "525",
  "526", "527", "528", "529", "531", "532", "533", "534", "535", "536", "566", "567", "568", "569", "572", "601", "701",
  "757", "758", "759", "761", "762", "774", "776", "796", "797", "798", "799", "811", "812", "821", "822", "823", "826",
  "837", "838", "931", "932", "948", "951", "952", "965", "971", "978"
];

export function generateNip() {
  while(true) {
    const officeCode = officeCodes[getRandomInt(0, officeCodes.length - 1)];
    const randomPart = prependZeros(getRandomInt(0, 999999), 6);
    const base = officeCode + randomPart;
    const controlSum = calculateControlSum(base);
    if(controlSum < 9) {
      return base + controlSum;
    }
  }
}

function calculateControlSum(base) {
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const sum = weights.reduce((acc, val, i) => acc + val * base[i], 0);
  return sum % 11;
}