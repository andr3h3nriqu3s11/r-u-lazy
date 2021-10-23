import React, { MouseEvent, ReactElement } from 'react';
import { DateInputProps } from './builder/DateInput';
import { DropdownProps } from './builder/Dropdown';
import { EditorProps } from './builder/Editor';
import { InputProps } from './builder/Input';
import { InputMaskProps } from './builder/InputMask';
import { InputNumberProps } from './builder/InputNumber';
import { SwitchProps } from './builder/InputSwitch';
import { TextAreaProps } from './builder/TextArea';
import { WraperProps } from './builder/Wraper';
import { LabelSelector, StateItems } from './types';
export declare type StringIndexed = Record<string, any>;
export interface FormProps<T extends StringIndexed = any> {
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    children?: ReactElement<any, any>[] | ReactElement | null;
    t?: string;
    obj?: T;
    setObj?: (e: any, extra: useDataObjectExtra) => void;
    disabled?: boolean;
    fclass?: string;
    lclass?: string;
    req?: boolean;
    group?: boolean;
    class?: string;
    formRef?: (e: HTMLFormElement | null) => void;
}
export interface FormConfig {
    locale: string;
    currency: string;
}
interface HtmlElmProps<T> {
    Wraper: React.FC<WraperProps>;
    InputMask: React.FC<InputMaskProps>;
    Editor: React.FC<EditorProps>;
    Input: React.FC<InputProps>;
    DateInput: React.FC<DateInputProps>;
    TextArea: React.FC<TextAreaProps>;
    Dropdown: React.FC<DropdownProps<T>>;
    InputSwitch: React.FC<SwitchProps>;
    InputNumber: React.FC<InputNumberProps>;
    Messages?: React.LazyExoticComponent<React.ComponentType>;
}
export declare const processChildren: <T extends StringIndexed>(ls: LabelSelector, config: FormConfig, ai: ReactElement, props: FormProps<T>, hemlProps: HtmlElmProps<T>) => ReactElement;
export declare function FormBuilder<K>(ls: LabelSelector, config: FormConfig, hemlProps: HtmlElmProps<K>): React.FC<FormProps<K>>;
export interface GenericElementProps<_ extends StringIndexed = any> {
    isGenericFormElement?: boolean;
    isGenericInputFormElement?: boolean;
    t?: string;
}
export declare const GenericElement: React.FC<GenericElementProps>;
export declare const G: React.FC<GenericElementProps<any>>;
export interface GDivProps<T = any> extends GenericElementProps<T> {
    class?: string;
    style?: React.CSSProperties;
    children?: ReactElement[] | ReactElement | null;
    overload?: FormProps<T>;
    hidden?: boolean;
    grid?: boolean;
    extra?: FormProps;
    group?: boolean;
}
export declare const GDivBuilder: (ls: LabelSelector, config: FormConfig, hemlProps: HtmlElmProps<unknown>) => React.FC<GDivProps<any>>;
interface GViewProps<T extends StringIndexed = StringIndexed> extends GenericElementProps<T> {
    t?: 'v';
    d: keyof T;
    l?: string;
    fClass?: string;
    lClass?: string;
    h?: boolean;
    extended?: boolean;
}
export declare const GView: React.FC<GViewProps>;
interface GStateProps<T extends StringIndexed = StringIndexed> extends GenericElementProps<T> {
    t?: 'state';
    d: keyof T;
    l?: string;
    fClass?: string;
    lClass?: string;
    h?: boolean;
    custom: StateItems;
    small?: boolean;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
    style?: React.CSSProperties;
}
export declare const GState: React.FC<GStateProps>;
interface GMessagesProps<K extends unknown, T extends StringIndexed = StringIndexed> extends GenericElementProps<T> {
    t?: 'messages';
    refM?: React.MutableRefObject<K | null>;
}
export declare const GMessages: React.FC<GMessagesProps<unknown>>;
interface GenericInputElementProps<T extends StringIndexed = StringIndexed> extends GenericElementProps<T> {
    d: keyof T;
    l?: string;
    onChange?: (e: any) => void;
    extra?: useDataObjectExtra;
    req?: boolean;
    disabled?: boolean;
    fClass?: string;
    lClass?: string;
    h?: boolean;
}
export declare const GenericInputElement: React.FC<GenericInputElementProps>;
interface GInputProps<T = StringIndexed> extends GenericInputElementProps<T> {
    t?: 't';
    value?: string;
    type?: string;
    tooltip?: string;
}
export declare const GInput: React.FC<GInputProps>;
interface GMaskProps<T extends StringIndexed = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'mask';
    placeholder?: string;
    tooltip?: string;
    mask?: string;
    style?: React.CSSProperties;
    autoClear?: boolean;
    unmask?: boolean;
}
export declare const GMask: React.FC<GMaskProps>;
interface GAreaProps<T extends StringIndexed = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'area';
    value?: string;
    style?: React.CSSProperties;
    tooltip?: string;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}
export declare const GArea: React.FC<GAreaProps>;
interface GEditorProps<T = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'editor';
    style?: React.CSSProperties;
}
export declare const GEditor: React.FC<GEditorProps>;
interface GDateInputProps<T extends StringIndexed = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'date';
    selectionMode?: any;
    showTime?: boolean;
    timeOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    value?: Date;
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
export declare const GDateInput: React.FC<GDateInputProps>;
export interface GDropdown<T extends StringIndexed = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'drop';
    options: {
        value: string;
        label: string;
    }[];
    extra?: useDataObjectExtra;
    req?: boolean;
    disabled?: boolean;
    fClass?: string;
    lClass?: string;
    h?: boolean;
    itemTemplate?: (option: T) => React.ReactNode;
    filter?: boolean;
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
    showClear?: boolean;
}
export declare const GDropdown: React.FC<GDropdown>;
export interface GSwitchProps<T extends StringIndexed = StringIndexed> extends GenericInputElementProps<T> {
    onChange?: (e: {
        originalEvent: Event;
        value: boolean;
        target: {
            name: string;
            id: string;
            value: boolean;
        };
    }) => void;
    req?: false;
    checked?: boolean;
    tooltip?: string;
}
export declare const GSwitch: React.FC<GSwitchProps>;
interface GNumberProps<T extends StringIndexed = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'number';
    type?: string;
    tooltip?: string;
    suffix?: string;
    prefix?: string;
    currency?: string | boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
    locale?: string | boolean;
}
export declare const GNumber: React.FC<GNumberProps>;
export declare const GE: React.FC<GenericInputElementProps<StringIndexed>>;
interface useDataObjectExtra {
    regex?: string | RegExp;
    replace?: {
        filter: string | RegExp;
        value: string;
    };
    switch?: boolean;
    checkBox?: boolean;
    multiple?: boolean;
    editor?: boolean;
    date?: boolean;
    id?: string;
    withTime?: boolean;
}
export declare function useDataObject<T extends StringIndexed>(initial: T): {
    obj: T;
    setObj: (e: any, extra?: useDataObjectExtra | undefined) => void;
    clear: () => void;
    setObjState: React.Dispatch<React.SetStateAction<T>>;
};
export {};
