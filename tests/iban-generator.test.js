import { getRandomIban } from "../src/generators/iban-generator";

function modulo(divident, divisor) {
   const partLength = 10;

   while (divident.length > partLength) {
      const part = divident.substring(0, partLength);
      divident = (part % divisor) + divident.substring(partLength);
   }

   return divident % divisor;
}

function validate(iban) {
   // move the first four characters to the back
   // and make sure everything is uppercase
   iban = (iban.substr(4) + iban.substr(0, 4)).toUpperCase();
   let valueWithConvertedNumbers = '';
   for (let i = 0; i < iban.length; i++) {
      const character = iban.charCodeAt(i);

      // If the character is A-Z, we need to
      // convert it to a number from 10 - 35
      if (character > 64 && character < 91) {
         valueWithConvertedNumbers += String(character - 55);
      } else {
         valueWithConvertedNumbers += String.fromCharCode(character);
      }
   }

   const checkSum = modulo(valueWithConvertedNumbers, 97);
   return checkSum === 1;
}

test('Generate IBAN test', () => {
   // Given

   // When
   const iban = getRandomIban().replace(/ /g, '');

   // Then
   expect(validate(iban)).toBeTruthy();
});