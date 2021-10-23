import React, { MouseEvent, useState } from 'react';
import { BaseButtonProps, ButtonBuilder, ButtonProps } from './builder/Button';
import {
    BaseDateInputProps,
    DateInputBuilder,
    DateInputProps,
} from './builder/DateInput';
import {
    DialogPromptBuilder,
    DialogPromptProps,
    DialogRequiredProps,
} from './builder/DialogPrompt';
import {
    BaseDropdownProps,
    DropdownBuilder,
    DropdownProps,
} from './builder/Dropdown';
import { BaseEditorProps, EditorBuilder, EditorProps } from './builder/Editor';
import { BaseInputProps, InputBuilder, InputProps } from './builder/Input';
import {
    BaseInputMaskProps,
    InputMaskBuilder,
    InputMaskProps,
} from './builder/InputMask';
import {
    BaseInputNumber,
    InputNumberBuilder,
    InputNumberProps,
} from './builder/InputNumber';
import {
    BaseInputSwitchProps,
    InputSwitchBuilder,
    SwitchProps,
} from './builder/InputSwitch';
import {
    BaseTextAreaProps,
    TextAreaBuilder,
    TextAreaProps,
} from './builder/TextArea';
import { WraperBuilder } from './builder/Wraper';
import { FormBuilderOld, FormConfig, GDivBuilder } from './Form';
import { LabelSelector, StateItems } from './types';

export function StringEmpty(s: string | null | undefined): boolean {
    return s === null || s === undefined || s === '';
}

let DepThrowErrorBuilder = <T extends unknown>(name: string, dep: string) => {
    let DepThrow: React.FC<T> = () => {
        throw `You can not use ${name} without ${dep} check BuildAll`;
    };
    return DepThrow;
};

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

export interface Config extends FormConfig {}

export function BuildAll(
    ls: LabelSelector,
    config: Config,
    {
        BaseButton,
        BaseInputMask,
        BaseEditor,
        BaseInput,
        BaseDateInput,
        Dialog,
        BaseTextArea,
        BaseDropdown,
        BaseInputSwitch,
        BaseInputNumber,
        Messages,
    }: BuildAllProps
) {
    let Wraper = WraperBuilder(ls);

    let Button: React.FC<ButtonProps>;
    let InputMask: React.FC<InputMaskProps>;
    let Editor: React.FC<EditorProps>;
    let Input: React.FC<InputProps>;
    let DateInput: React.FC<DateInputProps>;
    let DialogPrompt: React.FC<DialogPromptProps>;
    let TextArea: React.FC<TextAreaProps>;
    let Dropdown: React.FC<DropdownProps<unknown>>;
    let InputSwitch: React.FC<SwitchProps>;
    let InputNumber: React.FC<InputNumberProps>;

    if (BaseButton) {
        Button = ButtonBuilder(BaseButton, ls);
    } else {
        Button = DepThrowErrorBuilder<ButtonProps>('Button', 'BaseButton');
    }

    if (BaseInputMask) {
        InputMask = InputMaskBuilder(BaseInputMask, Wraper, ls);
    } else {
        InputMask = DepThrowErrorBuilder<InputMaskProps>(
            'InputMask',
            'BaseInputMask'
        );
    }

    if (BaseEditor) {
        Editor = EditorBuilder(BaseEditor, Wraper);
    } else {
        Editor = DepThrowErrorBuilder<EditorProps>('Editor', 'BaseEditor');
    }

    if (BaseInput) {
        Input = InputBuilder(BaseInput, Wraper);
    } else {
        Input = DepThrowErrorBuilder<InputProps>('Input', 'BaseInput');
    }

    if (BaseDateInput) {
        DateInput = DateInputBuilder(BaseDateInput, Wraper, ls);
    } else {
        DateInput = DepThrowErrorBuilder<DateInputProps>(
            'DateInput',
            'BaseDateInput'
        );
    }

    if (BaseTextArea) {
        TextArea = TextAreaBuilder(BaseTextArea, Wraper);
    } else {
        TextArea = DepThrowErrorBuilder<TextAreaProps>(
            'TextArea',
            'BaseTextArea'
        );
    }

    if (BaseDropdown) {
        Dropdown = DropdownBuilder(BaseDropdown, Wraper);
    } else {
        Dropdown = DepThrowErrorBuilder<DropdownProps<unknown>>(
            'Dropdown',
            'BaseDropdown'
        );
    }

    if (BaseInputSwitch) {
        InputSwitch = InputSwitchBuilder(BaseInputSwitch, Wraper);
    } else {
        InputSwitch = DepThrowErrorBuilder<SwitchProps>(
            'InputSwitch',
            'BaseInputSwitch'
        );
    }

    if (BaseInputNumber) {
        InputNumber = InputNumberBuilder(BaseInputNumber, Wraper);
    } else {
        InputNumber = DepThrowErrorBuilder<InputNumberProps>(
            'InputNumber',
            'BaseInputNumber'
        );
    }

    if (Button && Dialog) {
        DialogPrompt = DialogPromptBuilder(Dialog, Button, ls);
    } else {
        DialogPrompt = DepThrowErrorBuilder<DialogPromptProps>(
            'DialogPrompt',
            'Button and Dialog'
        );
    }

    if (!Messages) {
        DialogPrompt = DepThrowErrorBuilder<DialogPromptProps>(
            'Messages',
            'Messages'
        );
    }

    //Form stuff

    let Form = FormBuilderOld(ls, config, {
        InputMask,
        Wraper,
        Editor,
        Input,
        InputNumber,
        InputSwitch,
        DateInput,
        TextArea,
        Dropdown,
        Messages,
    });

    let GDiv = GDivBuilder(ls, config, {
        InputMask,
        Wraper,
        Editor,
        Input,
        InputNumber,
        InputSwitch,
        DateInput,
        TextArea,
        Dropdown,
        Messages,
    });

    return {
        DialogPrompt,
        Button,
        InputMask,
        Editor,
        Input,
        DateInput,
        Wraper,
        TextArea,
        Dropdown,
        InputSwitch,
        InputNumber,
        Form,
        GDiv,
    };
}

