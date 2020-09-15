import { IToolbarButton, IRange } from "./RichText";

export interface IColor {
    colorCode: string;
    label: string;
    id: string;
}

// export class ColorPicker {
//     public colorCode: string = '';
//     public label: string = '';

//     constructor(options?: Partial<ColorPicker>) {
//         Object.assign(this, options);
//     }
// }

export type FontColorButtonType = "Font" | "Highlight";

export interface IFontColorButtonProps {
    buttonType: FontColorButtonType;
    buttonParams: IToolbarButton;
    callback?: any;
    defaultColor?: string;
    range?: IRange;
}