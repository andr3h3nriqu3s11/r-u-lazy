import React, { useState } from 'react';
import { LabelSelector } from '../types';

export interface DialogPromptProps {
    hidden?: boolean;
    yesbtt?: { label?: string; class?: string; icon?: string };
    nobtt?: { label?: string; class?: string; icon?: string };
    onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDeny?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    wraperClass?: string;
    label?: string;
    icon?: string;
    bttClass?: string;
    disabled?: boolean;
    id?: string;
    text?: string;
}

interface ButtonRequiredProps {
    label?: string;
    bttClass?: string;
    icon?: string;
    wraperClass?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button';
    disabled?: boolean;
}

export interface DialogRequiredProps {
    visible?: boolean;
    onHide?: () => void;
    //TODO: Improve footer any
    footer?: any;
    style?: React.CSSProperties;
    id?: string;
    //TODO: Improve footer any
    header?: any;
}

export function DialogPromptBuilder(
    Dialog: React.FC<DialogRequiredProps>,
    Button: React.FC<ButtonRequiredProps>,
    ls: LabelSelector
) {
    const DialogPrompt: React.FC<DialogPromptProps> = ({
        hidden,
        yesbtt,
        onConfirm,
        nobtt,
        onDeny,
        wraperClass,
        label,
        icon,
        bttClass,
        disabled,
        text: textIn,
        id,
    }) => {
        let [visible, setVisible] = useState(false);
        if (hidden) return null;
        let text = ls(textIn ?? '', 'dialog', textIn);
        let footer = (
            <div>
                <Button
                    label={yesbtt?.label ?? 'yes'}
                    bttClass={yesbtt?.class ?? 'p-button-success'}
                    icon={yesbtt?.icon}
                    wraperClass=""
                    onClick={e => {
                        e.preventDefault();
                        setVisible(false);
                        if (onConfirm) onConfirm(e);
                    }}
                />
                <Button
                    label={nobtt?.label ?? 'no'}
                    wraperClass=""
                    bttClass={nobtt?.class ?? 'p-button-danger'}
                    icon={nobtt?.icon}
                    onClick={e => {
                        e.preventDefault();
                        setVisible(false);
                        if (onDeny) onDeny(e);
                    }}
                />
            </div>
        );
        return (
            <div className={wraperClass}>
                <Button
                    label={label}
                    icon={icon}
                    wraperClass=""
                    bttClass={bttClass}
                    onClick={e => {
                        e.preventDefault();
                        if (disabled) return;
                        setVisible(true);
                    }}
                    type="button"
                    disabled={disabled}
                />
                <Dialog
                    visible={visible}
                    onHide={() => setVisible(false)}
                    footer={footer}
                    style={{ width: '50vw' }}
                    id={id}
                    header={ls(label ?? '', 'button', label)}
                >
                    {text}
                </Dialog>
            </div>
        );
    };
    return DialogPrompt;
}
