import React from 'react';
import { WraperProps } from './Wraper';

export interface TextAreaProps {
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
    title?: string;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

export interface BaseTextAreaProps {
    style?: React.CSSProperties;
    tooltip?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    title?: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
}

export const TextAreaBuilder = (
    BaseTextArea: React.FC<BaseTextAreaProps>,
    Wraper: React.FC<WraperProps>
) => {
    const TextArea: React.FC<TextAreaProps> = ({
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
        title,
        onChange = () => {},
    }: TextAreaProps) => {
        label = label ?? id;
        return (
            <Wraper
                id={id}
                gridless={gridless}
                class={labelClass}
                label={label}
                hidden={hidden}
            >
                <div className={inputClass}>
                    <BaseTextArea
                        style={style}
                        tooltip={tooltip}
                        value={value}
                        onChange={e => (disabled ? () => {} : onChange(e))}
                        title={title}
                        id={id}
                        disabled={disabled}
                        required={required}
                    />
                </div>
            </Wraper>
        );
    };
    return TextArea;
};
