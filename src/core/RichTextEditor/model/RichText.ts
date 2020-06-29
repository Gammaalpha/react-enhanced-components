import { TooltipProps } from "@material-ui/core";

export interface IRichText {
    toolbarStyle?: string,
    buttons?: string[]
    id?: string
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
    childButtons?: IToolbarButton[]
}