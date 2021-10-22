import React from 'react';
import { LabelSelector } from '../types';
import { WraperProps } from './Wraper';

export interface EditorProps {
    id: string;
    disabled?: boolean;
    label?: string;
    style?: React.CSSProperties;
    fieldClass?: string;
    value?: string;
    labelClass?: string;
    gridless?: boolean;
    hidden?: boolean;
    onChange?: (e: {
        htmlValue: string | null;
        textValue: string;
        delta: any;
        source: string;
    }) => void;
}

export interface BaseEditorProps {
    value: string;
    id: string;
    style: React.CSSProperties;
    //TODO deal with the any
    onTextChange: (e: any) => void;
}

export function EditorBuilder(
    BaseEditor: React.FC<BaseEditorProps>,
    Wraper: React.FC<WraperProps>,
    ls: LabelSelector
) {
    let Editor = (props: EditorProps) => {
        let {
            disabled,
            id,
            label,
            style,
            fieldClass,
            value,
            labelClass,
            gridless,
            onChange,
            hidden,
        } = props;
        if (hidden) return null;
        label = label ?? id;
        label =
            ls(label, undefined, 'LabelInfenranceFailed') ===
            'LabelInfenranceFailed'
                ? label
                : ls(label);

        if (disabled)
            return (
                <Wraper
                    id={id}
                    label={label}
                    class={labelClass}
                    gridless={gridless}
                >
                    <div
                        style={{
                            border: '1px solid grey',
                            marginBottom: '3px',
                            ...style,
                        }}
                        className={fieldClass}
                        dangerouslySetInnerHTML={{ __html: value ?? '' }}
                    />
                </Wraper>
            );

        return (
            <Wraper
                id={id}
                label={label}
                class={labelClass}
                gridless={gridless}
            >
                <div className={fieldClass}>
                    <BaseEditor
                        value={value}
                        id={id}
                        style={style ?? { minHeight: '7em' }}
                        onTextChange={e => (onChange ?? (() => {}))(e)}
                    />
                </div>
            </Wraper>
        );
    };
    return Editor;
}
