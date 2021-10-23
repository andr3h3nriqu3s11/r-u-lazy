import React, { MouseEvent, ReactElement, useState } from 'react';
import { DateInputProps } from './builder/DateInput';
import { DropdownProps } from './builder/Dropdown';
import { EditorProps } from './builder/Editor';
import { InputProps } from './builder/Input';
import { InputMaskProps } from './builder/InputMask';
import { InputNumberProps } from './builder/InputNumber';
import { SwitchProps } from './builder/InputSwitch';
import { TextAreaProps } from './builder/TextArea';
import { WraperProps } from './builder/Wraper';
import { formatDate, StateIcon, StringEmpty, treatDate } from './index';
import { LabelSelector, StateItems } from './types';

export type StringIndexed = Record<string, any>;

export interface FormProps<T extends StringIndexed = any> {
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    children?: ReactElement<any, any>[] | ReactElement | null;
    t?: string;
    obj?: T;
    setObj?: (e: any, extra: useDataObjectExtra) => void;
    disabled?: boolean;
    fclass?: string;
    lclass?: string;
    req?: boolean;
    group?: boolean;
    class?: string;
    formRef?: (e: HTMLFormElement | null) => void;
}

export interface FormConfig {
    locale: string;
    currency: string;
}
interface HtmlElmProps<T> {
    Wraper: React.FC<WraperProps>;
    InputMask: React.FC<InputMaskProps>;
    Editor: React.FC<EditorProps>;
    Input: React.FC<InputProps>;
    DateInput: React.FC<DateInputProps>;
    TextArea: React.FC<TextAreaProps>;
    Dropdown: React.FC<DropdownProps<T>>;
    InputSwitch: React.FC<SwitchProps>;
    InputNumber: React.FC<InputNumberProps>;
    Messages?: React.LazyExoticComponent<React.ComponentType>;
}

