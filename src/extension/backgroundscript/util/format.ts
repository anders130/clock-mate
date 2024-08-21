import { givenStrings } from './constants';

export default class Formater {
    /**
     * Retreives the JSON object holding the working times from the API data. Unecessary extra inforamtion
     * is removed and the JSON extracted.
     * @param data    the unformatted API data holding the working times
     * @returns the retreived JSON object
     * @throws if the data can't be parsed for any reason
     */
    public static getJSONFromAPIData(data: string): object {
        const startIndex = data.indexOf(givenStrings.jsonStartString);
        if (startIndex === -1) {
            throw new Error('Unable to find start of working times JSON');
        }

        const endIndex = data.indexOf(givenStrings.jsonEndString);
        if (endIndex === -1) {
            throw new Error('Unable to find end of working times JSON');
        }

        // + length to include the closing brackets
        const jsonString = data.slice(startIndex, endIndex + givenStrings.jsonEndString.length);

        return JSON.parse(jsonString);
    }

    public static getDateFromYYYYMMDD(date: string): Date {
        return new Date(`${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`);
    }

    /**
     * Gets a Datetime object from the provided date and time.
     * @param date    the date or more precise the day to use
     * @param time    the time in the format HHMMSS
     */
    public static getDateFromDateAndTime(date: Date, time: string): Date {
        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            Number(time.substring(0, 2)),
            Number(time.substring(2, 4)),
            Number(time.substring(4)),
        );
    }

    /**
     * Checks whether or not the provided Date objects reference the same day while
     * ignoring the time.
     * @returns true if both Date objects reference the same day
     */
    public static isSameDay(date1: Date, date2: Date) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    public static getMinutesBetween(date1: Date, date2: Date) {
        const diffInMs = Math.abs(date1.getTime() - date2.getTime());
        // convert milliseconds to seconds
        return diffInMs / (1000 * 60);
    }
}
