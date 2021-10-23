import React, { MouseEvent } from 'react';
import { BaseButtonProps, ButtonProps } from './builder/Button';
import { BaseDateInputProps, DateInputProps } from './builder/DateInput';
import { DialogPromptProps, DialogRequiredProps } from './builder/Dialog';
import { BaseDropdownProps, DropdownProps } from './builder/Dropdown';
import { BaseEditorProps, EditorProps } from './builder/Editor';
import { BaseInputProps, InputProps } from './builder/Input';
import { BaseInputMaskProps, InputMaskProps } from './builder/InputMask';
import { BaseInputNumber, InputNumberProps } from './builder/InputNumber';
import { BaseInputSwitchProps, SwitchProps } from './builder/InputSwitch';
import { BaseTextAreaProps, TextAreaProps } from './builder/TextArea';
import { FormConfig } from './Form';
import { LabelSelector, StateItems } from './types';
export declare function StringEmpty(s: string | null | undefined): boolean;
interface BuildAllProps {
    BaseButton?: React.FC<BaseButtonProps>;
    BaseInputMask?: React.FC<BaseInputMaskProps>;
    BaseEditor?: React.FC<BaseEditorProps>;
    BaseInput?: React.FC<BaseInputProps>;
    BaseDateInput?: React.FC<BaseDateInputProps>;
    BaseTextArea?: React.FC<BaseTextAreaProps>;
    BaseDropdown?: React.FC<BaseDropdownProps>;
    BaseInputSwitch?: React.FC<BaseInputSwitchProps>;
    BaseInputNumber?: React.FC<BaseInputNumber>;
    Dialog?: React.FC<DialogRequiredProps>;
    Messages?: React.LazyExoticComponent<React.ComponentType>;
}
export interface Config extends FormConfig {
}
export declare function BuildAll(ls: LabelSelector, config: Config, { BaseButton, BaseInputMask, BaseEditor, BaseInput, BaseDateInput, Dialog, BaseTextArea, BaseDropdown, BaseInputSwitch, BaseInputNumber, Messages, }: BuildAllProps): {
    DialogPrompt: React.FC<DialogPromptProps>;
    Button: React.FC<ButtonProps>;
    InputMask: React.FC<InputMaskProps>;
    Editor: React.FC<EditorProps>;
    Input: React.FC<InputProps>;
    DateInput: React.FC<DateInputProps>;
    Wraper: React.FC<import("./builder/Wraper").WraperProps>;
    TextArea: React.FC<TextAreaProps>;
    Dropdown: React.FC<DropdownProps<unknown>>;
    InputSwitch: React.FC<SwitchProps>;
    InputNumber: React.FC<InputNumberProps>;
    Form: React.FC<import("./Form").FormProps<unknown>>;
    GDiv: React.FC<import("./Form").GDivProps<any>>;
};
export declare function StateIcon(props: {
    custom: StateItems;
    state: number;
    style?: React.CSSProperties;
    small?: boolean;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}): JSX.Element;
interface TreatDateProps {
    date: string;
    extended?: boolean;
    table?: boolean;
    returnString?: boolean;
}
export declare const treatDate: ({ date, extended, table, returnString, }: TreatDateProps) => string | JSX.Element;
/**
 * @function treats dates to the some of the iso formats without any timezone information
 * @returns the treated date
 */
export declare function formatDate(date: string | Date, widthTime?: boolean, end?: boolean): string;
export {};
