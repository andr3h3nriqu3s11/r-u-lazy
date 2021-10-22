import { Button as PButton } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown as PDropdown } from 'primereact/dropdown';
import { Editor as PEditor } from 'primereact/editor';
import { InputMask as PInputMask } from 'primereact/inputmask';
import { InputNumber as PInputNumber } from 'primereact/inputnumber';
import { InputSwitch as PInputSwitch } from 'primereact/inputswitch';
import { InputText as PInputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';
import React, { MouseEvent, ReactElement, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { GenericListResponse, pairT } from '../api-ts-bindings/Generic';
import { GenericListRequest } from '../api-ts-bindings/Requests';
import type { BasicListResponseData, LoggedUserData, StateItems } from '../types';
import { ButtonBuilder } from './builder/Button';
import type { BaseButtonProps } from './builder/Button';
import { g_displayMessageError, g_wraper, lb, lm, ls } from './GenericFunctions';
import { LabelSelector } from './types';

export * from './Form';

export function StringEmpty(s: string | null | undefined): boolean {
    return s === null || s === undefined || s === '';
}

interface BuildAllProps {
    BaseButton: React.FC<BaseButtonProps>
}

export function BuildAll(ls: LabelSelector,{
    BaseButton
}: BuildAllProps) {

    let Button = null;

    if (BaseButton) {
        Button = ButtonBuilder(BaseButton, ls);
    }

    return {
        Button
    };
}

//TODO: This needs to be refactored so that does not have any dependency on an icons packs
export function StateIcon(props: { custom: StateItems; state: number; style?: React.CSSProperties; small?: boolean; onClick?: (e: MouseEvent<HTMLSpanElement>) => void }) {
    let [tooltip, setTooltip] = useState(false),
        { custom, state, onClick } = props,
        style = { fontSize: props.small ? '1.4em' : '1.87em', ...(props.style ?? {}) };

    if (custom && custom[state]) {
        let icon = custom[state];
        style = { ...style, color: icon.color ?? 'black', ...(onClick ? { cursor: 'pointer' } : {}) };
        return (
            <span onMouseOver={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
                <div
                    style={{
                        display: tooltip && icon.tooltip ? 'block' : '',
                        marginTop: '0.5em',
                        backgroundColor: '#222d',
                        color: '#fff',
                        maxWidth: '5em',
                    }}
                    className="p-tooltip"
                >
                    {icon.tooltip}
                </div>
                <span onClick={onClick} className={'pi ' + icon.class} style={style}>
                    {icon.text ?? ''}
                </span>
            </span>
        );
    }
    return <span onClick={onClick} className="pi pi-question" style={{ color: 'grey', fontSize: '1.83em' }} />;
}


export function Editor(props: {
    id: string;
    disabled?: boolean;
    label?: string;
    style?: React.CSSProperties;
    fieldClass?: string;
    value?: string;
    labelClass?: string;
    gridless?: boolean;
    hidden?: boolean;
    onChange?: (e: { htmlValue: string | null; textValue: string; delta: any; source: string }) => void;
}) {
    let { disabled, id, label, style, fieldClass, value, labelClass, gridless, onChange, hidden } = props;
    if (hidden) return null;
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    if (disabled)
        return g_wraper(
            id,
            label,
            <div style={{ border: '1px solid grey', marginBottom: '3px', ...style }} className={fieldClass} dangerouslySetInnerHTML={{ __html: value ?? '' }} />,
            false,
            labelClass,
            gridless
        );
    return g_wraper(
        id,
        label,
        <div className={fieldClass}>
            <PEditor value={value} id={id} style={style ?? { minHeight: '7em' }} onTextChange={e => (onChange ?? (() => {}))(e)} />
        </div>,
        false,
        labelClass,
        gridless
    );
}
export function Input(props: {
    id: string;
    value?: string;
    label?: string;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
    inputClass?: string;
    labelClass?: string;
    type?: string;
    tooltip?: string;
    gridless?: boolean;
    onChange?: (e: any) => void;
}) {
    let { hidden, id, required, label, labelClass = 'p-col-3', inputClass = 'p-col-7', disabled, tooltip, type, value, onChange, gridless } = props;
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    return g_wraper(
        id,
        label,
        <div className={inputClass}>
            <PInputText
                title={disabled !== undefined && !disabled ? 'Por favor preencha este campo.' : ''}
                tooltip={tooltip}
                type={type}
                value={value}
                onChange={!disabled && onChange ? onChange : () => {}}
                id={id}
                disabled={disabled}
                required={required}
            />
        </div>,
        hidden,
        labelClass,
        gridless
    );
}
export function DateInput({
    selectionMode,
    inputClass,
    labelClass,
    label,
    id,
    hidden,
    gridless,
    showTime,
    timeOnly,
    minDate,
    maxDate,
    value,
    disabled,
    onChange,
}: {
    selectionMode?: any;
    inputClass?: string;
    label?: string;
    id: string;
    labelClass?: string;
    hidden?: boolean;
    gridless?: boolean;
    showTime?: boolean;
    timeOnly?: boolean;
    minDate?: Date;
    maxDate?: Date;
    value?: Date;
    disabled?: boolean;
    onChange?: (e: {
        originalEvent: Event;
        value: Date | Date[];
        target: {
            name: string;
            id: string;
            value: Date | Date[];
        };
    }) => void;
}) {
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    return g_wraper(
        id,
        label,
        <div className={inputClass}>
            <Calendar
                selectionMode={selectionMode}
                hourFormat={ls('hourFomart', 'default')}
                showTime={showTime}
                timeOnly={timeOnly}
                minDate={minDate}
                maxDate={maxDate}
                yearRange={`1900:${new Date().getFullYear() + 10}`}
                monthNavigator={true}
                yearNavigator={true}
                id={id}
                dateFormat="dd-mm-yy"
                value={value}
                onChange={event => (onChange ?? (() => {}))(event)}
                disabled={disabled}
            />
        </div>,
        hidden,
        labelClass,
        gridless
    );
}
export function InputNumber(props: {
    id: string;
    value?: string;
    label?: string;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
    inputClass?: string;
    labelClass?: string;
    type?: string;
    tooltip?: string;
    gridless?: boolean;
    suffix?: string;
    suffixOutside?: boolean;
    prefix?: string;
    currency?: string;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    mode?: 'decimal' | 'currency';
    locale?: string;
    onChange?: (e: {
        originalEvent: Event;
        value: any;
        target: {
            name: string;
            id: string;
            value: any;
        };
    }) => void;
}) {
    let {
        hidden,
        id,
        required,
        label,
        labelClass = 'p-col-3',
        inputClass = 'p-col-7',
        disabled,
        tooltip,
        type,
        value,
        onChange,
        gridless,
        suffix,
        suffixOutside,
        prefix,
        mode,
        currency,
        minFractionDigits,
        maxFractionDigits,
        locale,
    } = props;
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    let valueN: number | undefined = Number(value);
    if (isNaN(valueN)) valueN = undefined;
    return g_wraper(
        id,
        label,
        <div className={(suffixOutside ? 'p-grid ' : '') + inputClass}>
            {(() => {
                let a = (
                    <PInputNumber
                        tooltip={tooltip}
                        type={type}
                        value={valueN}
                        onChange={!disabled && onChange ? onChange : () => {}}
                        id={id}
                        disabled={disabled}
                        required={required}
                        suffix={suffixOutside ? '' : suffix}
                        prefix={prefix}
                        mode={mode}
                        currency={currency}
                        minFractionDigits={minFractionDigits}
                        maxFractionDigits={maxFractionDigits}
                        locale={locale}
                    />
                );
                if (suffixOutside)
                    return (
                        <>
                            <div className="p-col">{a}</div>
                            <div className="p-col-1">{suffix ?? ''}</div>
                        </>
                    );
                return a;
            })()}
        </div>,
        hidden,
        labelClass,
        gridless
    );
}

interface DialogPromtProps {
    hidden?: boolean;
    yesbtt?: { label?: string; class?: string; icon?: string };
    nobtt?: { label?: string; class?: string; icon?: string };
    onConfirm?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDeny?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    wraperClass?: string;
    label?: string;
    icon?: string;
    bttClass?: string;
    disabled?: boolean;
    id?: string;
    text?: string;
}
export const DialogPromt: React.FC<DialogPromtProps> = ({ hidden, yesbtt, onConfirm, nobtt, onDeny, wraperClass, label, icon, bttClass, disabled, text: textIn, id }) => {
    let [visible, setVisible] = useState(false);
    if (hidden) return null;
    //TODO: deal with this `null as any`
    let text = ls(textIn, 'dialog', null as any) ?? textIn;
    let footer = (
        <div>
            <Button
                label={yesbtt?.label ?? 'yes'}
                bttClass={yesbtt?.class ?? 'p-button-success'}
                icon={yesbtt?.icon}
                wraperClass=""
                onClick={e => {
                    e.preventDefault();
                    setVisible(false);
                    if (onConfirm) onConfirm(e);
                }}
            />
            <Button
                label={nobtt?.label ?? 'no'}
                wraperClass=""
                bttClass={nobtt?.class ?? 'p-button-danger'}
                icon={nobtt?.icon}
                onClick={e => {
                    e.preventDefault();
                    setVisible(false);
                    if (onDeny) onDeny(e);
                }}
            />
        </div>
    );
    return (
        <div className={wraperClass}>
            <Button
                label={label}
                icon={icon}
                wraperClass=""
                bttClass={bttClass}
                onClick={e => {
                    e.preventDefault();
                    if (disabled) return;
                    setVisible(true);
                }}
                type="button"
                disabled={disabled}
            />
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                footer={footer}
                style={{ width: '50vw' }}
                id={id}
                header={lb(label) === 'LabelInfenranceFailed' ? label : lb(label)}
            >
                {text}
            </Dialog>
        </div>
    );
};

interface WraperProps {
    hidden?: boolean;
    label?: string;
    children: ReactElement[] | ReactElement | Element;
    id?: string;
    class?: string;
    gridless?: boolean;
    reversed?: boolean;
}
export const Wraper: React.FC<WraperProps> = ({ hidden, label, children, id, class: className, gridless, reversed }: WraperProps) => {
    if (hidden) return <></>;
    if ((StringEmpty(label) && StringEmpty(id)) || label === '') return <>{children}</>;
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    let labelbody = (
        <div key={`${id}divlable`} className={className}>
            <label htmlFor={id}>{label}</label>
        </div>
    );
    if (!id)
        labelbody = (
            <div key={`${id}divlabel`} className={className}>
                {label}
            </div>
        );
    if (gridless && reversed) return <>{[children, labelbody]}</>;
    if (gridless) return <>{[labelbody, children]}</>;
    if (reversed)
        return (
            <div key={`${id}div`} className="p-grid">
                {labelbody} {children}
            </div>
        );
    return (
        <div key={`${id}div${label}`} className="p-grid">
            {' '}
            {labelbody} {children}{' '}
        </div>
    );
};
interface TextAreaProps {
    id: string;
    label?: string;
    labelClass?: string;
    inputClass?: string;
    hidden?: boolean;
    gridless?: boolean;
    style?: React.CSSProperties;
    tooltip?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}
export const TextArea: React.FC<TextAreaProps> = ({
    id,
    label,
    labelClass,
    hidden,
    gridless,
    inputClass,
    style,
    tooltip,
    value,
    disabled,
    required,
    onChange = () => {},
}: TextAreaProps) => {
    label = label ?? id;
    label = ls(label) === 'LabelInfenranceFailed' ? label : ls(label);
    return g_wraper(
        id,
        label,
        <div className={inputClass}>
            <InputTextarea
                style={style}
                tooltip={tooltip}
                value={value}
                onChange={e => (disabled ? () => {} : onChange(e))}
                title={'Por favor preencha este campo'}
                id={id}
                disabled={disabled}
                required={required}
            />
        </div>,
        hidden,
        labelClass,
        gridless
    );
};

interface DropdownProps<T> {
    id: string;
    options: { value: string; label: string }[];
    label?: string;
    lClass?: string;
    hidden?: boolean;
    itemTemplate?: (option: T) => React.ReactNode;
    filter?: boolean;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange: (e: { originalEvent: Event; value: any; target: { name: string; id: string; value: any } }) => void;
    required?: boolean;
    showClear?: boolean;
    fClass?: string;
    gridless?: boolean;
}
export const Dropdown = function <T>({
    label,
    id,
    lClass,
    hidden,
    itemTemplate,
    filter,
    options,
    placeholder,
    value,
    disabled,
    onChange,
    required,
    showClear,
    fClass,
    gridless,
}: DropdownProps<T>) {
    return (
        <Wraper label={label} id={id} class={lClass} hidden={hidden} gridless={gridless}>
            <div className={fClass}>
                <PDropdown
                    key={`${id}drop`}
                    itemTemplate={itemTemplate}
                    filter={filter}
                    filterBy="label, value"
                    options={options}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => (disabled ? () => {} : onChange(e))}
                    disabled={disabled}
                    id={id}
                    required={required}
                    showClear={showClear}
                />
            </div>
        </Wraper>
    );
};

interface SwitchProps<T> {
    id: string;
    checked?: boolean;
    disabled?: boolean;
    tooltip?: string;

    fClass?: string;
    label?: string;
    lClass?: string;
    hidden?: boolean;
    gridless?: boolean;

    onChange?: (e: { originalEvent: Event; value: boolean; target: { name: string; id: string; value: boolean } }) => void;
}
export const InputSwitch = function <T>({ id, checked, disabled, tooltip, onChange, fClass, label, lClass, hidden, gridless }: SwitchProps<T>) {
    return (
        <Wraper label={label} id={id} class={lClass} hidden={hidden} gridless={gridless}>
            <div className={fClass}>
                <PInputSwitch id={id} checked={checked} disabled={disabled} tooltip={tooltip} onChange={onChange} />
            </div>
        </Wraper>
    );
};

interface TreatDateProps {
    date: string,
    extended?: boolean,
    table?: boolean,
    returnString?: boolean
}
export const TreatDate({date, extended = true, table = false, returnString = false}: TreatDateProps) {
    if (!date || !date.match(/^[\d-]{10}T[\d:]{8}.*/)) return <span></span>;
    let matched = date.match(/^(\d{4})-(\d{2})-(\d{2})T([\d:]{8}).*/);
    let formated = matched[3] + '-' + matched[2] + '-' + matched[1] + (extended ? ' ' + matched[4] : ''); //dateformat(date, 'dd-mm-yyyy' + (extended ? ' HH:MM:ss': ''))
    return returnString ? (
        date ? (
            formated
        ) : (
            ''
        )
    ) : !table ? (
        <span style={{ verticalAlign: 'center', paddingTop: '.5em', paddingBottom: '.5m' }}>{date ? formated : ''}</span>
    ) : (
        <p style={{ margin: '0px', textAlign: 'right' }}>{date ? formated : ''}</p>
    );
}

/**
 * @function treats dates to the some of the iso formats without any timezone information
 * @returns the treated date
 */
export function formatDate(date: string | Date, widthTime = false, end = false) {
    if (!date) return '';
    let d = new Date(date);
    if (end) return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T23:59:59.000`;
    if (!widthTime) return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T00:00:00.000`;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
    ).padStart(2, '0')}:00.000`;
}