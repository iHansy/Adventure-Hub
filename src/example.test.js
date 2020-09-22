//ADDINATOR 

//starting inputs?
//2 inputs

// x, y
// TDD - test driven development, writing test before writing function

// function addinator (x, y) {
//     //always 2 numbers? No, could omit y
//     //negative numbers? Yes.
//     //Ints? or Decimals? Decimals.

//     //NON numbers? Yes, NAN


//

import addinator from './addinator';
//describe a series of tests
describe('CHECKING ADDINATOR', () => {

    //individual test
    test('Sum of 1 and 2 is 3', () => {
        expect(addinator(1, 2)).toBe(3);
    })

    test('one number returns self', () => {
        expect(addinator(1)).toBe(1);
    })

    test('negative numbers behave correctly', () => {
        expect(addinator(-1, 2)).toBe(1);
    })

    test('decimals behave correctly', () => {
        expect(addinator(1.5, 2)).toBe(3.5);
    })

    test('incorrect input', () => {
        expect(addinator('1', 2)).toBe(3);
    })

});
