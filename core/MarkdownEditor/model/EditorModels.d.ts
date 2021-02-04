export interface SelectionProps {
    start: number;
    end: number;
}
export interface EditorRefProps {
    value: string;
    selection: SelectionProps;
}
