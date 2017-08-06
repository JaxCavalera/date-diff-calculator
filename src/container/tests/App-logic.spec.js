// Constants
import * as constants from '../App-constants';

// Units to test
import { getDateIfValid, convertToDays, calcDateDiff } from '../App-logic';

// Test return values for getDateIfValid for happy and sad
describe('Given getDateIfValid(date) is called', () => {
    describe('When a valid date between 1900 and 2010 is provided', () => {
        test('Then it will return the date as an array of numbers [dd, mm, yyyy]', () => {
            const validDate = '01 01 1900';
            const result = getDateIfValid(validDate);

            expect(result).toEqual([1, 1, 1900]);
        });
    });

    describe('When a valid date between 1900 and 2010 is provided', () => {
        test('Then it will return the date as an array of numbers [dd, mm, yyyy]', () => {
            const validDate = '29 02 2008';
            const result = getDateIfValid(validDate);

            expect(result).toEqual([29, 2, 2008]);
        });
    });

    describe('When a date with an invalid number of days provided', () => {
        test('Then it will return an empty array', () => {
            const invalidDateDays = '29 02 1900';
            const result = getDateIfValid(invalidDateDays);

            expect(result).toEqual([]);
        });
    });

    describe('When a date with an invalid month is provided', () => {
        test('Then it will return an empty array', () => {
            const invalidDateDays = '12 00 2010';
            const result = getDateIfValid(invalidDateDays);

            expect(result).toEqual([]);
        });
    });

    describe('When a date with an invalid year is provided', () => {
        test('Then it will return an empty array', () => {
            const invalidDateDays = '30 09 2017';
            const result = getDateIfValid(invalidDateDays);

            expect(result).toEqual([]);
        });
    });

    describe('When a date is an empty string', () => {
        test('Then it will return an empty array', () => {
            const invalidDateDays = '';
            const result = getDateIfValid(invalidDateDays);

            expect(result).toEqual([]);
        });
    });
});

// Test return values for convertToDays for happy and sad
describe('Given convertToDays(date) is called', () => {
    describe('When the dateArray provided is 2 years ahead of 01/01/1900', () => {
        test('Then it will return 730 days', () => {
            const result = convertToDays([1, 1, 1902]);

            expect(result).toEqual(730);
        });
    });

    describe('When the dateArray provided is 10 years ahead of 01/01/1900', () => {
        test('Then it will return 3652 days', () => {
            const result = convertToDays([1, 1, 1910]);

            expect(result).toEqual(3652);
        });
    });

    describe('When the dateArray provided is [1, 2, 1900]', () => {
        test('Then it will return 31 days', () => {
            const result = convertToDays([1, 2, 1900]);

            expect(result).toEqual(31);
        });
    });

    describe('When the dateArray provided is [1, 1, 1900]', () => {
        test('Then it will return 0 days', () => {
            const result = convertToDays([1, 1, 1900]);

            expect(result).toEqual(0);
        });
    });

    describe('When the dateArray provided is [1, 2, 2008]', () => {
        test('Then it will return 39477 days', () => {
            const result = convertToDays([1, 2, 2008]);

            expect(result).toEqual(39477);
        });
    });

    describe('When the dateArray provided is [31, 1, 2004]', () => {
        test('Then it will return 38015 days', () => {
            const result = convertToDays([31, 1, 2004]);

            expect(result).toEqual(38015);
        });
    });
});


// Test the final store value as an integration test to confirm that all functions work as expected in several scenarios
describe('Given calcDateDiff(store) is called', () => {
    describe('When store.dateValue does not follow the expected format', () => {
        test('Then it will update store.dateDiffValue to list the invalid portion of the dateValue', () => {
            const store = {
                dateValue: 'something invalid',
                dateDiffValue: constants.placeholderDateDiff,
            };

            const finalStore = {
                dateValue: store.dateValue,
                dateDiffValue: `The date: ${store.dateValue} is invalid, please enter a valid date and click the Calculate button.`
            }

            calcDateDiff(store);

            expect(store).toEqual(finalStore);
        });
    });

    describe('When the first date in store.dateValue is invalid', () => {
        test('Then it will update store.dateDiffValue to list the invalid portion of the dateValue', () => {
            const store = {
                dateValue: '01 15 1980, 01 02 2008',
                dateDiffValue: constants.placeholderDateDiff,
            };

            const finalStore = {
                dateValue: store.dateValue,
                dateDiffValue: `The date: 01 15 1980 is invalid, please enter a valid date and click the Calculate button.`
            }

            calcDateDiff(store);

            expect(store).toEqual(finalStore);
        });
    });

    describe('When the second date in store.dateValue is invalid', () => {
        test('Then it will update store.dateDiffValue to list the invalid portion of the dateValue', () => {
            const store = {
                dateValue: '01 01 1900, 29 02 2006',
                dateDiffValue: constants.placeholderDateDiff,
            };

            const finalStore = {
                dateValue: store.dateValue,
                dateDiffValue: `The date: 29 02 2006 is invalid, please enter a valid date and click the Calculate button.`
            }

            calcDateDiff(store);

            expect(store).toEqual(finalStore);
        });
    });

    describe('When the both dates are valid and in the correct order', () => {
        test('Then it will update store.dateDiffValue to list dates smallest to biggest and the difference between dates in days', () => {
            const store = {
                dateValue: '01 01 1900, 01 01 2010',
                dateDiffValue: constants.placeholderDateDiff,
            };

            const finalStore = {
                dateValue: store.dateValue,
                dateDiffValue: '01 01 1900, 01 01 2010, 40177'
            }

            calcDateDiff(store);

            expect(store).toEqual(finalStore);
        });
    });

    describe('When the both dates are valid', () => {
        test('Then it will update store.dateDiffValue to list dates smallest to biggest and the difference between dates in days', () => {
            const store = {
                dateValue: '01 01 2010, 01 01 1900',
                dateDiffValue: constants.placeholderDateDiff,
            };

            const finalStore = {
                dateValue: store.dateValue,
                dateDiffValue: '01 01 1900, 01 01 2010, 40177'
            }

            calcDateDiff(store);

            expect(store).toEqual(finalStore);
        });
    });
});
