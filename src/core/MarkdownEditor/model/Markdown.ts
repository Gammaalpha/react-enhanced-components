export class Markdown {
    constructor(options?: Partial<Markdown>) {
        return Object.assign(this, options)
    }
}


export interface MarkdownProps {
    content?: string;
    editable: boolean;
    callback?: any;
    buttonFunctions?: any[];
    buttonStyles?: any;
    borderedPreview?: boolean;
}

export interface CursorPositionProps {
    start: number;
    end: number;
}