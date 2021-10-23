"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WraperBuilder = void 0;
var react_1 = __importDefault(require("react"));
var index_1 = require("../index");
var WraperBuilder = function (ls) {
    var Wraper = function (_a) {
        var _b;
        var hidden = _a.hidden, label = _a.label, children = _a.children, id = _a.id, className = _a.class, gridless = _a.gridless, reversed = _a.reversed;
        if (hidden)
            return react_1.default.createElement(react_1.default.Fragment, null);
        if (((0, index_1.StringEmpty)(label) && (0, index_1.StringEmpty)(id)) || label === '')
            return react_1.default.createElement(react_1.default.Fragment, null, children);
        label = (_b = label !== null && label !== void 0 ? label : id) !== null && _b !== void 0 ? _b : '';
        label = ls(label, undefined, label);
        var labelbody = (react_1.default.createElement("div", { key: id + "divlable", className: className },
            react_1.default.createElement("label", { htmlFor: id }, label)));
        if (!id)
            labelbody = (react_1.default.createElement("div", { key: id + "divlabel", className: className }, label));
        if (gridless && reversed)
            return react_1.default.createElement(react_1.default.Fragment, null, [children, labelbody]);
        if (gridless)
            return react_1.default.createElement(react_1.default.Fragment, null, [labelbody, children]);
        if (reversed)
            return (react_1.default.createElement("div", { key: id + "div", className: "p-grid" },
                labelbody,
                " ",
                children));
        return (react_1.default.createElement("div", { key: id + "div" + label, className: "p-grid" },
            ' ',
            labelbody,
            " ",
            children,
            ' '));
    };
    return Wraper;
};
exports.WraperBuilder = WraperBuilder;
