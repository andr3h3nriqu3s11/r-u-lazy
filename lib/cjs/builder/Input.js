"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputBuilder = void 0;
var react_1 = __importDefault(require("react"));
function InputBuilder(BaseInput, Wraper) {
    var Input = function (props) {
        var hidden = props.hidden, id = props.id, required = props.required, label = props.label, _a = props.labelClass, labelClass = _a === void 0 ? 'p-col-3' : _a, _b = props.inputClass, inputClass = _b === void 0 ? 'p-col-7' : _b, disabled = props.disabled, tooltip = props.tooltip, type = props.type, value = props.value, onChange = props.onChange, gridless = props.gridless, title = props.title;
        return (react_1.default.createElement(Wraper, { id: id, label: label, class: labelClass, hidden: hidden, gridless: gridless },
            react_1.default.createElement("div", { className: inputClass },
                react_1.default.createElement(BaseInput, { title: title, tooltip: tooltip, type: type, value: value, onChange: !disabled && onChange ? onChange : function () { }, id: id, disabled: disabled, required: required }))));
    };
    return Input;
}
exports.InputBuilder = InputBuilder;
