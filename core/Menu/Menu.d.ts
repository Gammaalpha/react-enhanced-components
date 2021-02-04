/// <reference types="react" />
import "./Menu.css";
interface MenuProps {
    id: string;
    open: boolean;
    onClick: any;
    title: string;
    leftIcon?: any;
    ariaLabel?: string;
    children?: any;
}
export declare function Menu(props: MenuProps): JSX.Element;
interface MenuDropdownItemProps {
    id?: any;
    ariaLabel?: string;
    onClick?: any;
    onClose?: any;
    children?: any;
}
export declare function MenuDropdownItem(props: MenuDropdownItemProps): JSX.Element;
export {};
