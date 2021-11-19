import React from 'react';
import { AllPossible, FormElementBuilder } from '..';
import { FormExtraProps } from './Form';

//TODO more work to be done

export interface ButtonProps {
    disabled?: boolean;
    hidden?: boolean;
    children?: AllPossible;
    className?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export let { Element: Button, Interceptor: ButtonInterceptor } =
    FormElementBuilder<ButtonProps, FormExtraProps, 'button'>(
        'button',
        ({
            props: { children, disabled, className, hidden, id, type, onClick },
            formProps,
        }) => {
            if (hidden) return null;
            return (
                <button
                    onClick={onClick}
                    type={type}
                    id={id}
                    className={className}
                    disabled={disabled ?? formProps.extra?.disabled}
                >
                    {children}
                </button>
            );
        }
    );
