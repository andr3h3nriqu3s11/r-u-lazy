import React from 'react';
import { WraperProps } from './Wraper';

export interface SwitchProps {
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

export interface BaseInputSwitchProps {
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    tooltip?: string;
    onChange?: (e: {
        originalEvent: Event;
        value: boolean;
        target: { name: string; id: string; value: boolean };
    }) => void;
}

export const InputSwitchBuilder = function (
    BaseInputSwitch: React.FC<BaseInputSwitchProps>,
    Wraper: React.FC<WraperProps>
) {
    const InputSwitch = function ({
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
    }: SwitchProps) {
        return (
            <Wraper
                label={label}
                id={id}
                class={lClass}
                hidden={hidden}
                gridless={gridless}
            >
                <div className={fClass}>
                    <BaseInputSwitch
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

    return InputSwitch;
};