export class Markdown {
    constructor(options?: Partial<Markdown>) {
        return Object.assign(this, options)
    }
}


export interface MarkdownProps {
    id?: string;
    content: string;
    editable: boolean;
    callback?: any;
    buttonFunctions?: any[];
    buttonStyles?: any;
    borderedPreview?: boolean;
    maxEditorHeight?: string;
    minEditorHeight?: string;
    maxEditorInputHeight?: string;
    maxEditorPreviewHeight?: string;
}

export interface CursorPositionProps {
    start: number;
    end: number;
}