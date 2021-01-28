import { utilEscapeRegExp } from "./util-escape-regexp";

/**
 * Returns string with wrapped or unwrapped characters based on
 * enclosure value.
 * @param content content to wrap or unwrap
 * @param wrapChar character(s) to check for
 * @param enclose set true to wrap, set false to unwrap
 */
export const utilWrapper = (content: string, enclose: boolean, wrapCharStart: string, wrapCharEnd: string = "") => {
    let _content = content;
    let endChar = wrapCharEnd;
    if (!(!!wrapCharEnd && wrapCharEnd.trim() !== "")) {
        endChar = wrapCharStart
    }
    if (!!content) {
        if (enclose) {
            _content = `${wrapCharStart}${content.replace("\n\n", "\n")}${endChar}`
        }
        if (!enclose) {
            // console.log(`(${utilEscapeRegExp(wrapCharStart)})(.*?)(${utilEscapeRegExp(endChar)}$)`);

            let regexSplitter = new RegExp(`(${utilEscapeRegExp(wrapCharStart)})(.*?)(${utilEscapeRegExp(endChar)}$)`, "i")
            _content = content.split(regexSplitter).filter(x => x !== '' && x !== wrapCharStart)[0]
        }
    }
    return _content;
}