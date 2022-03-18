import { generateIdDocument } from '../src/generators/id-number-generator';

function validateIdDocument(idDocument) {
    const lettersWithValues = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach((letter, i) => {
        lettersWithValues[letter] = i + 10;
    });

    const sum = 7 * lettersWithValues[idDocument[0]]
        + 3 * lettersWithValues[idDocument[1]]
        + 1 * lettersWithValues[idDocument[2]]
        + 7 * idDocument[4]
        + 3 * idDocument[5]
        + 1 * idDocument[6]
        + 7 * idDocument[7]
        + 3 * idDocument[8];

    return sum % 10 == idDocument[3];
}

test('ID number pattern check', () => {
    // Given
    const regex = /^[A-Z]{3}[0-9]{6}$/gm;

    // When
    const idDocument = generateIdDocument();

    // Then
    expect(idDocument).not.toBeNull();
    expect(regex.test(idDocument)).toBeTruthy();
    expect(validateIdDocument(idDocument)).toBeTruthy();
});