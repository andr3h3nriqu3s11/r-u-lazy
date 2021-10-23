import React from 'react';
import { LabelSelector } from '../types';
export interface DialogPromptProps {
    hidden?: boolean;
    yesbtt?: {
        label?: string;
        class?: string;
        icon?: string;
    };
    nobtt?: {
        label?: string;
        class?: string;
        icon?: string;
    };
    onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDeny?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    wraperClass?: string;
    label?: string;
    icon?: string;
    bttClass?: string;
    disabled?: boolean;
    id?: string;
    text?: string;
}
interface ButtonRequiredProps {
    label?: string;
    bttClass?: string;
    icon?: string;
    wraperClass?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button';
    disabled?: boolean;
}
export interface DialogRequiredProps {
    visible?: boolean;
    onHide?: () => void;
    footer?: any;
    style?: React.CSSProperties;
    id?: string;
    header?: any;
}
export declare function DialogPromptBuilder(Dialog: React.FC<DialogRequiredProps>, Button: React.FC<ButtonRequiredProps>, ls: LabelSelector): React.FC<DialogPromptProps>;
export {};
