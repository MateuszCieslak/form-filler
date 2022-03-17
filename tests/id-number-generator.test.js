import { generateIdNumber } from '../src/generators/id-number-generator';

test('ID number pattern check', () => {
    const regex = /^[A-Z]{3}[0-9]{6}$/gm;
    expect(generateIdNumber()).not.toBeNull();
    expect(regex.test(generateIdNumber())).toBeTruthy();
});