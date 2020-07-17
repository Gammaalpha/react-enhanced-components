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
    childButtons?: IToolbarButton[]
}

export type TextAlignment = "left" | "right" | "center" | "justify";
export enum TextAlignmentType {
    left = 'left',
    right = 'right',
    center = 'center',
    justify = 'justify',

}

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
export type ListFormat = 'numbered' | 'bullet';
export enum ListFormatType {
    bulletedList = 'bullet',
    numberedList = 'numbered'
}
export type BlockFormat = "paragraph" | "heading_1" | "heading_2" | "heading_3" | "pullQuote" | "monospaced";

export enum BlockFormatType {
    paragraph = 'paragraph',
    headingOne = 'heading_1',
    headingTwo = 'heading_2',
    headingThree = 'heading_3',
    pullQuote = 'pullQuote',
    monospaced = 'monospaced'
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