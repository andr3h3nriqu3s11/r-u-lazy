import React from 'react';
import { LabelSelector } from '../types';
import { WraperProps } from './Wraper';

export interface BaseInputMaskProps {
    placeholder?: string;
    tooltip?: string;
    value?: string;
    //TODO: Deal with the any
    onChange?: (e: any) => void;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    mask?: string;
    style?: React.CSSProperties;
    autoClear?: boolean;
    unmask?: boolean;
}

export interface InputMaskProps {
    id: string;
    label?: string;
    labelClass?: string;
    hidden?: boolean;
    disabled?: boolean;
    fieldClass?: string;
    placeholder?: string;
    tooltip?: string;
    value?: any;
    onChange: (e: any) => void;
    required?: boolean;
    mask?: string;
    style?: React.CSSProperties;
    gridless?: boolean;
    autoClear?: boolean;
    unmask?: boolean;
}

export function InputMaskBuilder(
    BaseInputMask: React.FC<BaseInputMaskProps>,
    Wraper: React.FC<WraperProps>,
    ls: LabelSelector
) {
    const InputMask = (props: InputMaskProps) => {
        let {
            unmask = true,
            autoClear = false,
            label,
            id,
            gridless = false,
            placeholder,
            labelClass = 'p-col-3',
            fieldClass = 'p-col-7',
            hidden = false,
            disabled = false,
            tooltip,
            value,
            onChange,
            required = false,
            mask,
            style,
        } = props;
        label = label ?? id;
        placeholder = placeholder ?? id;
        mask = mask ?? id;
        label =
            ls(label, undefined, 'LabelInferenceFailed') ===
            'LabelInferenceFailed'
                ? label
                : ls(label);
        mask =
            ls(mask, 'mask', 'LabelInferenceFailed') === 'LabelInferenceFailed'
                ? mask
                : ls(mask, 'mask', 'LabelInferenceFailed');
        placeholder =
            ls(placeholder, 'placeholder', 'LabelInferenceFailed') ===
            'LabelInferenceFailed'
                ? placeholder
                : ls(placeholder, 'placeholder', 'LabelInferenceFailed');
        return (
            <Wraper
                id={id}
                label={label}
                hidden={hidden}
                class={labelClass}
                gridless={gridless}
            >
                <div className={fieldClass}>
                    <BaseInputMask
                        placeholder={placeholder}
                        tooltip={tooltip}
                        value={value}
                        onChange={(e: any) =>
                            disabled ? () => {} : onChange(e)
                        }
                        id={id}
                        disabled={disabled}
                        required={required}
                        mask={mask}
                        style={style}
                        autoClear={autoClear}
                        unmask={unmask}
                    />
                </div>
            </Wraper>
        );
    };
    return InputMask;
}
