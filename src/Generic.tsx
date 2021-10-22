import { Dialog } from 'primereact/dialog';
import { Dropdown as PDropdown } from 'primereact/dropdown';
import { InputNumber as PInputNumber } from 'primereact/inputnumber';
import { InputSwitch as PInputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { MouseEvent, ReactElement, useState } from 'react';
import type { StateItems } from './types';
import { ButtonBuilder, BaseButtonProps, ButtonProps } from './builder/Button';
import {
    BaseDateInputProps,
    DateInputBuilder,
    DateInputProps,
} from './builder/DateInput';
import { BaseEditorProps, EditorBuilder, EditorProps } from './builder/Editor';
import { BaseInputProps, InputBuilder, InputProps } from './builder/Input';
import {
    BaseInputMaskProps,
    InputMaskBuilder,
    InputMaskProps,
} from './builder/InputMask';
import { g_wraper, lb, ls } from './GenericFunctions';
import { LabelSelector } from './types';
import {
    DialogPromptBuilder,
    DialogPromptProps,
    DialogRequiredProps,
} from './builder/Dialog';
import { WraperBuilder } from './builder/Wraper';

export * from './Form';

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
    Dialog?: React.FC<DialogRequiredProps>;
}

export function BuildAll(
    ls: LabelSelector,
    {
        BaseButton,
        BaseInputMask,
        BaseEditor,
        BaseInput,
        BaseDateInput,
        Dialog,
    }: BuildAllProps
) {
    let Wraper = WraperBuilder(ls);

    let Button: React.FC<ButtonProps> = null;
    let InputMask: React.FC<InputMaskProps> = null;
    let Editor: React.FC<EditorProps> = null;
    let Input: React.FC<InputProps> = null;
    let DateInput: React.FC<DateInputProps> = null;
    let DialogPrompt: React.FC<DialogPromptProps> = null;

    if (BaseButton) {
        Button = ButtonBuilder(BaseButton, ls);
    } else {
        Button = DepThrowErrorBuilder<ButtonProps>('Button', 'BaseButton');
    }

    if (BaseInputMask) {
        InputMask = InputMaskBuilder(BaseInputMask, Wraper, ls);
    } else {
        InputMask = DepThrowErrorBuilder<InputProps>(
            'InputMask',
            'BaseInputMask'
        );
    }

    if (BaseEditor) {
        Editor = EditorBuilder(BaseInputMask, Wraper, ls);
    } else {
        Editor = DepThrowErrorBuilder<EditorProps>('Editor', 'BaseEditor');
    }

    if (BaseInput) {
        Input = InputBuilder(BaseInput, Wraper, ls);
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

    if (Button && Dialog) {
        DialogPrompt = DialogPromptBuilder(Dialog, Button, ls);
    } else {
        DialogPrompt = DepThrowErrorBuilder<DialogPromptProps>(
            'DialogPrompt',
            'Button and Dialog'
        );
    }

    return {
        DialogPrompt,
        Button,
        InputMask,
        Editor,
        Input,
        DateInput,
        Wraper,
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

interface TextAreaProps {
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
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}
export const TextArea: React.FC<TextAreaProps> = ({
    id,
    label,
    labelClass,
    hidden,
    gridless,
    inputClass,
    style,
    tooltip,
    value,
    disabled,
    required,
    onChange = () => {},
}: TextAreaProps) => {
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    return g_wraper(
        id,
        label,
        <div className={inputClass}>
            <InputTextarea
                style={style}
                tooltip={tooltip}
                value={value}
                onChange={e => (disabled ? () => {} : onChange(e))}
                title={'Por favor preencha este campo'}
                id={id}
                disabled={disabled}
                required={required}
            />
        </div>,
        hidden,
        labelClass,
        gridless
    );
};

interface DropdownProps<T> {
    id: string;
    options: { value: string; label: string }[];
    label?: string;
    lClass?: string;
    hidden?: boolean;
    itemTemplate?: (option: T) => React.ReactNode;
    filter?: boolean;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange: (e: {
        originalEvent: Event;
        value: any;
        target: { name: string; id: string; value: any };
    }) => void;
    required?: boolean;
    showClear?: boolean;
    fClass?: string;
    gridless?: boolean;
}
export const Dropdown = function <T>({
    label,
    id,
    lClass,
    hidden,
    itemTemplate,
    filter,
    options,
    placeholder,
    value,
    disabled,
    onChange,
    required,
    showClear,
    fClass,
    gridless,
}: DropdownProps<T>) {
    return (
        <Wraper
            label={label}
            id={id}
            class={lClass}
            hidden={hidden}
            gridless={gridless}
        >
            <div className={fClass}>
                <PDropdown
                    key={`${id}drop`}
                    itemTemplate={itemTemplate}
                    filter={filter}
                    filterBy="label, value"
                    options={options}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => (disabled ? () => {} : onChange(e))}
                    disabled={disabled}
                    id={id}
                    required={required}
                    showClear={showClear}
                />
            </div>
        </Wraper>
    );
};

interface SwitchProps<T> {
    id: string;
    checked?: boolean;
    disabled?: boolean;
    tooltip?: string;

    fClass?: string;
    label?: string;
    lClass?: string;
    hidden?: boolean;
    gridless?: boolean;

    onChange?: (e: {
        originalEvent: Event;
        value: boolean;
        target: { name: string; id: string; value: boolean };
    }) => void;
}
export const InputSwitch = function <T>({
    id,
    checked,
    disabled,
    tooltip,
    onChange,
    fClass,
    label,
    lClass,
    hidden,
    gridless,
}: SwitchProps<T>) {
    return (
        <Wraper
            label={label}
            id={id}
            class={lClass}
            hidden={hidden}
            gridless={gridless}
        >
            <div className={fClass}>
                <PInputSwitch
                    id={id}
                    checked={checked}
                    disabled={disabled}
                    tooltip={tooltip}
                    onChange={onChange}
                />
            </div>
        </Wraper>
    );
};

interface TreatDateProps {
    date: string;
    extended?: boolean;
    table?: boolean;
    returnString?: boolean;
}

export const TreatDate = ({
    date,
    extended = true,
    table = false,
    returnString = false,
}: TreatDateProps) => {
    if (!date || !date.match(/^[\d-]{10}T[\d:]{8}.*/)) return <span></span>;
    let matched = date.match(/^(\d{4})-(\d{2})-(\d{2})T([\d:]{8}).*/);
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
