"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumns = exports.parseFlexValue = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const defaultComponent = () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
const defaultIsCellEmpty = () => false;
const identityRow = ({ rowData }) => rowData;
const defaultCopyValue = () => null;
const defaultGutterComponent = ({ rowIndex }) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: rowIndex + 1 }));
const cellAlwaysEmpty = () => true;
const defaultPrePasteValues = (values) => values;
const parseFlexValue = (value) => {
    if (typeof value === 'number') {
        return {
            basis: 0,
            grow: value,
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? *$/)) {
        return {
            basis: 0,
            grow: parseFloat(value.trim()),
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? *px *$/)) {
        return {
            basis: parseFloat(value.trim()),
            grow: 1,
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? \d+(\.\d*)? *$/)) {
        const [grow, shrink] = value.trim().split(' ');
        return {
            basis: 0,
            grow: parseFloat(grow),
            shrink: parseFloat(shrink),
        };
    }
    if (value.match(/^ *\d+(\.\d*)? \d+(\.\d*)? *px *$/)) {
        const [grow, basis] = value.trim().split(' ');
        return {
            basis: parseFloat(basis),
            grow: parseFloat(grow),
            shrink: 1,
        };
    }
    if (value.match(/^ *\d+(\.\d*)? \d+(\.\d*)? \d+(\.\d*)? *px *$/)) {
        const [grow, shrink, basis] = value.trim().split(' ');
        return {
            basis: parseFloat(basis),
            grow: parseFloat(grow),
            shrink: parseFloat(shrink),
        };
    }
    return {
        basis: 0,
        grow: 1,
        shrink: 1,
    };
};
exports.parseFlexValue = parseFlexValue;
const useColumns = (columns, gutterColumn, stickyRightColumn) => {
    return (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const partialColumns = [
            gutterColumn === false
                ? {
                    basis: 0,
                    grow: 0,
                    shrink: 0,
                    minWidth: 0,
                    // eslint-disable-next-line react/display-name
                    component: () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}),
                    headerClassName: 'dsg-hidden-cell',
                    cellClassName: 'dsg-hidden-cell',
                    isCellEmpty: cellAlwaysEmpty,
                }
                : Object.assign(Object.assign({}, gutterColumn), { basis: (_a = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.basis) !== null && _a !== void 0 ? _a : 40, grow: (_b = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.grow) !== null && _b !== void 0 ? _b : 0, shrink: (_c = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.shrink) !== null && _c !== void 0 ? _c : 0, minWidth: (_d = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.minWidth) !== null && _d !== void 0 ? _d : 0, title: (_e = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.title) !== null && _e !== void 0 ? _e : ((0, jsx_runtime_1.jsx)("div", { className: "dsg-corner-indicator" })), component: (_f = gutterColumn === null || gutterColumn === void 0 ? void 0 : gutterColumn.component) !== null && _f !== void 0 ? _f : defaultGutterComponent, isCellEmpty: cellAlwaysEmpty }),
            ...columns,
        ];
        if (stickyRightColumn) {
            partialColumns.push(Object.assign(Object.assign({}, stickyRightColumn), { basis: (_g = stickyRightColumn === null || stickyRightColumn === void 0 ? void 0 : stickyRightColumn.basis) !== null && _g !== void 0 ? _g : 40, grow: (_h = stickyRightColumn === null || stickyRightColumn === void 0 ? void 0 : stickyRightColumn.grow) !== null && _h !== void 0 ? _h : 0, shrink: (_j = stickyRightColumn === null || stickyRightColumn === void 0 ? void 0 : stickyRightColumn.shrink) !== null && _j !== void 0 ? _j : 0, minWidth: (_k = stickyRightColumn.minWidth) !== null && _k !== void 0 ? _k : 0, isCellEmpty: cellAlwaysEmpty }));
        }
        return partialColumns.map((column) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            const legacyWidth = column.width !== undefined
                ? (0, exports.parseFlexValue)(column.width)
                : {
                    basis: undefined,
                    grow: undefined,
                    shrink: undefined,
                };
            return Object.assign(Object.assign({}, column), { basis: (_b = (_a = column.basis) !== null && _a !== void 0 ? _a : legacyWidth.basis) !== null && _b !== void 0 ? _b : 0, grow: (_d = (_c = column.grow) !== null && _c !== void 0 ? _c : legacyWidth.grow) !== null && _d !== void 0 ? _d : 1, shrink: (_f = (_e = column.shrink) !== null && _e !== void 0 ? _e : legacyWidth.shrink) !== null && _f !== void 0 ? _f : 1, minWidth: (_g = column.minWidth) !== null && _g !== void 0 ? _g : 100, component: (_h = column.component) !== null && _h !== void 0 ? _h : defaultComponent, disableKeys: (_j = column.disableKeys) !== null && _j !== void 0 ? _j : false, disabled: (_k = column.disabled) !== null && _k !== void 0 ? _k : false, keepFocus: (_l = column.keepFocus) !== null && _l !== void 0 ? _l : false, deleteValue: (_m = column.deleteValue) !== null && _m !== void 0 ? _m : identityRow, copyValue: (_o = column.copyValue) !== null && _o !== void 0 ? _o : defaultCopyValue, pasteValue: (_p = column.pasteValue) !== null && _p !== void 0 ? _p : identityRow, prePasteValues: (_q = column.prePasteValues) !== null && _q !== void 0 ? _q : defaultPrePasteValues, isCellEmpty: (_r = column.isCellEmpty) !== null && _r !== void 0 ? _r : defaultIsCellEmpty });
        });
    }, [gutterColumn, stickyRightColumn, columns]);
};
exports.useColumns = useColumns;
//# sourceMappingURL=useColumns.js.map