import React from 'react';
interface MarkdownPreviewAreaProps {
    content: string;
    maxHeight?: string;
    previewRefCallback?: any;
    editable: boolean;
    borderedPreview?: boolean;
    id?: string;
}
export declare function MarkdownPreviewArea(props: MarkdownPreviewAreaProps): JSX.Element;
export declare const MemorizedMarkdownPreviewArea: React.MemoExoticComponent<typeof MarkdownPreviewArea>;
export {};
