import React from 'react';
export var TextAreaBuilder = function (BaseTextArea, Wraper) {
    var TextArea = function (_a) {
        var id = _a.id, label = _a.label, labelClass = _a.labelClass, hidden = _a.hidden, gridless = _a.gridless, inputClass = _a.inputClass, style = _a.style, tooltip = _a.tooltip, value = _a.value, disabled = _a.disabled, required = _a.required, title = _a.title, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b;
        label = label !== null && label !== void 0 ? label : id;
        return (React.createElement(Wraper, { id: id, gridless: gridless, class: labelClass, label: label, hidden: hidden },
            React.createElement("div", { className: inputClass },
                React.createElement(BaseTextArea, { style: style, tooltip: tooltip, value: value, onChange: function (e) { return (disabled ? function () { } : onChange(e)); }, title: title, id: id, disabled: disabled, required: required }))));
    };
    return TextArea;
};
