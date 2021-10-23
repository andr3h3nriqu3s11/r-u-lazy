var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { ButtonBuilder } from './builder/Button';
import { DateInputBuilder, } from './builder/DateInput';
import { DialogPromptBuilder, } from './builder/Dialog';
import { DropdownBuilder, } from './builder/Dropdown';
import { EditorBuilder } from './builder/Editor';
import { InputBuilder } from './builder/Input';
import { InputMaskBuilder, } from './builder/InputMask';
import { InputNumberBuilder, } from './builder/InputNumber';
import { InputSwitchBuilder, } from './builder/InputSwitch';
import { TextAreaBuilder, } from './builder/TextArea';
import { WraperBuilder } from './builder/Wraper';
import { FormBuilder, GDivBuilder } from './Form';
export function StringEmpty(s) {
    return s === null || s === undefined || s === '';
}
var DepThrowErrorBuilder = function (name, dep) {
    var DepThrow = function () {
        throw "You can not use " + name + " without " + dep + " check BuildAll";
    };
    return DepThrow;
};
export function BuildAll(ls, config, _a) {
    var BaseButton = _a.BaseButton, BaseInputMask = _a.BaseInputMask, BaseEditor = _a.BaseEditor, BaseInput = _a.BaseInput, BaseDateInput = _a.BaseDateInput, Dialog = _a.Dialog, BaseTextArea = _a.BaseTextArea, BaseDropdown = _a.BaseDropdown, BaseInputSwitch = _a.BaseInputSwitch, BaseInputNumber = _a.BaseInputNumber, Messages = _a.Messages;
    var Wraper = WraperBuilder(ls);
    var Button;
    var InputMask;
    var Editor;
    var Input;
    var DateInput;
    var DialogPrompt;
    var TextArea;
    var Dropdown;
    var InputSwitch;
    var InputNumber;
    if (BaseButton) {
        Button = ButtonBuilder(BaseButton, ls);
    }
    else {
        Button = DepThrowErrorBuilder('Button', 'BaseButton');
    }
    if (BaseInputMask) {
        InputMask = InputMaskBuilder(BaseInputMask, Wraper, ls);
    }
    else {
        InputMask = DepThrowErrorBuilder('InputMask', 'BaseInputMask');
    }
    if (BaseEditor) {
        Editor = EditorBuilder(BaseEditor, Wraper);
    }
    else {
        Editor = DepThrowErrorBuilder('Editor', 'BaseEditor');
    }
    if (BaseInput) {
        Input = InputBuilder(BaseInput, Wraper);
    }
    else {
        Input = DepThrowErrorBuilder('Input', 'BaseInput');
    }
    if (BaseDateInput) {
        DateInput = DateInputBuilder(BaseDateInput, Wraper, ls);
    }
    else {
        DateInput = DepThrowErrorBuilder('DateInput', 'BaseDateInput');
    }
    if (BaseTextArea) {
        TextArea = TextAreaBuilder(BaseTextArea, Wraper);
    }
    else {
        TextArea = DepThrowErrorBuilder('TextArea', 'BaseTextArea');
    }
    if (BaseDropdown) {
        Dropdown = DropdownBuilder(BaseDropdown, Wraper);
    }
    else {
        Dropdown = DepThrowErrorBuilder('Dropdown', 'BaseDropdown');
    }
    if (BaseInputSwitch) {
        InputSwitch = InputSwitchBuilder(BaseInputSwitch, Wraper);
    }
    else {
        InputSwitch = DepThrowErrorBuilder('InputSwitch', 'BaseInputSwitch');
    }
    if (BaseInputNumber) {
        InputNumber = InputNumberBuilder(BaseInputNumber, Wraper);
    }
    else {
        InputNumber = DepThrowErrorBuilder('InputNumber', 'BaseInputNumber');
    }
    if (Button && Dialog) {
        DialogPrompt = DialogPromptBuilder(Dialog, Button, ls);
    }
    else {
        DialogPrompt = DepThrowErrorBuilder('DialogPrompt', 'Button and Dialog');
    }
    if (!Messages) {
        DialogPrompt = DepThrowErrorBuilder('Messages', 'Messages');
    }
    //Form stuff
    var Form = FormBuilder(ls, config, {
        InputMask: InputMask,
        Wraper: Wraper,
        Editor: Editor,
        Input: Input,
        InputNumber: InputNumber,
        InputSwitch: InputSwitch,
        DateInput: DateInput,
        TextArea: TextArea,
        Dropdown: Dropdown,
        Messages: Messages,
    });
    var GDiv = GDivBuilder(ls, config, {
        InputMask: InputMask,
        Wraper: Wraper,
        Editor: Editor,
        Input: Input,
        InputNumber: InputNumber,
        InputSwitch: InputSwitch,
        DateInput: DateInput,
        TextArea: TextArea,
        Dropdown: Dropdown,
        Messages: Messages,
    });
    return {
        DialogPrompt: DialogPrompt,
        Button: Button,
        InputMask: InputMask,
        Editor: Editor,
        Input: Input,
        DateInput: DateInput,
        Wraper: Wraper,
        TextArea: TextArea,
        Dropdown: Dropdown,
        InputSwitch: InputSwitch,
        InputNumber: InputNumber,
        Form: Form,
        GDiv: GDiv,
    };
}
//TODO: This needs to be refactored so that does not have any dependency on an icons packs
export function StateIcon(props) {
    var _a, _b, _c;
    var _d = useState(false), tooltip = _d[0], setTooltip = _d[1], custom = props.custom, state = props.state, onClick = props.onClick, style = __assign({ fontSize: props.small ? '1.4em' : '1.87em' }, ((_a = props.style) !== null && _a !== void 0 ? _a : {}));
    if (custom && custom[state]) {
        var icon = custom[state];
        style = __assign(__assign(__assign({}, style), { color: (_b = icon.color) !== null && _b !== void 0 ? _b : 'black' }), (onClick ? { cursor: 'pointer' } : {}));
        return (React.createElement("span", { onMouseOver: function () { return setTooltip(true); }, onMouseLeave: function () { return setTooltip(false); } },
            React.createElement("div", { style: {
                    display: tooltip && icon.tooltip ? 'block' : '',
                    marginTop: '0.5em',
                    backgroundColor: '#222d',
                    color: '#fff',
                    maxWidth: '5em',
                }, className: "p-tooltip" }, icon.tooltip),
            React.createElement("span", { onClick: onClick, className: 'pi ' + icon.class, style: style }, (_c = icon.text) !== null && _c !== void 0 ? _c : '')));
    }
    return (React.createElement("span", { onClick: onClick, className: "pi pi-question", style: { color: 'grey', fontSize: '1.83em' } }));
}
export var treatDate = function (_a) {
    var date = _a.date, _b = _a.extended, extended = _b === void 0 ? true : _b, _c = _a.table, table = _c === void 0 ? false : _c, _d = _a.returnString, returnString = _d === void 0 ? false : _d;
    if (!date || !date.match(/^[\d-]{10}T[\d:]{8}.*/))
        return React.createElement("span", null);
    var matched = date.match(/^(\d{4})-(\d{2})-(\d{2})T([\d:]{8}).*/);
    if (!matched)
        return '';
    var formated = matched[3] +
        '-' +
        matched[2] +
        '-' +
        matched[1] +
        (extended ? ' ' + matched[4] : ''); //dateformat(date, 'dd-mm-yyyy' + (extended ? ' HH:MM:ss': ''))
    return returnString ? (date ? (formated) : ('')) : !table ? (React.createElement("span", { style: {
            verticalAlign: 'center',
            paddingTop: '.5em',
            paddingBottom: '.5m',
        } }, date ? formated : '')) : (React.createElement("p", { style: { margin: '0px', textAlign: 'right' } }, date ? formated : ''));
};
/**
 * @function treats dates to the some of the iso formats without any timezone information
 * @returns the treated date
 */
export function formatDate(date, widthTime, end) {
    if (widthTime === void 0) { widthTime = false; }
    if (end === void 0) { end = false; }
    if (!date)
        return '';
    var d = new Date(date);
    if (end)
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0') + "T23:59:59.000";
    if (!widthTime)
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0') + "T00:00:00.000";
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0') + "T" + String(d.getHours()).padStart(2, '0') + ":" + String(d.getMinutes()).padStart(2, '0') + ":00.000";
}
