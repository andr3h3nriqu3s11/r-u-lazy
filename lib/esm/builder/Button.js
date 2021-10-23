import React from 'react';
export function ButtonBuilder(BaseButton, ls) {
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
        var body = (React.createElement(BaseButton, { tooltip: tooltip, type: type, style: style, icon: icon, className: bttClass, onClick: !onClick || disabled ? undefined : onClick, disabled: disabled, label: label }));
        if (!wraperClass)
            return body;
        return (React.createElement("div", { style: wraperStyle, className: wraperClass }, body));
    };
    return Button;
}
