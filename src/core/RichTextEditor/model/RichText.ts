import { TooltipProps } from "@material-ui/core";

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
    childButtons?: IToolbarButton[]
}

// type TextAlignment = "left" | "right" | "center";
export type BlockFormat = "normalText" | "heading_1" | "heading_2" | "heading_3" | "pullQuote" | "monospaced";

export enum BlockFormatType {
    normal = 'normalText',
    headingOne = 'heading_1',
    headingTwo = 'heading_2',
    headingThree = 'heading_3',
    pullQuote = 'pullQuote',
    monospaced = 'monospaced'
};

export type TextStyle = "italic" | "bold" | "strikeThough" | "underline"
export enum TextStyleType {
    bold = 'bold',
    italic = 'italic',
    strikeThrough = 'strikeThough',
    underline = 'underline'
}