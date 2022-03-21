import { prependZeros } from "../src/generators/common";

test('Add 0 characters to string 4 times', () => {
    const value = prependZeros(1, 5);
    expect(value).toBe('00001');
    expect(typeof value).toBe('string');
});

test('Add 0 characters to string 0 times', () => {
    const value = prependZeros(1, 1);
    expect(value).toBe('1');
    expect(typeof value).toBe('string');
});

test('Passed value is longer than expected length', () => {
    const value = prependZeros(123, 1);
    expect(value).toBe('123');
})