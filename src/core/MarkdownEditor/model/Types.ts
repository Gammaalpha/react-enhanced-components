

export type TextStyle = "italic" | "bold" | "strike" | "underline" | "sub" | "super"
export enum TextStyleType {
    bold = 'bold',
    italic = 'italic',
    strike = 'strike',
    underline = 'underline',
    sub = 'sub',
    super = 'super',
}

export type Insert = "oList" | "uoList" | "img" | "table" | "link" | "abbr" | "heading_1" | "heading_2" | "heading_3" | "heading_4" | "heading_5" | "heading_6";

export enum InsertType {
    orderedList = "oList",
    unorderedList = "uoList",
    image = "img",
    table = "table",
    link = "link",
    abbreviation = "abbr",

}

export enum HeadingType {
    h1 = 'heading_1',
    h2 = 'heading_2',
    h3 = 'heading_3',
    h4 = 'heading_4',
    h5 = 'heading_5',
    h6 = 'heading_6',

}

