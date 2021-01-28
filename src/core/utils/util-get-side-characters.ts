/**
 * Utility to test and get special characters on the sides of the inputted string. If they are the same, the side character(s) are returned, else null is returned.
 * @param val String input to test
 * @param regex Regex to test against
 */
export const utilGetSideChars = (val: string, regex: RegExp): string | null => {
    const result = (val.split(regex).filter(x => x !== ""));
    const invCheck = (data1: string, data2: string) => {
        let invData2 = data2.split("").reverse().join("");
        return data1 === invData2;
    }
    let matchValidation = false;
    if (result[0] === result[result.length - 1].replace("/", "") || invCheck(result[0], result[result.length - 1])) {
        matchValidation = true;
    }

    if (result.length > 1 && matchValidation) {
        return result[0]
    }
    return null;
}