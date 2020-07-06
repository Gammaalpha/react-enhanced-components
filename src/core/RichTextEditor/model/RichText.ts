export interface IRichText {
    id?: string,
    toolbarStyle?: string,
    buttons?: string[],
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
export type ListFormat = 'numbered-list' | 'bulleted-list' | 'list-item';
export enum ListFormatType {
    bulletedList = 'bulleted-list',
    numberedList = 'numbered-list',
    listItem = 'list-item'
}
export type BlockFormat = "paragraph" | "heading_1" | "heading_2" | "heading_3" | "pullQuote" | "monospaced" | 'numbered-list' | 'bulleted-list' | 'list-item';

export enum BlockFormatType {
    paragraph = 'paragraph',
    headingOne = 'heading_1',
    headingTwo = 'heading_2',
    headingThree = 'heading_3',
    pullQuote = 'pullQuote',
    monospaced = 'monospaced',
    numberedList = 'numbered-list',
    bulletedList = 'bulleted-list',
    listItem = 'list-item'

};

export type TextStyle = "italic" | "bold" | "strikeThough" | "underline"
export enum TextStyleType {
    bold = 'bold',
    italic = 'italic',
    strikeThrough = 'strikeThough',
    underline = 'underline'
}