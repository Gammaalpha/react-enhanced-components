import React from 'react';
interface MarkdownInputAreaProps {
    content: string;
    callback: any;
    maxHeight?: string;
    scrollCallback?: any;
    id?: string;
}
export declare function MarkdownInputArea(props: MarkdownInputAreaProps): JSX.Element;
export declare const MemorizedMarkdownInputArea: React.MemoExoticComponent<typeof MarkdownInputArea>;
export {};
