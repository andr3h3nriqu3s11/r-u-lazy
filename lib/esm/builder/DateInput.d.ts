import React from 'react';
import { LabelSelector } from '../types';
import { WraperProps } from './Wraper';
export interface DateInputProps {
    selectionMode?: any;
    inputClass?: string;
    label?: string;
    id: string;
    labelClass?: string;
    hidden?: boolean;
    gridless?: boolean;
    showTime?: boolean;
    timeOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    value?: Date;
    hourFormat?: string;
    dateFormat?: string;
    disabled?: boolean;
    onChange?: (e: {
        originalEvent: Event;
        value: Date | Date[];
        target: {
            name: string;
            id: string;
            value: Date | Date[];
        };
    }) => void;
}
export interface BaseDateInputProps {
    selectionMode?: string;
    hourFormat?: string;
    showTime?: boolean;
    timeOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    yearRange?: string;
    monthNavigator?: boolean;
    yearNavigator?: boolean;
    id?: string;
    dateFormat?: string;
    value?: Date | Date[];
    onChange?: (e: any) => void;
    disabled?: boolean;
}
export declare function DateInputBuilder(BaseDateInput: React.FC<BaseDateInputProps>, Wraper: React.FC<WraperProps>, ls: LabelSelector): ({ selectionMode, inputClass, labelClass, label, id, hidden, gridless, showTime, timeOnly, minDate, maxDate, value, disabled, onChange, hourFormat, }: DateInputProps) => JSX.Element;
