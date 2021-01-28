export declare const fontStyle = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
export declare const ToolbarButton: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const CloseButton: import("styled-components").StyledComponent<"button", any, {}, never>;
export declare const Label: import("styled-components").StyledComponent<"label", any, {}, never>;
export declare const StyledInput: import("styled-components").StyledComponent<"input", any, {}, never>;
declare type RowProps = {
    flex?: string | number;
    gap?: number;
    maxHeight?: string;
};
export declare const Row: import("styled-components").StyledComponent<"div", any, RowProps, never>;
export declare const ErrorMessage: import("styled-components").StyledComponent<"span", any, {}, never>;
declare type ColumnProps = {
    width?: string;
    color?: string;
    flex?: string | number;
    maxHeight?: string;
};
export declare const Column: import("styled-components").StyledComponent<"div", any, ColumnProps, never>;
declare type StyledTextareaProps = {
    maxHeight?: string;
};
export declare const StyledTextarea: import("styled-components").StyledComponent<"textarea", any, StyledTextareaProps, never>;
declare type MainContainerProps = {
    minHeight?: string;
};
export declare const MainContainer: import("styled-components").StyledComponent<"div", any, MainContainerProps, never>;
export declare const Container: import("styled-components").StyledComponent<"div", any, {}, never>;
declare type MarkdownBodyProps = {
    maxHeight?: string;
    overflowY: string;
};
export declare const MarkdownBody: import("styled-components").StyledComponent<"div", any, MarkdownBodyProps, never>;
export declare const ToolbarRow: import("styled-components").StyledComponent<"div", any, {}, never>;
declare type PreviewTitleProps = {
    padding?: string;
};
export declare const PreviewTitle: import("styled-components").StyledComponent<"div", any, PreviewTitleProps, never>;
declare type BorderedProps = {
    bordered: boolean;
    maxHeight: string;
};
export declare const Bordered: import("styled-components").StyledComponent<"div", any, BorderedProps, never>;
export {};
