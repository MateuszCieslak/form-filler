import { prependZeros } from "../src/generators/common";

test('Add 0 characters to string', () => {
    const value = prependZeros(1, 5);
    expect(value).toBe('00001');
});