//TODO: This needs to be refactored so that does not have any dependency on an icons packs
export function StateIcon(props: {
    custom: StateItems;
    state: number;
    style?: React.CSSProperties;
    small?: boolean;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}) {
    let [tooltip, setTooltip] = useState(false),
        { custom, state, onClick } = props,
        style = {
            fontSize: props.small ? '1.4em' : '1.87em',
            ...(props.style ?? {}),
        };

    if (custom && custom[state]) {
        let icon = custom[state];
        style = {
            ...style,
            color: icon.color ?? 'black',
            ...(onClick ? { cursor: 'pointer' } : {}),
        };
        return (
            <span
                onMouseOver={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
            >
                <div
                    style={{
                        display: tooltip && icon.tooltip ? 'block' : '',
                        marginTop: '0.5em',
                        backgroundColor: '#222d',
                        color: '#fff',
                        maxWidth: '5em',
                    }}
                    className="p-tooltip"
                >
                    {icon.tooltip}
                </div>
                <span
                    onClick={onClick}
                    className={'pi ' + icon.class}
                    style={style}
                >
                    {icon.text ?? ''}
                </span>
            </span>
        );
    }
    return (
        <span
            onClick={onClick}
            className="pi pi-question"
            style={{ color: 'grey', fontSize: '1.83em' }}
        />
    );
}

interface TreatDateProps {
    date: string;
    extended?: boolean;
    table?: boolean;
    returnString?: boolean;
}

export const treatDate = ({
    date,
    extended = true,
    table = false,
    returnString = false,
}: TreatDateProps) => {
    if (!date || !date.match(/^[\d-]{10}T[\d:]{8}.*/)) return <span></span>;
    let matched = date.match(/^(\d{4})-(\d{2})-(\d{2})T([\d:]{8}).*/);
    if (!matched) return '';
    let formated =
        matched[3] +
        '-' +
        matched[2] +
        '-' +
        matched[1] +
        (extended ? ' ' + matched[4] : ''); //dateformat(date, 'dd-mm-yyyy' + (extended ? ' HH:MM:ss': ''))
    return returnString ? (
        date ? (
            formated
        ) : (
            ''
        )
    ) : !table ? (
        <span
            style={{
                verticalAlign: 'center',
                paddingTop: '.5em',
                paddingBottom: '.5m',
            }}
        >
            {date ? formated : ''}
        </span>
    ) : (
        <p style={{ margin: '0px', textAlign: 'right' }}>
            {date ? formated : ''}
        </p>
    );
};

/**
 * @function treats dates to the some of the iso formats without any timezone information
 * @returns the treated date
 */
export function formatDate(
    date: string | Date,
    widthTime = false,
    end = false
) {
    if (!date) return '';
    let d = new Date(date);
    if (end)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(d.getDate()).padStart(2, '0')}T23:59:59.000`;
    if (!widthTime)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(d.getDate()).padStart(2, '0')}T00:00:00.000`;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        '0'
    )}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(
        2,
        '0'
    )}:${String(d.getMinutes()).padStart(2, '0')}:00.000`;
}
