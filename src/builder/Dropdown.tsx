import React from 'react';
import { WraperProps } from './Wraper';

export interface DropdownProps<T> {
    id: string;
    options: { value: string; label: string }[];
    label?: string;
    lClass?: string;
    hidden?: boolean;
    itemTemplate?: (option: T) => React.ReactNode;
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
    filter?: boolean;
}

export interface BaseDropdownProps {
    itemTemplate?: (option: any) => React.ReactNode;
    filter?: boolean;
    filterBy?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: { name: string; id: string; value: any };
    }) => void;
    disabled?: boolean;
    id?: string;
    required?: boolean;
    showClear?: boolean;
    options: { value: string; label: string }[];
}

export const DropdownBuilder = (
    BaseDropdown: React.FC<BaseDropdownProps>,
    Wraper: React.FC<WraperProps>
) => {
    const Dropdown = function <T>({
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
                    <BaseDropdown
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
    return Dropdown;
};
