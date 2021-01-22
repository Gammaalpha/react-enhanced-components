/**
 * Returns an escaped string based on the inputted value.
 * @param inputString input string to escape
 */
export const utilEscapeRegExp = (inputString: string) => {
    return inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}