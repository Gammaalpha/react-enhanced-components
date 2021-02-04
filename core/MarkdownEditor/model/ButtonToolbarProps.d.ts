export interface ButtonToolbarProps {
    value?: string;
    callback?: any;
    insertCmd?: any;
}
export interface ButtonProps {
    key: string;
    icon?: any;
    label?: string;
    ariaLabel?: string;
    tooltip?: string;
    disabled?: boolean;
    callback?: any;
    options?: ButtonProps[];
}
