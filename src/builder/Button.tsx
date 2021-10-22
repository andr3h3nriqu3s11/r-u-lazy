import React, { MouseEventHandler } from 'react';
import { LabelSelector } from '../types';

export interface BaseButtonProps {
    tooltip: string;
    style: React.CSSProperties;
    icon: string;
    className: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
    label: string;
    //TODO: improve this so that is restricted to the right params
    type: string;
}

export interface ButtonProps {
    label?: string;
    icon?: string;
    disabled?: boolean;
    hidden?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    wraperClass?: string;
    wraperStyle?: React.CSSProperties;
    bttClass?: string;
    tooltip?: string;
    style?: React.CSSProperties;
    //TODO add other types
    type?: 'button';
}

export function ButtonBuilder(
    BaseButton: React.FC<BaseButtonProps>,
    ls: LabelSelector
) {
    const Button = (props: ButtonProps) => {
        let {
            label,
            hidden = false,
            type = 'submit',
            tooltip,
            style,
            icon,
            bttClass,
            onClick = null,
            disabled = false,
            wraperClass = 'p-col-1',
            wraperStyle,
        } = props;
        label =
            ls(label, 'button', 'LabelInferenceFailed') ===
            'LabelInferenceFailed'
                ? label
                : ls(label, 'button', 'LabelInferenceFailed');
        tooltip =
            ls(label, 'tooltip', 'LabelInferenceFailed') ===
            'LabelInferenceFailed'
                ? label
                : ls(label, 'tooltip');
        if (hidden) return null;
        let body = (
            <BaseButton
                tooltip={tooltip}
                type={type}
                style={style}
                icon={icon}
                className={bttClass}
                onClick={!onClick || disabled ? undefined : onClick}
                disabled={disabled}
                label={label}
            />
        );
        if (!wraperClass) return body;
        return (
            <div style={wraperStyle} className={wraperClass}>
                {body}
            </div>
        );
    };
    return Button;
}
