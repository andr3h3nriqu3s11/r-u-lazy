import { DefaultSetFunctionType, FormBuilder } from '..';
import { ButtonInterceptor } from './Button';
import { InputInterceptor } from './Input';

export interface FormExtraProps {
    disabled?: boolean;
}

export const { Form, Div } = FormBuilder<
    FormExtraProps,
    DefaultSetFunctionType
>([ButtonInterceptor, InputInterceptor]);
