import React from 'react';
import { WraperProps } from './Wraper';
export interface InputNumberProps {
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
    suffix?: string;
    suffixOutside?: boolean;
    prefix?: string;
    currency?: string;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    mode?: 'decimal' | 'currency';
    locale?: string;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
}
export interface BaseInputNumber {
    tooltip?: string;
    type?: string;
    value?: number;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    suffix?: string;
    prefix?: string;
    mode?: 'decimal' | 'currency';
    currency?: string;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    locale?: string;
}
export declare function InputNumberBuilder(BaseInputNumber: React.FC<BaseInputNumber>, Wraper: React.FC<WraperProps>): (props: InputNumberProps) => JSX.Element;
