import React, { useState } from 'react';
import { formatDate } from './index';

export type UnknownFunction<T, A> = (...args: A[]) => T;

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
        { props: BaseProps; formProps?: FormPassDownProps<Extra> } & K
    >;
}

export type RULazyInterceptorObjectAccess<BaseProps, Extra, SetT> =
    RULazyInterceptor<BaseProps, Extra, { data: any; setData: SetT }>;

export interface FormPassDownProps<Extra> {
    hidden?: boolean;
    extra?: Extra;
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

export function FormBuilder<Extra, SetT>(
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

    const DivInterceptor = {
        t: 'div',
        Component: <T extends StringIndexed>({ props, formProps, setObj, obj }: { setObj: SetT, obj: T, props: DivProps, formProps: Extra }) => {
            return (
                <div className={props.className}>
                    {React.Children.map(props.children, e =>
                        processChildren<T>(e, { ...formProps, setObj, obj })
                    )}
                </div>
            );
        },
    };

    const processChildren = <T extends StringIndexed>(
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

    const Form = <T extends StringIndexed>(props: FormProps<T, SetT, Extra>) => {
        let { onSubmit, children, hidden } = props;

        if (hidden) return null;

        return (
            <form
                style={{ width: '100%', height: '100%' }}
                onSubmit={onSubmit}
                ref={e => (props.formRef ?? (() => { }))(e)}
            >
                {React.Children.map(children, e => processChildren<T>(e, props))}
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
    FC: React.FC<{ props: Props; formProps?: FormPassDownProps<Extra> }>
) {
    let Element: React.FC<Props & RULazyFormElement<Name>> = (props: Props) => FC({ props: props, formProps: undefined });
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
    /*T,*/
    Extra,
    SetT,
    Name extends string
>(
    name: Name,
    FC: React.FC<
        {
            props: Props;
            formProps?: FormPassDownProps<Extra>;
            data: any;
            setData: SetT;
        }
    >
) {
    let Element =
        <T extends StringIndexed>(props: RULazyFormObjectAccessElement<T, Name> & Props & { data: any, setData: SetT }) => FC({ props: props, setData: props.setData, data: props.data });

    //TODO: There is probably a better way of doing this
    (Element as any).defaultProps = {
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

export interface useDataObjectExtra {
    setValue?: boolean;
    checkBox?: boolean;
    checkBoxNumber?: boolean;
    date?: boolean;
    dateStr?: boolean;
    withTime?: boolean;
    number?: boolean;
    replace?: { filter: string | RegExp; value: string };
    regex?: string | RegExp;
}

export type DefaultSetFunctionType = (
    data: { e: Event; newValue: any; id: string } & useDataObjectExtra
) => void;

// Todo: Documentation

export function useDataObject<T extends StringIndexed>(initial: T) {
    let [obj, setObjState] = useState(initial);
    let clear = () => {
        setObjState(initial);
    };
    let setObj: DefaultSetFunctionType = ({
        e,
        id,
        newValue,
        checkBox,
        checkBoxNumber,
        setValue,
        date,
        dateStr,
        withTime,
        replace,
        regex,
        number,
    }) => {
        if (e.preventDefault) e.preventDefault();
        let value = String(newValue ?? '');
        if (!id) return;

        let toSet: StringIndexed = obj;
        if (number) {
            toSet[id] = Number(value);
            setObjState({ ...toSet } as T);
            return;
        } else if (checkBox) {
            let checkBoxV = false;
            if (newValue) {
                checkBoxV = true;
            }
            if (checkBoxNumber) {
                toSet[id] = checkBoxV ? 1 : 0;
            } else {
                toSet[id] = checkBoxV;
            }
            setObjState({ ...toSet } as T);
            return;
        } else if (setValue) {
            toSet[id] = newValue;
            setObjState({ ...toSet } as T);
            return;
        } else if (date) {
            toSet[id] = new Date(newValue);
            setObjState({ ...toSet } as T);
        } else if (dateStr) {
            value = formatDate(value, withTime);
        }

        if (replace) value = value.replace(replace.filter, replace.value);
        if (
            regex &&
            (value.match(regex) === null ||
                (value.match(regex) ?? [])[0] !== value)
        )
            return;
        toSet[id] = value;
        setObjState({ ...toSet } as T);
    };

    return { obj, setObj, clear, setObjState };
}
