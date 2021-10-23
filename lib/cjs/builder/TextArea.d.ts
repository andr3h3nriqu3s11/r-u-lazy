import React from 'react';
import { WraperProps } from './Wraper';
export interface TextAreaProps {
    id: string;
    label?: string;
    labelClass?: string;
    inputClass?: string;
    hidden?: boolean;
    gridless?: boolean;
    style?: React.CSSProperties;
    tooltip?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    title?: string;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}
export interface BaseTextAreaProps {
    style?: React.CSSProperties;
    tooltip?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    title?: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
}
export declare const TextAreaBuilder: (BaseTextArea: React.FC<BaseTextAreaProps>, Wraper: React.FC<WraperProps>) => React.FC<TextAreaProps>;
