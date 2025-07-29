"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRows = exports.createAddRowsComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const createAddRowsComponent = (translationKeys = {}) => 
// eslint-disable-next-line react/display-name
({ addRows }) => {
    var _a, _b;
    const [value, setValue] = (0, react_1.useState)(1);
    const [rawValue, setRawValue] = (0, react_1.useState)(String(value));
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "dsg-add-row" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ type: "button", className: "dsg-add-row-btn", onClick: () => addRows(value) }, { children: (_a = translationKeys.button) !== null && _a !== void 0 ? _a : 'Add' })), ' ', (0, jsx_runtime_1.jsx)("input", { className: "dsg-add-row-input", value: rawValue, onBlur: () => setRawValue(String(value)), type: "number", min: 1, onChange: (e) => {
                    setRawValue(e.target.value);
                    setValue(Math.max(1, Math.round(parseInt(e.target.value) || 0)));
                }, onKeyDown: (event) => {
                    if (event.key === 'Enter') {
                        addRows(value);
                    }
                } }), ' ', (_b = translationKeys.unit) !== null && _b !== void 0 ? _b : 'rows'] })));
};
exports.createAddRowsComponent = createAddRowsComponent;
exports.AddRows = (0, exports.createAddRowsComponent)();
exports.AddRows.displayName = 'AddRows';
//# sourceMappingURL=AddRows.js.map