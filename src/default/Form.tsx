import { FormBuilder } from '..';
import { ButtonInterceptor } from './Button';

export interface FormExtraProps {
    disabled?: boolean;
}

export const { Form, Div } = FormBuilder<FormExtraProps, () => void, unknown>([
    ButtonInterceptor,
]);
