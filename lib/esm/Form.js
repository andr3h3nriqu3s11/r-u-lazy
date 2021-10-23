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
import { formatDate, StateIcon, StringEmpty, treatDate } from './index';
//Function that processes the form children
export var processChildren = function (ls, config, ai, props, hemlProps) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
    var Input = hemlProps.Input, Wraper = hemlProps.Wraper, InputMask = hemlProps.InputMask, InputSwitch = hemlProps.InputSwitch, DateInput = hemlProps.DateInput, TextArea = hemlProps.TextArea, Dropdown = hemlProps.Dropdown, Editor = hemlProps.Editor, InputNumber = hemlProps.InputNumber, Messages = hemlProps.Messages;
    var obj = (_a = props.obj) !== null && _a !== void 0 ? _a : {};
    var _7 = props.setObj, setObj = _7 === void 0 ? function () { } : _7;
    if (ai.props && ai.props.isGenericFormElement) {
        var gen = ai;
        var t = (_c = (_b = gen.props.t) !== null && _b !== void 0 ? _b : props.t) !== null && _c !== void 0 ? _c : '';
        if (gen.props.isGenericInputFormElement) {
            var iGen_1 = gen;
            var d_1 = iGen_1.props.d;
            var value = obj[d_1];
            var label = ls((_d = iGen_1.props.l) !== null && _d !== void 0 ? _d : '') === 'LabelInfenranceFailed'
                ? (_e = iGen_1.props.l) !== null && _e !== void 0 ? _e : ls(String(iGen_1.props.d))
                : ls((_f = iGen_1.props.l) !== null && _f !== void 0 ? _f : '');
            var onChange_1 = (_g = iGen_1.props.onChange) !== null && _g !== void 0 ? _g : (function (e, extra) { var _a; return setObj(e, __assign(__assign({}, extra), ((_a = iGen_1.props.extra) !== null && _a !== void 0 ? _a : {}))); });
            var disabled = (_j = (_h = iGen_1.props.disabled) !== null && _h !== void 0 ? _h : props.disabled) !== null && _j !== void 0 ? _j : false;
            var required = (_l = (_k = iGen_1.props.req) !== null && _k !== void 0 ? _k : props.req) !== null && _l !== void 0 ? _l : false;
            var inputClass = (_o = (_m = iGen_1.props.fClass) !== null && _m !== void 0 ? _m : props.fclass) !== null && _o !== void 0 ? _o : 'p-col';
            var labelClass = (_q = (_p = iGen_1.props.lClass) !== null && _p !== void 0 ? _p : props.lclass) !== null && _q !== void 0 ? _q : 'p-col-3';
            var hidden = (_r = iGen_1.props.h) !== null && _r !== void 0 ? _r : false;
            var extra_1 = (_s = iGen_1.props.extra) !== null && _s !== void 0 ? _s : {};
            //Types
            if (t === 't') {
                var iGenI = iGen_1;
                var type = iGenI.props.type;
                var tooltip = iGenI.props.tooltip;
                return (React.createElement(Input, { id: d_1, disabled: disabled, hidden: hidden, required: required, inputClass: inputClass, labelClass: labelClass, type: type, tooltip: tooltip, value: value, label: label, onChange: onChange_1, gridless: props.group }));
            }
            else if (t === 'area') {
                var iGenI = iGen_1;
                var tooltip = iGenI.props.tooltip;
                var style = iGenI.props.style;
                return (React.createElement(TextArea, { id: d_1, disabled: disabled, hidden: hidden, required: required, inputClass: inputClass, labelClass: labelClass, tooltip: tooltip, value: value, label: label, onChange: onChange_1, gridless: props.group, style: style }));
            }
            else if (t === 'editor') {
                var iGenI = iGen_1;
                var style = iGenI.props.style;
                return (React.createElement(Editor, { id: d_1, disabled: disabled, onChange: function (e) {
                        return onChange_1(e, __assign({ id: d_1, editor: true }, extra_1));
                    }, label: label, gridless: props.group, style: style, hidden: hidden, value: value, fieldClass: inputClass, labelClass: labelClass }));
            }
            else if (t === 'date') {
                var iGenI = iGen_1;
                var showTime_1 = iGenI.props.showTime;
                var maxDate = iGenI.props.maxDate;
                var minDate = iGenI.props.minDate;
                var selectionMode_1 = iGenI.props.selectionMode;
                var timeOnly = iGenI.props.timeOnly;
                return (React.createElement(DateInput, { id: d_1, showTime: showTime_1, hidden: hidden, disabled: disabled, gridless: props.group, inputClass: inputClass, label: label, labelClass: labelClass, maxDate: maxDate, minDate: minDate, selectionMode: selectionMode_1, timeOnly: timeOnly, value: selectionMode_1 !== undefined
                        ? value
                        : new Date(value), onChange: function (e) {
                        return setObj(e, {
                            multiple: selectionMode_1 !== undefined,
                            date: true,
                            withTime: showTime_1,
                        });
                    } }));
            }
            else if (t === 'drop') {
                var iGenI = iGen_1;
                return (React.createElement(Dropdown, { id: d_1, onChange: function (e) { return setObj(e, extra_1); }, hidden: hidden, disabled: disabled, gridless: props.group, fClass: inputClass, label: label, lClass: labelClass, options: iGenI.props.options, filter: iGenI.props.filter, itemTemplate: iGenI.props.itemTemplate, placeholder: iGenI.props.placeholder, required: required, showClear: iGenI.props.showClear, value: String(value) }));
            }
            else if (t === 'mask') {
                var iGenI = iGen_1;
                return (React.createElement(InputMask, { id: d_1, disabled: disabled, required: required, onChange: onChange_1, autoClear: (_t = iGenI.props.autoClear) !== null && _t !== void 0 ? _t : false, fieldClass: inputClass, gridless: props.group, hidden: hidden, label: label, labelClass: labelClass, mask: iGenI.props.mask, placeholder: iGenI.props.placeholder, style: iGenI.props.style, tooltip: iGenI.props.tooltip, unmask: (_u = iGenI.props.unmask) !== null && _u !== void 0 ? _u : true, value: value }));
            }
            else if (t === 'number') {
                var iGenI = iGen_1;
                var propsF = iGenI.props;
                var currency = undefined;
                var minFractionDigits = propsF.minFractionDigits;
                var locale = undefined;
                if (typeof propsF.locale === 'boolean') {
                    if (propsF.locale) {
                        locale = config.locale;
                    }
                }
                else {
                    locale = propsF.locale;
                }
                if (typeof propsF.currency === 'boolean') {
                    if (propsF.currency) {
                        currency = config.currency;
                        //minFractionDigits = minFractionDigits ?? 2;
                        locale = locale !== null && locale !== void 0 ? locale : config.locale;
                    }
                }
                else {
                    currency = propsF.currency;
                }
                return (React.createElement(InputNumber, { id: d_1, currency: currency, disabled: disabled, gridless: props.group, inputClass: inputClass, labelClass: labelClass, hidden: hidden, label: label, maxFractionDigits: propsF.maxFractionDigits, minFractionDigits: minFractionDigits, mode: StringEmpty(currency) ? 'decimal' : 'currency', prefix: propsF.prefix, suffix: propsF.suffix, onChange: onChange_1, required: required, tooltip: propsF.tooltip, type: propsF.type, value: value, locale: locale }));
            }
            else if (t === 'switch') {
                var iGenI = iGen_1;
                var propsF = iGenI.props;
                return (React.createElement(InputSwitch, { id: d_1, checked: String(value) === '1' ? true : false, tooltip: propsF.tooltip, disabled: disabled, fClass: inputClass, lClass: labelClass, gridless: props.group, hidden: hidden, label: label, onChange: function (e) { return onChange_1(e, __assign(__assign({}, extra_1), { switch: true })); } }));
            }
        }
        else if (gen.props.t === 'state') {
            var sGen = gen;
            var d = sGen.props.d;
            var label = ls((_v = sGen.props.l) !== null && _v !== void 0 ? _v : '') === 'LabelInfenranceFailed'
                ? (_w = sGen.props.l) !== null && _w !== void 0 ? _w : ls(String(sGen.props.d))
                : ls((_x = sGen.props.l) !== null && _x !== void 0 ? _x : '');
            label =
                label === 'LabelInfenranceFailed'
                    ? ls('status', 'generic')
                    : label;
            var value = obj[d];
            var small = sGen.props.small;
            var stateItems = sGen.props.custom;
            var onClick = sGen.props.onClick;
            var style = sGen.props.style;
            var lClass = (_z = (_y = sGen.props.lClass) !== null && _y !== void 0 ? _y : props.lclass) !== null && _z !== void 0 ? _z : 'p-col-3';
            return (React.createElement(Wraper, { id: d, label: label, hidden: sGen.props.h, class: lClass, gridless: props.group },
                React.createElement("div", { className: sGen.props.fClass },
                    React.createElement(StateIcon, { custom: stateItems, state: value, small: small, onClick: onClick, style: style }))));
        }
        else if (gen.props.t === 'v') {
            var vGen = gen;
            var d = vGen.props.d;
            var value = obj[d];
            var isDate = value
                ? String(value).match(/^[\d-]{10}T[\d:]{8}.*/)
                : false;
            var valueO = isDate
                ? treatDate({
                    date: value,
                    extended: vGen.props.extended,
                    returnString: true,
                })
                : value;
            var label = ls((_0 = vGen.props.l) !== null && _0 !== void 0 ? _0 : '') === 'LabelInfenranceFailed'
                ? (_1 = vGen.props.l) !== null && _1 !== void 0 ? _1 : ls(String(vGen.props.d))
                : ls((_2 = vGen.props.l) !== null && _2 !== void 0 ? _2 : '');
            var inputClass = (_4 = (_3 = vGen.props.fClass) !== null && _3 !== void 0 ? _3 : props.fclass) !== null && _4 !== void 0 ? _4 : 'p-col';
            var labelClass = (_6 = (_5 = vGen.props.lClass) !== null && _5 !== void 0 ? _5 : props.lclass) !== null && _6 !== void 0 ? _6 : 'p-col-3';
            return (React.createElement(Wraper, { id: d, label: label, hidden: vGen.props.h, class: labelClass, gridless: props.group },
                React.createElement("div", { className: inputClass }, valueO)));
        }
        else if (gen.props.t === 'div') {
            var dGen = gen;
            if (dGen.props.hidden)
                return React.createElement(React.Fragment, null);
            var className = dGen.props.class;
            var nProps_1 = __assign(__assign({}, props), dGen.props.extra);
            if (dGen.props.group !== undefined)
                nProps_1 = __assign(__assign({}, nProps_1), { group: dGen.props.group });
            var pChildren = dGen.props.children
                ? Array.isArray(dGen.props.children)
                    ? React.Children.map(dGen.props.children, function (e) {
                        return processChildren(ls, config, e, nProps_1, hemlProps);
                    })
                    : processChildren(ls, config, dGen.props.children, nProps_1, hemlProps)
                : null;
            if (dGen.props.group && className === GDivDefaultPropValues.class) {
                className = '';
            }
            return (React.createElement("div", { className: (dGen.props.grid ? 'p-grid p-fluid ' : '') + className, style: dGen.props.style }, pChildren));
        }
        else if (gen.props.t === 'messages') {
            if (!Messages) {
                throw 'Needed Messages to use GMessages check FormBuilder or BuildAll';
            }
            //TODO: improve this
            var dGen = gen;
            return (React.createElement("div", { className: "p-col-12" },
                React.createElement(Messages, { ref: dGen.props.refM })));
        }
        return React.createElement(React.Fragment, null);
    }
    else {
        return ai;
    }
};
export function FormBuilder(ls, config, hemlProps) {
    var Form = function (props) {
        var _a;
        var onSubmit = props.onSubmit, children = props.children;
        var pChildren = [];
        if (children) {
            if (Array.isArray(pChildren))
                pChildren = React.Children.map(children, function (e) {
                    return processChildren(ls, config, e, props, hemlProps);
                });
            else
                pChildren = processChildren(ls, config, children, props, hemlProps);
        }
        if (props.class) {
            return (React.createElement("form", { style: { width: '100%', height: '100%' }, onSubmit: onSubmit, ref: function (e) { var _a; return ((_a = props.formRef) !== null && _a !== void 0 ? _a : (function () { }))(e); } },
                React.createElement("div", { className: (_a = props.class) !== null && _a !== void 0 ? _a : '' }, pChildren)));
        }
        return (React.createElement("form", { style: { width: '100%', height: '100%' }, onSubmit: onSubmit, ref: function (e) { var _a; return ((_a = props.formRef) !== null && _a !== void 0 ? _a : (function () { }))(e); } }, pChildren));
    };
    Form.defaultProps = {
        t: 't',
    };
    return Form;
}
export var GenericElement = function () { return null; };
GenericElement.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: false,
};
export var G = GenericElement;
var GDivDefaultPropValues = {
    isGenericFormElement: true,
    isGenericInputFormElement: false,
    t: 'div',
    class: 'p-col',
    children: null,
};
export var GDivBuilder = function (ls, config, hemlProps) {
    var GDiv = function (props) {
        var children = props.children;
        var pChildren = [];
        if (children) {
            if (Array.isArray(pChildren))
                pChildren = React.Children.map(children, function (e) {
                    return processChildren(ls, config, e, props, hemlProps);
                });
            else
                pChildren = processChildren(ls, config, children, props, hemlProps);
        }
        return (React.createElement("div", { className: (props.grid ? 'p-grid' : '') + props.class, style: props.style, hidden: props.hidden }, pChildren));
    };
    GDiv.defaultProps = GDivDefaultPropValues;
    return GDiv;
};
export var GView = function (_props) { return null; };
GView.defaultProps = {
    isGenericFormElement: true,
    t: 'v',
};
export var GState = function (_props) { return null; };
GState.defaultProps = {
    isGenericFormElement: true,
    t: 'state',
};
export var GMessages = function () { return null; };
GMessages.defaultProps = {
    isGenericFormElement: true,
    t: 'messages',
};
export var GenericInputElement = function () {
    return null;
};
GenericInputElement.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
};
export var GInput = function () { return null; };
GInput.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 't',
};
export var GMask = function () { return null; };
GMask.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'mask',
};
export var GArea = function () { return null; };
GArea.defaultProps = {
    isGenericFormElement: true,
};
export var GEditor = function () { return null; };
GEditor.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'editor',
};
export var GDateInput = function () { return null; };
GDateInput.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'date',
};
export var GDropdown = function () { return null; };
GDropdown.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'drop',
};
export var GSwitch = function () { return null; };
GSwitch.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'switch',
    req: false,
};
export var GNumber = function () { return null; };
GNumber.defaultProps = {
    isGenericFormElement: true,
    isGenericInputFormElement: true,
    t: 'number',
};
export var GE = GenericInputElement;
export function useDataObject(initial) {
    var _a = useState(initial), obj = _a[0], setObjState = _a[1];
    var clear = function () {
        setObjState(initial);
    };
    var setObj = function (e, extra) {
        var _a, _b, _c, _d;
        if (e.preventDefault)
            e.preventDefault();
        var target = e === null || e === void 0 ? void 0 : e.target;
        var value = ((_a = target === null || target === void 0 ? void 0 : target.value) !== null && _a !== void 0 ? _a : '') + '';
        var id = (_b = target === null || target === void 0 ? void 0 : target.id) !== null && _b !== void 0 ? _b : '';
        if (extra === null || extra === void 0 ? void 0 : extra.editor) {
            id = (_c = extra === null || extra === void 0 ? void 0 : extra.id) !== null && _c !== void 0 ? _c : '';
            value = e.htmlValue;
        }
        if (!id)
            return;
        var toSet = obj;
        if (extra === null || extra === void 0 ? void 0 : extra.checkBox) {
            toSet[id] = toSet[id] === 1 ? 0 : 1;
            setObjState(__assign({}, toSet));
            return;
        }
        else if (extra === null || extra === void 0 ? void 0 : extra.switch) {
            //Value was forced to be a string
            toSet[id] = value === 'true' ? 1 : 0;
            setObjState(__assign({}, toSet));
            return;
        }
        else if (extra === null || extra === void 0 ? void 0 : extra.multiple) {
            value = e.value;
            toSet[id] = value;
            setObjState(__assign({}, toSet));
            return;
        }
        else if (extra === null || extra === void 0 ? void 0 : extra.date) {
            value = formatDate(value, extra.withTime);
        }
        if (extra === null || extra === void 0 ? void 0 : extra.replace)
            value = value.replace(extra.replace.filter, extra.replace.value);
        if ((extra === null || extra === void 0 ? void 0 : extra.regex) &&
            (value.match(extra.regex) === null ||
                ((_d = value.match(extra.regex)) !== null && _d !== void 0 ? _d : [])[0] !== value))
            return;
        toSet[id] = value;
        setObjState(__assign({}, toSet));
    };
    return { obj: obj, setObj: setObj, clear: clear, setObjState: setObjState };
}