/**
 * Returns true if the string has a space on the right side, otherwise returns false.
 * @param val String value to check
 */
export const utilRightPadding = (val: string): boolean => {
    let valLen = val.length;
    return val[valLen - 1] === " " ? true : false
};
