import React from 'react';
export var DropdownBuilder = function (BaseDropdown, Wraper) {
    var Dropdown = function (_a) {
        var label = _a.label, id = _a.id, lClass = _a.lClass, hidden = _a.hidden, itemTemplate = _a.itemTemplate, filter = _a.filter, options = _a.options, placeholder = _a.placeholder, value = _a.value, disabled = _a.disabled, onChange = _a.onChange, required = _a.required, showClear = _a.showClear, fClass = _a.fClass, gridless = _a.gridless;
        return (React.createElement(Wraper, { label: label, id: id, class: lClass, hidden: hidden, gridless: gridless },
            React.createElement("div", { className: fClass },
                React.createElement(BaseDropdown, { key: id + "drop", itemTemplate: itemTemplate, filter: filter, filterBy: "label, value", options: options, placeholder: placeholder, value: value, onChange: function (e) { return (disabled ? function () { } : onChange(e)); }, disabled: disabled, id: id, required: required, showClear: showClear }))));
    };
    return Dropdown;
};
