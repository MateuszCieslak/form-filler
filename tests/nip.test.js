import { generateNip } from "../src/generators/nip";

test('Generated NIP number', () => {
    // Given
    const validate = (nip) => {
        const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        const controlNumber = parseInt(nip.substring(9, 10));
        const sum = weights.reduce((acc, w, i) => acc + w * nip.substring(i, i + 1), 0);

        return sum % 11 === controlNumber;
    }

    // When
    const nip = generateNip();

    // Then
    expect(validate(nip)).toBeTruthy();
});