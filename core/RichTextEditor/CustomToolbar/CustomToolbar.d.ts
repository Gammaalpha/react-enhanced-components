/// <reference types="react" />
import './CustomToolbar.css';
export interface IToolbar {
    id: string;
    editorRef: any;
    toolbarStyle?: string;
    editorId: string;
    editing?: boolean;
}
export default function CustomToolbar(props: IToolbar): JSX.Element;
