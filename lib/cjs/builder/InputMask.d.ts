import React from 'react';
import { LabelSelector } from '../types';
import { WraperProps } from './Wraper';
export interface BaseInputMaskProps {
    placeholder?: string;
    tooltip?: string;
    value?: string;
    onChange?: (e: any) => void;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    mask?: string;
    style?: React.CSSProperties;
    autoClear?: boolean;
    unmask?: boolean;
}
export interface InputMaskProps {
    id: string;
    label?: string;
    labelClass?: string;
    hidden?: boolean;
    disabled?: boolean;
    fieldClass?: string;
    placeholder?: string;
    tooltip?: string;
    value?: any;
    onChange: (e: any) => void;
    required?: boolean;
    mask?: string;
    style?: React.CSSProperties;
    gridless?: boolean;
    autoClear?: boolean;
    unmask?: boolean;
}
export declare function InputMaskBuilder(BaseInputMask: React.FC<BaseInputMaskProps>, Wraper: React.FC<WraperProps>, ls: LabelSelector): (props: InputMaskProps) => JSX.Element;
