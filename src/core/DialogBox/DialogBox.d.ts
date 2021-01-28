import React from 'react';
interface DialogProps {
    id: string;
    open: boolean;
    onClose: () => void;
    title?: string;
    class?: string;
    children?: any;
    width?: number;
    height?: number;
}
export declare function DialogBox(props: DialogProps): React.ReactPortal | null;
export {};