//Function that processes the form children
export const processChildren = <T extends StringIndexed>(
    ls: LabelSelector,
    config: FormConfig,
    ai: ReactElement,
    props: FormProps<T>,
    hemlProps: HtmlElmProps<T>
): ReactElement => {
    let {
        Input,
        Wraper,
        InputMask,
        InputSwitch,
        DateInput,
        TextArea,
        Dropdown,
        Editor,
        InputNumber,
        Messages,
    } = hemlProps;

    let obj: T = props.obj ?? ({} as T);
    let { setObj = () => {} } = props;
    if (ai.props && ai.props.isGenericFormElement) {
        let gen: ReactElement<GenericElementProps<T>> = ai as any;
        let t = gen.props.t ?? props.t ?? '';
        if (gen.props.isGenericInputFormElement) {
            let iGen: ReactElement<GenericInputElementProps<T>> = gen as any;

            let d = iGen.props.d as string;

            let value = obj[d];
            let label =
                ls(iGen.props.l ?? '') === 'LabelInfenranceFailed'
                    ? iGen.props.l ?? ls(String(iGen.props.d))
                    : ls(iGen.props.l ?? '');
            let onChange: (e: any, extra?: useDataObjectExtra) => void =
                iGen.props.onChange ??
                ((e: any, extra?: useDataObjectExtra) =>
                    setObj(e, { ...extra, ...(iGen.props.extra ?? {}) }));
            let disabled = iGen.props.disabled ?? props.disabled ?? false;
            let required = iGen.props.req ?? props.req ?? false;
            let inputClass = iGen.props.fClass ?? props.fclass ?? 'p-col';
            let labelClass = iGen.props.lClass ?? props.lclass ?? 'p-col-3';
            let hidden = iGen.props.h ?? false;
            let extra = iGen.props.extra ?? {};

            //Types
            if (t === 't') {
                let iGenI: ReactElement<GInputProps<T>> = iGen as any;
                let type = iGenI.props.type;
                let tooltip = iGenI.props.tooltip;

                return (
                    <Input
                        id={d}
                        disabled={disabled}
                        hidden={hidden}
                        required={required}
                        inputClass={inputClass}
                        labelClass={labelClass}
                        type={type}
                        tooltip={tooltip}
                        value={value}
                        label={label}
                        onChange={onChange}
                        gridless={props.group}
                    />
                );
            } else if (t === 'area') {
                let iGenI: ReactElement<GAreaProps<T>> = iGen as any;
                let tooltip = iGenI.props.tooltip;
                let style = iGenI.props.style;
                return (
                    <TextArea
                        id={d}
                        disabled={disabled}
                        hidden={hidden}
                        required={required}
                        inputClass={inputClass}
                        labelClass={labelClass}
                        tooltip={tooltip}
                        value={value}
                        label={label}
                        onChange={onChange}
                        gridless={props.group}
                        style={style}
                    />
                );
            } else if (t === 'editor') {
                let iGenI: ReactElement<GEditorProps<T>> = iGen as any;
                let style = iGenI.props.style;

                return (
                    <Editor
                        id={d}
                        disabled={disabled}
                        onChange={e =>
                            onChange(e, { id: d, editor: true, ...extra })
                        }
                        label={label}
                        gridless={props.group}
                        style={style}
                        hidden={hidden}
                        value={value}
                        fieldClass={inputClass}
                        labelClass={labelClass}
                    />
                );
            } else if (t === 'date') {
                let iGenI: ReactElement<GDateInputProps<T>> = iGen as any;
                let showTime = iGenI.props.showTime;
                let maxDate = iGenI.props.maxDate;
                let minDate = iGenI.props.minDate;
                let selectionMode = iGenI.props.selectionMode;
                let timeOnly = iGenI.props.timeOnly;
                return (
                    <DateInput
                        id={d}
                        showTime={showTime}
                        hidden={hidden}
                        disabled={disabled}
                        gridless={props.group}
                        inputClass={inputClass}
                        label={label}
                        labelClass={labelClass}
                        maxDate={maxDate}
                        minDate={minDate}
                        selectionMode={selectionMode}
                        timeOnly={timeOnly}
                        value={
                            selectionMode !== undefined
                                ? value
                                : new Date(value)
                        }
                        onChange={e =>
                            setObj(e, {
                                multiple: selectionMode !== undefined,
                                date: true,
                                withTime: showTime,
                            })
                        }
                    />
                );
            } else if (t === 'drop') {
                let iGenI: ReactElement<GDropdown<T>> = iGen as any;
                return (
                    <Dropdown
                        id={d}
                        onChange={e => setObj(e, extra)}
                        hidden={hidden}
                        disabled={disabled}
                        gridless={props.group}
                        fClass={inputClass}
                        label={label}
                        lClass={labelClass}
                        options={iGenI.props.options}
                        filter={iGenI.props.filter}
                        itemTemplate={iGenI.props.itemTemplate}
                        placeholder={iGenI.props.placeholder}
                        required={required}
                        showClear={iGenI.props.showClear}
                        value={String(value)}
                    />
                );
            } else if (t === 'mask') {
                let iGenI: ReactElement<GMaskProps<T>> = iGen as any;

                return (
                    <InputMask
                        id={d}
                        disabled={disabled}
                        required={required}
                        onChange={onChange}
                        autoClear={iGenI.props.autoClear ?? false}
                        fieldClass={inputClass}
                        gridless={props.group}
                        hidden={hidden}
                        label={label}
                        labelClass={labelClass}
                        mask={iGenI.props.mask}
                        placeholder={iGenI.props.placeholder}
                        style={iGenI.props.style}
                        tooltip={iGenI.props.tooltip}
                        unmask={iGenI.props.unmask ?? true}
                        value={value}
                    />
                );
            } else if (t === 'number') {
                let iGenI: ReactElement<GNumberProps<T>> = iGen as any;

                let propsF: GNumberProps<T> = iGenI.props;

                let currency: string | undefined = undefined;
                let minFractionDigits = propsF.minFractionDigits;
                let locale: string | undefined = undefined;

                if (typeof propsF.locale === 'boolean') {
                    if (propsF.locale) {
                        locale = config.locale;
                    }
                } else {
                    locale = propsF.locale as string;
                }

                if (typeof propsF.currency === 'boolean') {
                    if (propsF.currency) {
                        currency = config.currency;
                        //minFractionDigits = minFractionDigits ?? 2;
                        locale = locale ?? config.locale;
                    }
                } else {
                    currency = propsF.currency as string;
                }

                return (
                    <InputNumber
                        id={d}
                        currency={currency}
                        disabled={disabled}
                        gridless={props.group}
                        inputClass={inputClass}
                        labelClass={labelClass}
                        hidden={hidden}
                        label={label}
                        maxFractionDigits={propsF.maxFractionDigits}
                        minFractionDigits={minFractionDigits}
                        mode={StringEmpty(currency) ? 'decimal' : 'currency'}
                        prefix={propsF.prefix}
                        suffix={propsF.suffix}
                        onChange={onChange}
                        required={required}
                        tooltip={propsF.tooltip}
                        type={propsF.type}
                        value={value}
                        locale={locale}
                    />
                );
            } else if (t === 'switch') {
                let iGenI: ReactElement<GSwitchProps<T>> = iGen as any;
                let propsF: GSwitchProps<T> = iGenI.props;
                return (
                    <InputSwitch
                        id={d}
                        checked={String(value) === '1' ? true : false}
                        tooltip={propsF.tooltip}
                        disabled={disabled}
                        fClass={inputClass}
                        lClass={labelClass}
                        gridless={props.group}
                        hidden={hidden}
                        label={label}
                        onChange={e => onChange(e, { ...extra, switch: true })}
                    />
                );
            }
        } else if (gen.props.t === 'state') {
            let sGen: ReactElement<GStateProps<T>> = gen as any;

            let d = sGen.props.d as string;

            let label =
                ls(sGen.props.l ?? '') === 'LabelInfenranceFailed'
                    ? sGen.props.l ?? ls(String(sGen.props.d))
                    : ls(sGen.props.l ?? '');
            label =
                label === 'LabelInfenranceFailed'
                    ? ls('status', 'generic')
                    : label;

            let value = obj[d];
            let small = sGen.props.small;
            let stateItems = sGen.props.custom;
            let onClick = sGen.props.onClick;
            let style = sGen.props.style;
            let lClass = sGen.props.lClass ?? props.lclass ?? 'p-col-3';

            return (
                <Wraper
                    id={d}
                    label={label}
                    hidden={sGen.props.h}
                    class={lClass}
                    gridless={props.group}
                >
                    <div className={sGen.props.fClass}>
                        <StateIcon
                            custom={stateItems}
                            state={value}
                            small={small}
                            onClick={onClick}
                            style={style}
                        />
                    </div>
                </Wraper>
            );
        } else if (gen.props.t === 'v') {
            let vGen: ReactElement<GViewProps<T>> = gen as any;
            let d = vGen.props.d as string;
            let value = obj[d];
            let isDate = value
                ? String(value).match(/^[\d-]{10}T[\d:]{8}.*/)
                : false;
            let valueO = isDate
                ? treatDate({
                      date: value,
                      extended: vGen.props.extended,
                      returnString: true,
                  })
                : value;
            let label =
                ls(vGen.props.l ?? '') === 'LabelInfenranceFailed'
                    ? vGen.props.l ?? ls(String(vGen.props.d))
                    : ls(vGen.props.l ?? '');
            let inputClass = vGen.props.fClass ?? props.fclass ?? 'p-col';
            let labelClass = vGen.props.lClass ?? props.lclass ?? 'p-col-3';

            return (
                <Wraper
                    id={d}
                    label={label}
                    hidden={vGen.props.h}
                    class={labelClass}
                    gridless={props.group}
                >
                    <div className={inputClass}>{valueO}</div>
                </Wraper>
            );
        } else if (gen.props.t === 'div') {
            let dGen: ReactElement<GDivProps<T>> = gen as any;

            if (dGen.props.hidden) return <></>;

            let className = dGen.props.class;

            let nProps = { ...props, ...dGen.props.extra };
            if (dGen.props.group !== undefined)
                nProps = { ...nProps, group: dGen.props.group };

            let pChildren = dGen.props.children
                ? Array.isArray(dGen.props.children)
                    ? React.Children.map(dGen.props.children, e =>
                          processChildren(ls, config, e, nProps, hemlProps)
                      )
                    : processChildren(
                          ls,
                          config,
                          dGen.props.children,
                          nProps,
                          hemlProps
                      )
                : null;

            if (dGen.props.group && className === GDivDefaultPropValues.class) {
                className = '';
            }

            return (
                <div
                    className={
                        (dGen.props.grid ? 'p-grid p-fluid ' : '') + className
                    }
                    style={dGen.props.style}
                >
                    {pChildren}
                </div>
            );
        } else if (gen.props.t === 'messages') {
            if (!Messages) {
                throw 'Needed Messages to use GMessages check FormBuilder or BuildAll';
            }
            //TODO: improve this
            let dGen: ReactElement<GMessagesProps<any, T>> = gen as any;

            return (
                <div className="p-col-12">
                    <Messages ref={dGen.props.refM} />
                </div>
            );
        }
        return <></>;
    } else {
        return ai;
    }
};

