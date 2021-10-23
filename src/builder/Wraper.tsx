import React, { ReactElement } from 'react';
import { StringEmpty } from '../index';
import { LabelSelector } from '../types';

export interface WraperProps {
    hidden?: boolean;
    label?: string;
    children: ReactElement[] | ReactElement | Element;
    id?: string;
    class?: string;
    gridless?: boolean;
    reversed?: boolean;
}

export const WraperBuilder = (ls: LabelSelector) => {
    const Wraper: React.FC<WraperProps> = ({
        hidden,
        label,
        children,
        id,
        class: className,
        gridless,
        reversed,
    }: WraperProps) => {
        if (hidden) return <></>;
        if ((StringEmpty(label) && StringEmpty(id)) || label === '')
            return <>{children}</>;
        label = label ?? id ?? '';
        label = ls(label, undefined, label);
        let labelbody = (
            <div key={`${id}divlable`} className={className}>
                <label htmlFor={id}>{label}</label>
            </div>
        );
        if (!id)
            labelbody = (
                <div key={`${id}divlabel`} className={className}>
                    {label}
                </div>
            );
        if (gridless && reversed) return <>{[children, labelbody]}</>;
        if (gridless) return <>{[labelbody, children]}</>;
        if (reversed)
            return (
                <div key={`${id}div`} className="p-grid">
                    {labelbody} {children}
                </div>
            );
        return (
            <div key={`${id}div${label}`} className="p-grid">
                {' '}
                {labelbody} {children}{' '}
            </div>
        );
    };
    return Wraper;
};
