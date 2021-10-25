# R-u-lazy

A React Framework for lazy people

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

// Create your Form and Div elements 
// Since we want the button to work in this form we add the interceptor to the interceptor list
export const { Form, Div } = FormBuilder<FormExtraProps, () => void, unknown>(
    [ButtonInterceptor]
);
```

## TODOs

- [ ] Improve Documentation
- [ ] Add some default fields
- [ ] Complete the button field