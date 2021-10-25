import React from 'react';
import { AllPossible, FormElementBuilder } from '..';
import { FormExtraProps } from './Form';

//TODO more work to be done

export interface ButtonProps {
    disabled?: boolean;
    children?: AllPossible;
}

export let { Element: Button, Interceptor: ButtonInterceptor } =
    FormElementBuilder<ButtonProps, FormExtraProps, 'button'>(
        'button',
        ({ props: { children, disabled }, formProps }) => {
            return (
                <button disabled={disabled ?? formProps.extra.disabled}>
                    {children}
                </button>
            );
        }
    );
