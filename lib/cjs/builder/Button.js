"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBuilder = void 0;
var react_1 = __importDefault(require("react"));
function ButtonBuilder(BaseButton, ls) {
    var Button = function (props) {
        var _a = props.label, label = _a === void 0 ? '' : _a, _b = props.hidden, hidden = _b === void 0 ? false : _b, _c = props.type, type = _c === void 0 ? 'submit' : _c, tooltip = props.tooltip, style = props.style, icon = props.icon, bttClass = props.bttClass, _d = props.onClick, onClick = _d === void 0 ? null : _d, _e = props.disabled, disabled = _e === void 0 ? false : _e, _f = props.wraperClass, wraperClass = _f === void 0 ? 'p-col-1' : _f, wraperStyle = props.wraperStyle;
        label =
            ls(label, 'button', 'LabelInferenceFailed') ===
                'LabelInferenceFailed'
                ? label
                : ls(label, 'button', 'LabelInferenceFailed');
        tooltip =
            ls(label, 'tooltip', 'LabelInferenceFailed') ===
                'LabelInferenceFailed'
                ? label
                : ls(label, 'tooltip');
        if (hidden)
            return null;
        var body = (react_1.default.createElement(BaseButton, { tooltip: tooltip, type: type, style: style, icon: icon, className: bttClass, onClick: !onClick || disabled ? undefined : onClick, disabled: disabled, label: label }));
        if (!wraperClass)
            return body;
        return (react_1.default.createElement("div", { style: wraperStyle, className: wraperClass }, body));
    };
    return Button;
}
exports.ButtonBuilder = ButtonBuilder;
