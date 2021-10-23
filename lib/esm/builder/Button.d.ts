import React, { MouseEventHandler } from 'react';
import { LabelSelector } from '../types';
export interface BaseButtonProps {
    tooltip?: string;
    style?: React.CSSProperties;
    icon?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    label?: string;
    type?: string;
}
export interface ButtonProps {
    label?: string;
    icon?: string;
    disabled?: boolean;
    hidden?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    wraperClass?: string;
    wraperStyle?: React.CSSProperties;
    bttClass?: string;
    tooltip?: string;
    style?: React.CSSProperties;
    type?: 'button';
}
export declare function ButtonBuilder(BaseButton: React.FC<BaseButtonProps>, ls: LabelSelector): (props: ButtonProps) => JSX.Element | null;
