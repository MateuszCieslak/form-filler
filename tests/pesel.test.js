import { generatePesel} from "../src/generators/pesel";

test('Generating pesel number', () => {
    // Given
    const validate = (pesel) => {
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;
        pesel.substring(0, 10).split('').forEach((v,i) => {
            sum += v * weights[i];
        });
        const last = sum.toString()[sum.toString().length - 1];
        let control = 10 - last;
        if(last == 0) {
            control = 0;
        }
        return pesel[pesel.toString().length - 1] === control.toString();
    }

    // When
    const pesel = generatePesel();
    
    // Then
    expect(pesel).not.toBeNull();
    expect(validate(pesel)).toBeTruthy();
});