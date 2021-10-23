import React from 'react';
import { WraperProps } from './Wraper';
export interface EditorProps {
    id: string;
    disabled?: boolean;
    label?: string;
    style?: React.CSSProperties;
    fieldClass?: string;
    value?: string;
    labelClass?: string;
    gridless?: boolean;
    hidden?: boolean;
    onChange?: (e: {
        htmlValue: string | null;
        textValue: string;
        delta: any;
        source: string;
    }) => void;
}
export interface BaseEditorProps {
    value?: string;
    id?: string;
    style?: React.CSSProperties;
    onTextChange?: (e: any) => void;
}
export declare function EditorBuilder(BaseEditor: React.FC<BaseEditorProps>, Wraper: React.FC<WraperProps>): (props: EditorProps) => JSX.Element | null;
