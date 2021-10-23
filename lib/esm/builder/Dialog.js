import React, { useState } from 'react';
export function DialogPromptBuilder(Dialog, Button, ls) {
    var DialogPrompt = function (_a) {
        var _b, _c, _d, _e;
        var hidden = _a.hidden, yesbtt = _a.yesbtt, onConfirm = _a.onConfirm, nobtt = _a.nobtt, onDeny = _a.onDeny, wraperClass = _a.wraperClass, label = _a.label, icon = _a.icon, bttClass = _a.bttClass, disabled = _a.disabled, textIn = _a.text, id = _a.id;
        var _f = useState(false), visible = _f[0], setVisible = _f[1];
        if (hidden)
            return null;
        var text = ls(textIn !== null && textIn !== void 0 ? textIn : '', 'dialog', textIn);
        var footer = (React.createElement("div", null,
            React.createElement(Button, { label: (_b = yesbtt === null || yesbtt === void 0 ? void 0 : yesbtt.label) !== null && _b !== void 0 ? _b : 'yes', bttClass: (_c = yesbtt === null || yesbtt === void 0 ? void 0 : yesbtt.class) !== null && _c !== void 0 ? _c : 'p-button-success', icon: yesbtt === null || yesbtt === void 0 ? void 0 : yesbtt.icon, wraperClass: "", onClick: function (e) {
                    e.preventDefault();
                    setVisible(false);
                    if (onConfirm)
                        onConfirm(e);
                } }),
            React.createElement(Button, { label: (_d = nobtt === null || nobtt === void 0 ? void 0 : nobtt.label) !== null && _d !== void 0 ? _d : 'no', wraperClass: "", bttClass: (_e = nobtt === null || nobtt === void 0 ? void 0 : nobtt.class) !== null && _e !== void 0 ? _e : 'p-button-danger', icon: nobtt === null || nobtt === void 0 ? void 0 : nobtt.icon, onClick: function (e) {
                    e.preventDefault();
                    setVisible(false);
                    if (onDeny)
                        onDeny(e);
                } })));
        return (React.createElement("div", { className: wraperClass },
            React.createElement(Button, { label: label, icon: icon, wraperClass: "", bttClass: bttClass, onClick: function (e) {
                    e.preventDefault();
                    if (disabled)
                        return;
                    setVisible(true);
                }, type: "button", disabled: disabled }),
            React.createElement(Dialog, { visible: visible, onHide: function () { return setVisible(false); }, footer: footer, style: { width: '50vw' }, id: id, header: ls(label !== null && label !== void 0 ? label : '', 'button', label) }, text)));
    };
    return DialogPrompt;
}
