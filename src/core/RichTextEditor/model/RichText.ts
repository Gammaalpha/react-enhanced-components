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