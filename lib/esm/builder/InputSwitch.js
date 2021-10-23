import React from 'react';
export var InputSwitchBuilder = function (BaseInputSwitch, Wraper) {
    var InputSwitch = function (_a) {
        var id = _a.id, checked = _a.checked, disabled = _a.disabled, tooltip = _a.tooltip, onChange = _a.onChange, fClass = _a.fClass, label = _a.label, lClass = _a.lClass, hidden = _a.hidden, gridless = _a.gridless;
        return (React.createElement(Wraper, { label: label, id: id, class: lClass, hidden: hidden, gridless: gridless },
            React.createElement("div", { className: fClass },
                React.createElement(BaseInputSwitch, { id: id, checked: checked, disabled: disabled, tooltip: tooltip, onChange: onChange }))));
    };
    return InputSwitch;
};
