import React from 'react';
import { LabelSelector } from '../types';
import { WraperProps } from './Wraper';

interface InputNumberProps {
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
    //TODO: see the right types
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
    currency: string;
    minFractionDigits: number;
    maxFractionDigits: number;
    locale: string;
}

export function InputNumberBuilder(
    BaseInputNumber: React.FC<BaseInputNumber>,
    Wraper: React.FC<WraperProps>,
    ls: LabelSelector
) {
    const InputNumber = (props: InputNumberProps) => {
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
            suffix,
            suffixOutside,
            prefix,
            mode,
            currency,
            minFractionDigits,
            maxFractionDigits,
            locale,
        } = props;
        label = label ?? id;
        label =
            ls(label, undefined, 'LabelInfenranceFailed') ===
            'LabelInfenranceFailed'
                ? label
                : ls(label);
        let valueN: number | undefined = Number(value);
        if (isNaN(valueN)) valueN = undefined;
        return (
            <Wraper
                id={id}
                label={label}
                class={labelClass}
                gridless={gridless}
                hidden={hidden}
            >
                <div className={(suffixOutside ? 'p-grid ' : '') + inputClass}>
                    {(() => {
                        let a = (
                            <BaseInputNumber
                                tooltip={tooltip}
                                type={type}
                                value={valueN}
                                onChange={
                                    !disabled && onChange ? onChange : () => {}
                                }
                                id={id}
                                disabled={disabled}
                                required={required}
                                suffix={suffixOutside ? '' : suffix}
                                prefix={prefix}
                                mode={mode}
                                currency={currency}
                                minFractionDigits={minFractionDigits}
                                maxFractionDigits={maxFractionDigits}
                                locale={locale}
                            />
                        );
                        if (suffixOutside)
                            return (
                                <>
                                    <div className="p-col">{a}</div>
                                    <div className="p-col-1">
                                        {suffix ?? ''}
                                    </div>
                                </>
                            );
                        return a;
                    })()}
                </div>
            </Wraper>
        );
    };
    return InputNumber;
}
