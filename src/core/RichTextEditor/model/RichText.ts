export interface IRichText {
    id?: string,
    toolbarStyle?: string,
    buttons?: string[],
    value?: string,
    editing: boolean,
}

export interface IQuillEditor {
    editorId: string,
    toolbarId: string,
    toolbarStyle?: string,
    editing: boolean,
    buttons?: string[],
    value?: string,
    callback?: any
}

export interface IToolbarButton {
    key: string,
    icon: string,
    tooltip: string,
    value?: any,
    ariaLabel?: string | undefined,
    callback?: any
    position?: any | undefined,
    buttonStyle?: string,
    buttonText?: string,
    disabled?: boolean,
    className?: string,
    childButtons?: IToolbarButton[],
    isDefault?: boolean
}



export type TextAlignment = "left" | "right" | "center" | "justify";
export enum TextAlignmentType {
    left = 'left',
    right = 'right',
    center = 'center',
    justify = 'justify',

}
export interface IRange {
    index: number;
    length: number;
}
export interface IAbbr {
    title: string,
    text: string,
    range: IRange
}

export const LIST_TYPES = ['ordered-list', 'bulleted-list']
export type ListFormat = 'ordered' | 'bullet';
export enum ListFormatType {
    bulletedList = 'bullet',
    orderedList = 'ordered'
}

export type BlockFormat = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "blockquote" | "paragraph" | "pullQuote";

export enum BlockFormatType {
    paragraph = 'paragraph',
    headingOne = 'H1',
    headingTwo = 'H2',
    headingThree = 'H3',
    headingFour = 'H4',
    blockquote = 'blockquote',
    pullQuote = 'pullQuote'
};

export type IndentDir = -1 | 1;
export enum IndentDirType {
    left = -1,
    right = 1
}

export type TextStyle = "italic" | "bold" | "strike" | "underline" | "sub" | "super"
export enum TextStyleType {
    bold = 'bold',
    italic = 'italic',
    strike = 'strike',
    underline = 'underline',
    sub = 'sub',
    super = 'super'
}


export interface ILink {
    text: string;
    url?: string;
    target?: string;
    range: IRange
}

export interface IImageLink extends ILink {
    width: number;
    height: number;
    alt: string;
    float: string;
}