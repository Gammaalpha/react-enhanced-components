/**
 * Returns string with wrapped or unwrapped characters based on
 * enclosure value.
 * @param content content to wrap or unwrap
 * @param wrapChar character(s) to check for
 * @param enclose set true to wrap, set false to unwrap
 */
export declare const utilWrapper: (content: string, enclose: boolean, wrapCharStart: string, wrapCharEnd?: string) => string;
