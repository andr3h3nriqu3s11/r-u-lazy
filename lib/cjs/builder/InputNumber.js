"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputNumberBuilder = void 0;
var react_1 = __importDefault(require("react"));
function InputNumberBuilder(BaseInputNumber, Wraper) {
    var InputNumber = function (props) {
        var hidden = props.hidden, id = props.id, required = props.required, label = props.label, _a = props.labelClass, labelClass = _a === void 0 ? 'p-col-3' : _a, _b = props.inputClass, inputClass = _b === void 0 ? 'p-col-7' : _b, disabled = props.disabled, tooltip = props.tooltip, type = props.type, value = props.value, onChange = props.onChange, gridless = props.gridless, suffix = props.suffix, suffixOutside = props.suffixOutside, prefix = props.prefix, mode = props.mode, currency = props.currency, minFractionDigits = props.minFractionDigits, maxFractionDigits = props.maxFractionDigits, locale = props.locale;
        var valueN = Number(value);
        if (isNaN(valueN))
            valueN = undefined;
        return (react_1.default.createElement(Wraper, { id: id, label: label, class: labelClass, gridless: gridless, hidden: hidden },
            react_1.default.createElement("div", { className: (suffixOutside ? 'p-grid ' : '') + inputClass }, (function () {
                var a = (react_1.default.createElement(BaseInputNumber, { tooltip: tooltip, type: type, value: valueN, onChange: !disabled && onChange ? onChange : function () { }, id: id, disabled: disabled, required: required, suffix: suffixOutside ? '' : suffix, prefix: prefix, mode: mode, currency: currency, minFractionDigits: minFractionDigits, maxFractionDigits: maxFractionDigits, locale: locale }));
                if (suffixOutside)
                    return (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "p-col" }, a),
                        react_1.default.createElement("div", { className: "p-col-1" }, suffix !== null && suffix !== void 0 ? suffix : '')));
                return a;
            })())));
    };
    return InputNumber;
}
exports.InputNumberBuilder = InputNumberBuilder;
