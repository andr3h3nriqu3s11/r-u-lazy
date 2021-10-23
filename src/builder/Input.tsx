import React from 'react';
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
    Wraper: React.FC<WraperProps>
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
        return (
            <Wraper
                id={id}
                label={label}
                class={labelClass}
                hidden={hidden}
                gridless={gridless}
            >
                <div className={inputClass}>
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
                </div>
            </Wraper>
        );
    };
    return Input;
}
