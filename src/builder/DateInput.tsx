import React from 'react';
import { LabelSelector } from '../types';
import { WraperProps } from './Wraper';

export interface DateInputProps {
    selectionMode?: any;
    inputClass?: string;
    label?: string;
    id: string;
    labelClass?: string;
    hidden?: boolean;
    gridless?: boolean;
    showTime?: boolean;
    timeOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    value?: Date;
    hourFormat?: string;
    dateFormat?: string;
    disabled?: boolean;
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

export interface BaseDateInputProps {
    selectionMode: string;
    hourFormat: string;
    showTime: boolean;
    timeOnly: boolean;
    minDate: Date;
    maxDate: Date;
    yearRange: string;
    monthNavigator: boolean;
    yearNavigator: boolean;
    id: string;
    dateFormat: string;
    value: Date | Date[];
    //TODO deal with as any
    onChange: (e: any) => void;
    disabled: boolean;
}

export function DateInputBuilder(
    BaseDateInput: React.FC<BaseDateInputProps>,
    Wraper: React.FC<WraperProps>,
    ls: LabelSelector
) {
    let DateInput = ({
        selectionMode,
        inputClass,
        labelClass,
        label,
        id,
        hidden,
        gridless,
        showTime,
        timeOnly,
        minDate,
        maxDate,
        value,
        disabled,
        onChange,
        hourFormat,
    }: DateInputProps) => {
        label = label ?? id;
        label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
        return (
            <Wraper
                id={id}
                label={label}
                hidden={hidden}
                class={labelClass}
                gridless={gridless}
            >
                <div className={inputClass}>
                    <BaseDateInput
                        selectionMode={selectionMode}
                        hourFormat={ls(
                            'hourFomart',
                            'default',
                            hourFormat ?? ''
                        )}
                        showTime={showTime}
                        timeOnly={timeOnly}
                        minDate={minDate}
                        maxDate={maxDate}
                        yearRange={`1900:${new Date().getFullYear() + 10}`}
                        monthNavigator={true}
                        yearNavigator={true}
                        id={id}
                        dateFormat="dd-mm-yy"
                        value={value}
                        onChange={event => (onChange ?? (() => {}))(event)}
                        disabled={disabled}
                    />
                </div>
            </Wraper>
        );
    };
    return DateInput;
}
