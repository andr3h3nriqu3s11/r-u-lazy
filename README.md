# R-u-lazy

A React Framework for lazy people.

There are other projects that help you out build smarter forms such as [Formik](https://formik.org/) and [React Final Form](final-form.org) 

## Install

```bash
# with npm
npm install r-u-lazy

# with yarn
yarn add r-u-lazy
```

## How to use

```ts

import React from 'react';
import {FormElementBuilder, FormBuilder} from 'r-u-lazy';

// Create the object that is passed form form to every component

interface FormExtraProps {
    disabled?: boolean;
}

// Create your own lazy elements
// Start by defining the properties of the element
interface ButtonProps {
    label: string;
    disabled: boolean;
}

// Then Make it lazy
// This function will return the elmeent you can place in the Element field and
// an interceptor that you will use in the creation of the form
export let { Element: Button, Interceptor: ButtonInterceptor } = FormElementBuilder<ButtonProps, FormExtraProps, 'button'>(
    // Give the element an internal name
    'button',
    // Then actualy create the component it recives it's owns properties form the props 
    // part of the object and the form properties form the formProps part of the object
    ({ props: { label, disabled }, formProps }) => {
        return (
            <button disabled={disabled ?? formProps.extra.disabled}>
                {label === 'foo' ? 'bar' : label}
            </button>
        );
    }
);
// Now you have a button that only works insides Forms and that if the label is 'foo' it will display 'bar' and display anything else 

// Create Properties for the input filed
export interface InputProps {
    disabled?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// Because this field needs access to the data we use the FormElementDataBuilder so that we can get access to the data property which will give us access to the field in the object with the name of d form the new object that is put in the form
export let { Element: Input, Interceptor: InputInterceptor } =
    FormElementDataBuilder<
        InputProps,
        unknown,
        FormExtraProps,
        //Change this for the type of the changing function you decided
        // You can also use this type for a generic function that returns a void
        // UnknownFunction<void, unknown>,
        // You can also use a function that that is provided with this package
        // that has some nice functionality 
        DefaultSetFunctionType,
        'input'
    >(
        'input',
        ({
            props: { value, onChange, disabled },
            formProps,
            // Data form the object that is put on the form 
            data,
            // setData form the function that is put on the form 
            setData,
        }) => {
            return (
                <input
                    value={value ?? data ?? ''}
                    disabled={disabled ?? formProps.extra.disabled}
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

// Create your Form and Div elements 
// Since we want the button and the input to work in this form we add the interceptor to the interceptor list
export const { Form, Div } = FormBuilder<FormExtraProps, DefaultSetFunctionType, unknown>(
    [ButtonInterceptor, InputInterceptor]
);

// This is a form example

let FormExample = () => {
    let { obj, setObj } = useDataObject({ name: '', age: 0 });
    return (
        <Form obj={obj} setObj={setObj}>
            <Input d="name" />
        </Form>
    );
};
```

## TODOs

- [ ] Improve Documentation
- [ ] Add some default fields
- [x] Complete the button field
- [ ] Complete the input field