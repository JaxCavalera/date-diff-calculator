// NPM Modules
import { action } from 'mobx';

// Constants
import * as constants from './App-constants';

/**
 * Updates the store.dateValue with the new text input by the user
 * @param {object} store - MobX store
 * @param {string} newDateValue - Date value text input by the user
 */
export const updateDateValue = action((store, newDateValue) => {
    store.dateValue = newDateValue;
});

/**
 * Takes a date string and converts it into an array if valid
 * @param {string} date - The date to be processed and evaluated
 * @return {array} - Returns an array in the format [dd, mm, yyyy] if valid or [] if not
 */
export const getDateIfValid = (date) => {
    let days = parseInt(date.split('').slice(0, 2).join(''), 10);
    let month = parseInt(date.split('').slice(3, 5).join(''), 10);
    let year = parseInt(date.split('').slice(6, 10).join(''), 10);

    let isValidYear = (year >= 1900) && (year <= 2010);
    let isValidMonth = isValidYear && (month >= 1) && (month <= 12);


    let daysInMonth;

    if (isValidMonth && (year !== 1900) && (year % 4 === 0) && typeof constants.leapYearDaysPerMonth[month - 1] !== 'undefined') {

        // Is a leap year
        daysInMonth = constants.leapYearDaysPerMonth[month - 1];
    } else if (isValidMonth && typeof constants.daysPerMonth[month - 1] !== 'undefined') {

        // Is not a leap year
        daysInMonth = constants.daysPerMonth[month - 1];
    } else {

        // Month is undefined so set it to 0
        daysInMonth = 0;
    }

    let isValidDays = (days !== 0 && daysInMonth >= days);

    if (isValidDays) {
        return [days, month, year];
    }

    return [];
};

/**
 * Takes a date array and converts it into the number of days since 01/01/1900
 * @param {array} date - The date array to be converted
 * @return {number} - Returns the total number of days since 01/01/1900
 */
export const convertToDays = (date) => {
    // convert year into days
    let yearDays = 0;

    for (let i = 1900; i < date[2]; i += 1) {
        yearDays += (i !== 1900 && i % 4 === 0) ? 366 : 365;
    }

    // add up days from previous months
    let monthDays = 0;
    let dateIsLeapYear = (date[2] !== 1900) && (date[2] % 4 === 0);

    /* eslint-disable no-mixed-operators */

    for (let i = 1; i < date[1]; i += 1) {
        monthDays += (
            dateIsLeapYear &&
            constants.leapYearDaysPerMonth[i] ||
            constants.daysPerMonth[i]
        );
    }

    // Calculate the days
    let daysIncludingJanToFeb = (
        (
            date[1] > 1 && dateIsLeapYear && 1 ||
            date[1] > 1 && 2
        ) || (
            -1
        )
    );

    /* eslint-enable no-mixed-operators */

    let days = (date[0] + daysIncludingJanToFeb);

    // combine the days with monthDays and yearDays
    return yearDays + monthDays + days;
};

/**
 * Calls functions to calculate the difference between 2 dates as days.
 * Calls a function to update the store.dateDiffValue.
 * @param {object} store - MobX store
 */
export const calcDateDiff = (store) => {
    let isValidDateFormat = /^(\d\d\s){2}\d{4},\s(\d\d\s){2}\d{4}$/.test(store.dateValue);
    let dateArray = (isValidDateFormat) ? store.dateValue.split(', ') : [];

    let dateOne = (dateArray.length > 0) ? getDateIfValid(dateArray[0]) : '';
    let dateTwo = (dateArray.length > 0) ? getDateIfValid(dateArray[1]) : [];

    // Default invalidDate to false assuming dates are valid
    let invalidDate = false;

    // If both dates are invalid show the full invalid store.dateValue otherwise show the invalid date if there is one
    if (typeof dateOne === 'string') {
        invalidDate = store.dateValue;

    } else if (dateOne.length === 0) {
        invalidDate = dateArray[0];

    } else if (dateTwo.length === 0) {
        invalidDate = dateArray[1];
    }

    // Only calculate for valid dateValue pairs
    if (typeof invalidDate !== 'string') {
        let dateOneDays = convertToDays(dateOne);
        let dateTwoDays = convertToDays(dateTwo);

        let dateList = (dateOneDays > dateTwoDays) ? `${dateArray[1]}, ${dateArray[0]},` : `${dateArray[0]}, ${dateArray[1]},`;

        store.dateDiffValue = `${dateList} ${Math.abs(dateOneDays - dateTwoDays)}`;
    } else {
        store.dateDiffValue = `The date: ${invalidDate} is invalid, please enter a valid date and click the Calculate button.`;
    }
};