export function FormBuilder<K>(
    ls: LabelSelector,
    config: FormConfig,
    hemlProps: HtmlElmProps<K>
) {
    const Form: React.FC<FormProps<K>> = (props: FormProps<K>) => {
        let { onSubmit, children } = props;

        let pChildren: ReactElement[] | ReactElement = [];

        if (children) {
            if (Array.isArray(pChildren))
                pChildren = React.Children.map(children, e =>
                    processChildren(ls, config, e, props, hemlProps)
                );
            else
                pChildren = processChildren(
                    ls,
                    config,
                    children as ReactElement,
                    props,
                    hemlProps
                );
        }

        if (props.class) {
            return (
                <form
                    style={{ width: '100%', height: '100%' }}
                    onSubmit={onSubmit}
                    ref={e => (props.formRef ?? (() => {}))(e)}
                >
                    <div className={props.class ?? ''}>{pChildren}</div>
                </form>
            );
        }

        return (
            <form
                style={{ width: '100%', height: '100%' }}
                onSubmit={onSubmit}
                ref={e => (props.formRef ?? (() => {}))(e)}
            >
                {pChildren}
            </form>
        );
    };
    Form.defaultProps = {
        t: 't',
    };

    return Form;
}

export interface GenericElementProps<_ extends StringIndexed = any> {
    isGenericFormElement?: boolean;
    isGenericInputFormElement?: boolean;
    //Type
    t?: string;
}
export const GenericElement: React.FC<GenericElementProps> = () => null;
GenericElement.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: false,
};

