export class Markdown {
    constructor(options?: Partial<Markdown>) {
        return Object.assign(this, options)
    }
}


export interface MarkdownProps {
    content?: string;
    editable?: string;
    callback?: any;
    buttonFunctions?: any[];
    buttonStyles?: any
}

export interface CursorPositionProps {
    start: number;
    end: number;
}