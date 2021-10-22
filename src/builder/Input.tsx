import React from 'react';
import { LabelSelector } from '../types';
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

export function InputBuilder(
    BaseInput: React.FC<BaseInputProps>,
    Wraper: React.FC<WraperProps>,
    ls: LabelSelector
) {
    const Input = (props: InputProps) => {
        let {
            hidden,
            id,
            required,
            label,
            labelClass = 'p-col-3',
            inputClass = 'p-col-7',
            disabled,
            tooltip,
            type,
            value,
            onChange,
            gridless,
            title,
        } = props;
        label = label ?? id;
        label =
            ls(label, undefined, 'LabelInfenranceFailed') ===
            'LabelInfenranceFailed'
                ? label
                : ls(label);
        return (
            <Wraper
                id={id}
                label={label}
                class={labelClass}
                hidden={hidden}
                gridless={gridless}
            >
                <BaseInput
                    title={title}
                    tooltip={tooltip}
                    type={type}
                    value={value}
                    onChange={!disabled && onChange ? onChange : () => {}}
                    id={id}
                    disabled={disabled}
                    required={required}
                />
            </Wraper>
        );
    };
    return Input;
}
