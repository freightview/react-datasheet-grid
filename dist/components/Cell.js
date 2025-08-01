"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const Cell = ({ children, gutter, stickyRight, active, disabled, className, width, left, }) => {
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, classnames_1.default)('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', className), style: {
            width,
            left: stickyRight ? undefined : left,
        } }, { children: children })));
};
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map