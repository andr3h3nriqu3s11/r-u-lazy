/**
 *
 * Describes the Code for a simple custom input element that is based on the default value
 *
*/
import React from 'react';
import { FormElementDataBuilder, UnknownFunction } from '..';
import { FormExtraProps } from './Form';

//TODO more work to be done

export interface InputProps {
    disabled?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;

    style?: React.CSSProperties;
    className?: string;
    inputType?: string;
}

export let { Element: Input, Interceptor: InputInterceptor } =
    FormElementDataBuilder<
        InputProps,
        FormExtraProps,
        UnknownFunction<void, unknown>,
        'input'
    >(
        'input',
        ({
            props: { value, onChange, disabled, style, className, inputType },
            formProps,
            data,
            setData,
        }) => {
            return (
                <input
                    value={value ?? data ?? ''}
                    disabled={disabled ?? formProps?.extra?.disabled}
                    style={style}
                    className={className}
                    type={inputType}
                    onChange={e => {
                        if (onChange) {
                            onChange(e);
                            return;
                        }
                        if (setData) {
                            setData({
                                value: e.target.value,
                                originalValue: e,
                            });
                            return;
                        }
                    }} />)
        });
