import { IToolbarButton, IRange } from "./RichText";
export interface IColor {
    colorCode: string;
    label: string;
    id: string;
}
export declare type FontColorButtonType = "Font" | "Highlight";
export interface IFontColorButtonProps {
    buttonType: FontColorButtonType;
    buttonParams: IToolbarButton;
    callback?: any;
    defaultColor?: string;
    range?: IRange;
}
