"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogPromptBuilder = void 0;
var react_1 = __importStar(require("react"));
function DialogPromptBuilder(Dialog, Button, ls) {
    var DialogPrompt = function (_a) {
        var _b, _c, _d, _e;
        var hidden = _a.hidden, yesbtt = _a.yesbtt, onConfirm = _a.onConfirm, nobtt = _a.nobtt, onDeny = _a.onDeny, wraperClass = _a.wraperClass, label = _a.label, icon = _a.icon, bttClass = _a.bttClass, disabled = _a.disabled, textIn = _a.text, id = _a.id;
        var _f = (0, react_1.useState)(false), visible = _f[0], setVisible = _f[1];
        if (hidden)
            return null;
        var text = ls(textIn !== null && textIn !== void 0 ? textIn : '', 'dialog', textIn);
        var footer = (react_1.default.createElement("div", null,
            react_1.default.createElement(Button, { label: (_b = yesbtt === null || yesbtt === void 0 ? void 0 : yesbtt.label) !== null && _b !== void 0 ? _b : 'yes', bttClass: (_c = yesbtt === null || yesbtt === void 0 ? void 0 : yesbtt.class) !== null && _c !== void 0 ? _c : 'p-button-success', icon: yesbtt === null || yesbtt === void 0 ? void 0 : yesbtt.icon, wraperClass: "", onClick: function (e) {
                    e.preventDefault();
                    setVisible(false);
                    if (onConfirm)
                        onConfirm(e);
                } }),
            react_1.default.createElement(Button, { label: (_d = nobtt === null || nobtt === void 0 ? void 0 : nobtt.label) !== null && _d !== void 0 ? _d : 'no', wraperClass: "", bttClass: (_e = nobtt === null || nobtt === void 0 ? void 0 : nobtt.class) !== null && _e !== void 0 ? _e : 'p-button-danger', icon: nobtt === null || nobtt === void 0 ? void 0 : nobtt.icon, onClick: function (e) {
                    e.preventDefault();
                    setVisible(false);
                    if (onDeny)
                        onDeny(e);
                } })));
        return (react_1.default.createElement("div", { className: wraperClass },
            react_1.default.createElement(Button, { label: label, icon: icon, wraperClass: "", bttClass: bttClass, onClick: function (e) {
                    e.preventDefault();
                    if (disabled)
                        return;
                    setVisible(true);
                }, type: "button", disabled: disabled }),
            react_1.default.createElement(Dialog, { visible: visible, onHide: function () { return setVisible(false); }, footer: footer, style: { width: '50vw' }, id: id, header: ls(label !== null && label !== void 0 ? label : '', 'button', label) }, text)));
    };
    return DialogPrompt;
}
exports.DialogPromptBuilder = DialogPromptBuilder;
