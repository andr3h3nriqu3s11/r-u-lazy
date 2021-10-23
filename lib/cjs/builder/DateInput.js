"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInputBuilder = void 0;
var react_1 = __importDefault(require("react"));
function DateInputBuilder(BaseDateInput, Wraper, ls) {
    var DateInput = function (_a) {
        var selectionMode = _a.selectionMode, inputClass = _a.inputClass, labelClass = _a.labelClass, label = _a.label, id = _a.id, hidden = _a.hidden, gridless = _a.gridless, showTime = _a.showTime, timeOnly = _a.timeOnly, minDate = _a.minDate, maxDate = _a.maxDate, value = _a.value, disabled = _a.disabled, onChange = _a.onChange, hourFormat = _a.hourFormat;
        return (react_1.default.createElement(Wraper, { id: id, label: label, hidden: hidden, class: labelClass, gridless: gridless },
            react_1.default.createElement("div", { className: inputClass },
                react_1.default.createElement(BaseDateInput, { selectionMode: selectionMode, hourFormat: ls('hourFomart', 'default', hourFormat !== null && hourFormat !== void 0 ? hourFormat : ''), showTime: showTime, timeOnly: timeOnly, minDate: minDate, maxDate: maxDate, yearRange: "1900:" + (new Date().getFullYear() + 10), monthNavigator: true, yearNavigator: true, id: id, dateFormat: "dd-mm-yy", value: value, onChange: function (event) { return (onChange !== null && onChange !== void 0 ? onChange : (function () { }))(event); }, disabled: disabled }))));
    };
    return DateInput;
}
exports.DateInputBuilder = DateInputBuilder;