export const G = GenericElement;

//Div
export interface GDivProps<T = any> extends GenericElementProps<T> {
    class?: string;
    style?: React.CSSProperties;
    children?: ReactElement[] | ReactElement | null;
    overload?: FormProps<T>;
    hidden?: boolean;
    grid?: boolean;
    extra?: FormProps;
    group?: boolean;
}

const GDivDefaultPropValues = {
    isGenericFormElement: true,
    isGenericInputFormElement: false,
    t: 'div',
    class: 'p-col',
    children: null,
};

export const GDivBuilder = (
    ls: LabelSelector,
    config: FormConfig,
    hemlProps: HtmlElmProps<unknown>
) => {
    const GDiv: React.FC<GDivProps> = props => {
        let { children } = props;
        let pChildren: ReactElement[] | ReactElement | null | undefined = [];

        if (children) {
            if (Array.isArray(pChildren))
                pChildren = React.Children.map(children, (e: ReactElement) =>
                    processChildren(ls, config, e, props, hemlProps)
                );
            else
                pChildren = processChildren(
                    ls,
                    config,
                    children as ReactElement,
                    props,
                    hemlProps
                );
        }

        return (
            <div
                className={(props.grid ? 'p-grid' : '') + props.class}
                style={props.style}
                hidden={props.hidden}
            >
                {pChildren}
            </div>
        );
    };
    GDiv.defaultProps = GDivDefaultPropValues;
    return GDiv;
};

//Others
interface GViewProps<T extends StringIndexed = StringIndexed>
    extends GenericElementProps<T> {
    t?: 'v';
    d: keyof T;
    l?: string;
    //inputClass = fclass
    fClass?: string;
    //labelClass = lClass
    lClass?: string;
    h?: boolean;
    extended?: boolean;
}
export const GView: React.FC<GViewProps> = (_props: GViewProps) => null;
GView.defaultProps = {
    isGenericFormElement: true,
    t: 'v',
};

interface GStateProps<T extends StringIndexed = StringIndexed>
    extends GenericElementProps<T> {
    t?: 'state';
    d: keyof T;
    l?: string;
    //inputClass = fclass
    fClass?: string;
    //labelClass = lClass
    lClass?: string;
    h?: boolean;

    custom: StateItems;
    small?: boolean;
    onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
    style?: React.CSSProperties;
}
export const GState: React.FC<GStateProps> = (_props: GStateProps) => null;
GState.defaultProps = {
    isGenericFormElement: true,
    t: 'state',
};

interface GMessagesProps<
    K extends unknown,
    T extends StringIndexed = StringIndexed
> extends GenericElementProps<T> {
    t?: 'messages';
    refM?: React.MutableRefObject<K | null>;
}
export const GMessages: React.FC<GMessagesProps<unknown>> = () => null;
GMessages.defaultProps = {
    isGenericFormElement: true,
    t: 'messages',
};

//Generic Inputs
interface GenericInputElementProps<T extends StringIndexed = StringIndexed>
    extends GenericElementProps<T> {
    //Data
    d: keyof T;
    //Auto default auto form label selector with d as input
    l?: string;
    //OnChange
    onChange?: (e: any) => void;
    //Extra
    extra?: useDataObjectExtra;

    req?: boolean;
    disabled?: boolean;
    //inputClass = fclass
    fClass?: string;
    //labelClass = lClass
    lClass?: string;
    //hidden = h
    h?: boolean;
}
export const GenericInputElement: React.FC<GenericInputElementProps> = () =>
    null;
