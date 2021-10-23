import React from 'react';
export function InputMaskBuilder(BaseInputMask, Wraper, ls) {
    var InputMask = function (props) {
        var _a = props.unmask, unmask = _a === void 0 ? true : _a, _b = props.autoClear, autoClear = _b === void 0 ? false : _b, label = props.label, id = props.id, _c = props.gridless, gridless = _c === void 0 ? false : _c, placeholder = props.placeholder, _d = props.labelClass, labelClass = _d === void 0 ? 'p-col-3' : _d, _e = props.fieldClass, fieldClass = _e === void 0 ? 'p-col-7' : _e, _f = props.hidden, hidden = _f === void 0 ? false : _f, _g = props.disabled, disabled = _g === void 0 ? false : _g, tooltip = props.tooltip, value = props.value, onChange = props.onChange, _h = props.required, required = _h === void 0 ? false : _h, mask = props.mask, style = props.style;
        label = label !== null && label !== void 0 ? label : id;
        placeholder = placeholder !== null && placeholder !== void 0 ? placeholder : id;
        mask = mask !== null && mask !== void 0 ? mask : id;
        label =
            ls(label, undefined, 'LabelInferenceFailed') ===
                'LabelInferenceFailed'
                ? label
                : ls(label);
        mask =
            ls(mask, 'mask', 'LabelInferenceFailed') === 'LabelInferenceFailed'
                ? mask
                : ls(mask, 'mask', 'LabelInferenceFailed');
        placeholder =
            ls(placeholder, 'placeholder', 'LabelInferenceFailed') ===
                'LabelInferenceFailed'
                ? placeholder
                : ls(placeholder, 'placeholder', 'LabelInferenceFailed');
        return (React.createElement(Wraper, { id: id, label: label, hidden: hidden, class: labelClass, gridless: gridless },
            React.createElement("div", { className: fieldClass },
                React.createElement(BaseInputMask, { placeholder: placeholder, tooltip: tooltip, value: value, onChange: function (e) {
                        return disabled ? function () { } : onChange(e);
                    }, id: id, disabled: disabled, required: required, mask: mask, style: style, autoClear: autoClear, unmask: unmask }))));
    };
    return InputMask;
}
