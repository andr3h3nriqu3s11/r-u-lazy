"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorBuilder = void 0;
var react_1 = __importDefault(require("react"));
function EditorBuilder(BaseEditor, Wraper) {
    var Editor = function (props) {
        var disabled = props.disabled, id = props.id, label = props.label, style = props.style, fieldClass = props.fieldClass, value = props.value, labelClass = props.labelClass, gridless = props.gridless, onChange = props.onChange, hidden = props.hidden;
        if (hidden)
            return null;
        if (disabled)
            return (react_1.default.createElement(Wraper, { id: id, label: label, class: labelClass, gridless: gridless },
                react_1.default.createElement("div", { style: __assign({ border: '1px solid grey', marginBottom: '3px' }, style), className: fieldClass, dangerouslySetInnerHTML: { __html: value !== null && value !== void 0 ? value : '' } })));
        return (react_1.default.createElement(Wraper, { id: id, label: label, class: labelClass, gridless: gridless },
            react_1.default.createElement("div", { className: fieldClass },
                react_1.default.createElement(BaseEditor, { value: value, id: id, style: style !== null && style !== void 0 ? style : { minHeight: '7em' }, onTextChange: function (e) { return (onChange !== null && onChange !== void 0 ? onChange : (function () { }))(e); } }))));
    };
    return Editor;
}
exports.EditorBuilder = EditorBuilder;