GenericInputElement.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
};

interface GInputProps<T = StringIndexed> extends GenericInputElementProps<T> {
    t?: 't';
    //id: string; = d
    //label: string; = l;
    //required = req
    //labelClass = lClass
    //inputClass = fclass
    //Auto default auto form label selector with d as input
    //onChange = onChange
    //Default auto from obj
    value?: string;
    type?: string;
    tooltip?: string;
}
export const GInput: React.FC<GInputProps> = () => null;
GInput.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 't',
};

interface GMaskProps<T extends StringIndexed = StringIndexed>
    extends GenericInputElementProps<T> {
    t?: 'mask';
    //id: string; d
    //label?: string; l
    //labelClass?: string; lClass
    //hidden?: boolean; h
    //disabled?: boolean;
    //fieldClass?: string; fClass
    placeholder?: string;
    tooltip?: string;
    //value?: any; auto
    //onChange: (e: any) => void;
    //required?: boolean; req
    mask?: string;
    style?: React.CSSProperties;
    //gridless?: boolean;
    autoClear?: boolean;
    unmask?: boolean;
}
export const GMask: React.FC<GMaskProps> = () => null;
GMask.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'mask',
};

interface GAreaProps<T extends StringIndexed = StringIndexed>
    extends GenericInputElementProps<T> {
    t?: 'area';
    //id: string;
    //label?: string;
    //required = req
    //labelClass = lClass
    //inputClass = fclass
    //Default auto from obj
    value?: string;
    style?: React.CSSProperties;
    tooltip?: string;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}
export const GArea: React.FC<GAreaProps> = () => null;
GArea.defaultProps = {
    isGenericFormElement: true,
};

interface GEditorProps<T = StringIndexed> extends GenericInputElementProps<T> {
    t?: 'editor';

    style?: React.CSSProperties;
}
export const GEditor: React.FC<GEditorProps> = () => null;
GEditor.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'editor',
};

interface GDateInputProps<T extends StringIndexed = StringIndexed>
    extends GenericInputElementProps<T> {
    t?: 'date';

    selectionMode?: any;
    showTime?: boolean;
    timeOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    value?: Date;

    onChange?: (e: {
        originalEvent: Event;
        value: Date | Date[];
        target: {
            name: string;
            id: string;
            value: Date | Date[];
        };
    }) => void;
}
export const GDateInput: React.FC<GDateInputProps> = () => null;
GDateInput.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'date',
};

export interface GDropdown<T extends StringIndexed = StringIndexed>
    extends GenericInputElementProps<T> {
    t?: 'drop';
    //id: string; d
    options: { value: string; label: string }[];
    //label?: string; l
    extra?: useDataObjectExtra;
    req?: boolean;
    disabled?: boolean;
    fClass?: string;
    lClass?: string;
    h?: boolean;
    itemTemplate?: (option: T) => React.ReactNode;
    filter?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: { name: string; id: string; value: any };
    }) => void;
    showClear?: boolean;
}
export const GDropdown: React.FC<GDropdown> = () => null;
GDropdown.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'drop',
};

export interface GSwitchProps<T extends StringIndexed = StringIndexed>
    extends GenericInputElementProps<T> {
    //id: string; d
    //label: string; l
    onChange?: (e: {
        originalEvent: Event;
        value: boolean;
        target: { name: string; id: string; value: boolean };
    }) => void;
    req?: false; //Underling commpent does not have the required tag
    //disabled?: boolean;
    //fClass?: string;
    //lClass?: string;
    //hidden: boolean; h
    checked?: boolean;
    tooltip?: string;
}
export const GSwitch: React.FC<GSwitchProps> = () => null;
GSwitch.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'switch',
    req: false,
};

interface GNumberProps<T extends StringIndexed = StringIndexed>
    extends GenericInputElementProps<T> {
    t?: 'number';
    //id: string; d
    //value?: string;
    //label?: string;
    //disabled?: boolean;
    //hidden?: boolean; h
    //required?: boolean; req
    //inputClass?: string; fClass
    //labelClass?: string; lClass
    type?: string;
    tooltip?: string;
    //gridless?: boolean; auto
    suffix?: string;
    prefix?: string;
    currency?: string | boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    //mode?: 'decimal' | 'currency';
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
    locale?: string | boolean;
}
export const GNumber: React.FC<GNumberProps> = () => null;
GNumber.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'number',
};

export const GE = GenericInputElement;

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
