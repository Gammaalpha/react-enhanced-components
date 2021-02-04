export interface IRichText {
    id?: string;
    toolbarStyle?: string;
    buttons?: string[];
    value?: string;
    editing: boolean;
    callback?: any;
}
export interface IQuillEditor {
    editorId: string;
    toolbarId: string;
    toolbarStyle?: string;
    editing: boolean;
    buttons?: string[];
    value?: string;
    callback?: any;
    contentCallback?: any;
}
export interface IToolbarButton {
    key: string;
    icon: string;
    tooltip: string;
    value?: any;
    ariaLabel?: string | undefined;
    callback?: any;
    position?: any | undefined;
    buttonStyle?: string;
    buttonText?: string;
    disabled?: boolean;
    className?: string;
    childButtons?: IToolbarButton[];
    isDefault?: boolean;
}
export declare type TextAlignment = "left" | "right" | "center" | "justify";
export declare enum TextAlignmentType {
    left = "left",
    right = "right",
    center = "center",
    justify = "justify"
}
export interface IRange {
    index: number;
    length: number;
}
export interface IAbbr {
    title: string;
    text: string;
    range: IRange;
}
export declare const LIST_TYPES: string[];
export declare type ListFormat = 'ordered' | 'bullet';
export declare enum ListFormatType {
    bulletedList = "bullet",
    orderedList = "ordered"
}
export declare type BlockFormat = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "blockquote" | "paragraph" | "pullQuote";
export declare enum BlockFormatType {
    paragraph = "paragraph",
    headingOne = "H1",
    headingTwo = "H2",
    headingThree = "H3",
    headingFour = "H4",
    blockquote = "blockquote",
    pullQuote = "pullQuote"
}
export declare type IndentDir = -1 | 1;
export declare enum IndentDirType {
    left = -1,
    right = 1
}
export declare type TextStyle = "italic" | "bold" | "strike" | "underline" | "sub" | "super";
export declare enum TextStyleType {
    bold = "bold",
    italic = "italic",
    strike = "strike",
    underline = "underline",
    sub = "sub",
    super = "super"
}
export interface ILink {
    text: string;
    href?: string;
    target?: string;
    title?: string;
    range: IRange;
}
export interface IImageLink {
    range: IRange;
    title: string;
    src: string;
    width: number;
    height: number;
    alt: string;
    float: string;
}
