import React from 'react';
import { FormElementDataBuilder, UnknownFunction } from '..';
import { FormExtraProps } from './Form';

//TODO more work to be done

export interface InputProps {
    disabled?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export let { Element: Input, Interceptor: InputInterceptor } =
    FormElementDataBuilder<
        InputProps,
        /*unknown,*/
        FormExtraProps,
        UnknownFunction<void, unknown>,
        'input'
    >(
        'input',
        ({
            props: { value, onChange, disabled },
            formProps,
            data,
            setData,
        }) => {
            return (
                <input
                    value={value ?? data ?? ''}
                    disabled={disabled ?? formProps.extra?.disabled}
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
                    }}
                />
            );
        }
    );
