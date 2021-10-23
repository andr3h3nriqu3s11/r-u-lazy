import React from 'react';
import { WraperProps } from './Wraper';
export interface InputProps {
    id: string;
    value?: string;
    label?: string;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
    inputClass?: string;
    labelClass?: string;
    type?: string;
    tooltip?: string;
    gridless?: boolean;
    title?: string;
    onChange?: (e: any) => void;
}
export interface BaseInputProps {
    title?: string;
    tooltip?: string;
    type?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    id?: string;
    disabled?: boolean;
    required?: boolean;
}
export declare function InputBuilder(BaseInput: React.FC<BaseInputProps>, Wraper: React.FC<WraperProps>): (props: InputProps) => JSX.Element;
