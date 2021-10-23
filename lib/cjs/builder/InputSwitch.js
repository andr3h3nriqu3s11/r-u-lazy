"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSwitchBuilder = void 0;
var react_1 = __importDefault(require("react"));
var InputSwitchBuilder = function (BaseInputSwitch, Wraper) {
    var InputSwitch = function (_a) {
        var id = _a.id, checked = _a.checked, disabled = _a.disabled, tooltip = _a.tooltip, onChange = _a.onChange, fClass = _a.fClass, label = _a.label, lClass = _a.lClass, hidden = _a.hidden, gridless = _a.gridless;
        return (react_1.default.createElement(Wraper, { label: label, id: id, class: lClass, hidden: hidden, gridless: gridless },
            react_1.default.createElement("div", { className: fClass },
                react_1.default.createElement(BaseInputSwitch, { id: id, checked: checked, disabled: disabled, tooltip: tooltip, onChange: onChange }))));
    };
    return InputSwitch;
};
exports.InputSwitchBuilder = InputSwitchBuilder;
