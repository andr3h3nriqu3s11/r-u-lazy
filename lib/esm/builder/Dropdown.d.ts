import React from 'react';
import { WraperProps } from './Wraper';
export interface DropdownProps<T> {
    id: string;
    options: {
        value: string;
        label: string;
    }[];
    label?: string;
    lClass?: string;
    hidden?: boolean;
    itemTemplate?: (option: T) => React.ReactNode;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
    required?: boolean;
    showClear?: boolean;
    fClass?: string;
    gridless?: boolean;
    filter?: boolean;
}
export interface BaseDropdownProps {
    itemTemplate?: (option: any) => React.ReactNode;
    filter?: boolean;
    filterBy?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
    disabled?: boolean;
    id?: string;
    required?: boolean;
    showClear?: boolean;
    options: {
        value: string;
        label: string;
    }[];
}
export declare const DropdownBuilder: (BaseDropdown: React.FC<BaseDropdownProps>, Wraper: React.FC<WraperProps>) => <T>({ label, id, lClass, hidden, itemTemplate, filter, options, placeholder, value, disabled, onChange, required, showClear, fClass, gridless, }: DropdownProps<T>) => JSX.Element;
