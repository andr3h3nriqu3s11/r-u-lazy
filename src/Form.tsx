import React, { useState } from 'react';
import { formatDate } from './index';

export type AllPossible =
    | string
    | number
    | boolean
    | {}
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNodeArray
    | React.ReactPortal
    | null
    | undefined;

export interface RULazyFormElement<Name extends string> {
    _t?: Name;
    _isLazyElement?: boolean;
}

export interface RULazyFormObjectAccessElement<T, Name extends string>
    extends RULazyFormElement<Name> {
    _isLazyObject?: true;
    d: keyof T;
}

export interface RULazyInterceptor<BaseProps, Extra, K = {}> {
    t: string;
    Component: React.FC<
        { props: BaseProps; formProps: FormPassDownProps<Extra> } & K
    >;
}

export type RULazyInterceptorObjectAccess<BaseProps, Extra, SetT> =
    RULazyInterceptor<BaseProps, Extra, { data: any; setData: SetT }>;

export interface FormPassDownProps<Extra> {
    hidden?: boolean;
    extra: Extra;
}

export interface FormProps<T, SetT, Extra>
    extends FormPassDownProps<Extra>,
        RULazyFormElement<'form'> {
    obj: T;
    setObj: SetT;

    children?: AllPossible;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;

    className?: string;
    formRef?: (e: HTMLFormElement | null) => void;
}

export function FormBuilder<Extra, SetT, T>(
    formElements: RULazyInterceptor<unknown, Extra>[]
) {
    interface ProcessChildren<T, SetT, Extra> extends FormPassDownProps<Extra> {
        obj?: T;
        setObj: SetT;
    }

    const { Element: Div } = FormElementBuilder('div', () => null);

    interface DivProps {
        className: string;
        children: AllPossible;
    }

    const DivInterceptor: RULazyInterceptor<
        DivProps,
        Extra,
        {
            setObj: SetT;
            obj: T;
        }
    > = {
        t: 'div',
        Component: ({ props, formProps, setObj, obj }) => {
            return (
                <div className={props.className}>
                    {React.Children.map(props.children, e =>
                        processChildren(e, { ...formProps, setObj, obj })
                    )}
                </div>
            );
        },
    };

    const processChildren = (
        a: AllPossible,
        props: ProcessChildren<T, SetT, Extra>
    ): AllPossible => {
        let { setObj, obj = {} as T } = props;

        if (
            !a ||
            (
                a as React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                >
            ).props === undefined
        )
            return a;

        let ai = a as React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
        >;

        if (ai.props._isLazyElement) {
            if (ai.props._t === 'div') {
                return (
                    <DivInterceptor.Component
                        extra={props.extra}
                        setObj={setObj}
                        obj={obj}
                        {...ai.props}
                    />
                );
            }
            for (let formElement of formElements) {
                if (formElement.t === ai.props._t) {
                    let Comp = formElement.Component;
                    let d = {
                        hidden: props.hidden,
                        extra: props.extra,
                    };
                    if (ai.props._isLazyObject) {
                        return (
                            <Comp
                                {...ai.props}
                                {...d}
                                data={obj[ai.props.d]}
                                setData={setObj}
                            />
                        );
                    } else {
                        return <Comp {...ai.props} {...d} />;
                    }
                }
            }
        }

        return ai;
    };

    const Form: React.FC<FormProps<T, SetT, Extra>> = props => {
        let { onSubmit, children, hidden } = props;

        if (hidden) return null;

        return (
            <form
                style={{ width: '100%', height: '100%' }}
                onSubmit={onSubmit}
                ref={e => (props.formRef ?? (() => {}))(e)}
            >
                {React.Children.map(children, e => processChildren(e, props))}
            </form>
        );
    };
    Form.defaultProps = {
        _t: 'form',
    };

    return { Form, Div };
}

export function FormElementBuilder<Props, Extra, Name extends string>(
    name: Name,
    FC: React.FC<{ props: Props; formProps: FormPassDownProps<Extra> }>
) {
    let Element: React.FC<Props & RULazyFormElement<Name>> = () => null;
    //TODO: There is probably a better way of doing this
    (Element as any).defaultProps = {
        _isLazyElement: true,
        _t: name,
    };

    let Interceptor: RULazyInterceptor<Props, Extra, {}> = {
        Component: FC,
        t: name,
    };

    return { Element, Interceptor };
}

export function FormElementDataBuilder<
    Props,
    T,
    Extra,
    SetT,
    Name extends string
>(
    name: Name,
    FC: React.FC<
        { props: Props; formProps: FormPassDownProps<Extra> } & {
            data: any;
            setData: SetT;
        }
    >
) {
    let Element: React.FC<RULazyFormObjectAccessElement<T, Name> & Props> =
        () => null;
    //TODO: There is probably a better way of doing this
    (Element.defaultProps as any) = {
        _isLazyElement: true,
        _isLazyObject: true,
        _t: name,
    };

    let Interceptor: RULazyInterceptorObjectAccess<Props, Extra, SetT> = {
        Component: FC,
        t: name,
    };

    return { Element, Interceptor };
}

export type StringIndexed = Record<string, any>;

/**
 *
 *
 * Old
 *
 *
 */

interface useDataObjectExtra {
    regex?: string | RegExp;
    replace?: { filter: string | RegExp; value: string };
    switch?: boolean;
    checkBox?: boolean;
    multiple?: boolean;
    editor?: boolean;
    date?: boolean;
    id?: string;
    withTime?: boolean;
}
export function useDataObject<T extends StringIndexed>(initial: T) {
    let [obj, setObjState] = useState(initial);
    let clear = () => {
        setObjState(initial);
    };
    let setObj = (e: any, extra?: useDataObjectExtra) => {
        if (e.preventDefault) e.preventDefault();
        let target = e?.target;
        let value = (target?.value ?? '') + '';
        let id: string = target?.id ?? '';
        if (extra?.editor) {
            id = extra?.id ?? '';
            value = e.htmlValue;
        }
        if (!id) return;
        let toSet: StringIndexed = obj;
        if (extra?.checkBox) {
            toSet[id] = toSet[id] === 1 ? 0 : 1;
            setObjState({ ...toSet } as T);
            return;
        } else if (extra?.switch) {
            //Value was forced to be a string
            toSet[id] = value === 'true' ? 1 : 0;
            setObjState({ ...toSet } as T);
            return;
        } else if (extra?.multiple) {
            value = e.value;
            toSet[id] = value;
            setObjState({ ...toSet } as T);
            return;
        } else if (extra?.date) {
            value = formatDate(value, extra.withTime);
        }

        if (extra?.replace)
            value = value.replace(extra.replace.filter, extra.replace.value);
        if (
            extra?.regex &&
            (value.match(extra.regex) === null ||
                (value.match(extra.regex) ?? [])[0] !== value)
        )
            return;
        toSet[id] = value;
        setObjState({ ...toSet } as T);
    };

    return { obj, setObj, clear, setObjState };
}
