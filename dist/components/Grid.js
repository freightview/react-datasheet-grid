"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_virtual_1 = require("@tanstack/react-virtual");
const react_1 = require("react");
const classnames_1 = __importDefault(require("classnames"));
const Cell_1 = require("./Cell");
const useMemoizedIndexCallback_1 = require("../hooks/useMemoizedIndexCallback");
const Grid = ({ data, columns, outerRef, innerRef, columnWidths, hasStickyRightColumn, displayHeight, headerRowHeight, rowHeight, rowKey, fullWidth, selection, activeCell, rowClassName, cellClassName, children, editing, getContextMenuItems, setRowData, deleteRows, duplicateRows, insertRowAfter, stopEditing, onScroll, }) => {
    var _a, _b, _c, _d;
    const rowVirtualizer = (0, react_virtual_1.useVirtualizer)({
        count: data.length,
        getScrollElement: () => outerRef.current,
        paddingStart: headerRowHeight,
        estimateSize: (index) => rowHeight(index).height,
        getItemKey: (index) => {
            if (rowKey && index > 0) {
                const row = data[index - 1];
                if (typeof rowKey === 'function') {
                    return rowKey({ rowData: row, rowIndex: index });
                }
                else if (typeof rowKey === 'string' &&
                    row instanceof Object &&
                    rowKey in row) {
                    const key = row[rowKey];
                    if (typeof key === 'string' || typeof key === 'number') {
                        return key;
                    }
                }
            }
            return index;
        },
        overscan: 5,
    });
    const colVirtualizer = (0, react_virtual_1.useVirtualizer)({
        count: columns.length,
        getScrollElement: () => outerRef.current,
        estimateSize: (index) => { var _a; return (_a = columnWidths === null || columnWidths === void 0 ? void 0 : columnWidths[index]) !== null && _a !== void 0 ? _a : 100; },
        horizontal: true,
        getItemKey: (index) => { var _a; return (_a = columns[index].id) !== null && _a !== void 0 ? _a : index; },
        overscan: 1,
        rangeExtractor: (range) => {
            const result = (0, react_virtual_1.defaultRangeExtractor)(range);
            if (result[0] !== 0) {
                result.unshift(0);
            }
            if (hasStickyRightColumn &&
                result[result.length - 1] !== columns.length - 1) {
                result.push(columns.length - 1);
            }
            return result;
        },
    });
    (0, react_1.useEffect)(() => {
        colVirtualizer.measure();
    }, [colVirtualizer, columnWidths]);
    const setGivenRowData = (0, useMemoizedIndexCallback_1.useMemoizedIndexCallback)(setRowData, 1);
    const deleteGivenRow = (0, useMemoizedIndexCallback_1.useMemoizedIndexCallback)(deleteRows, 0);
    const duplicateGivenRow = (0, useMemoizedIndexCallback_1.useMemoizedIndexCallback)(duplicateRows, 0);
    const insertAfterGivenRow = (0, useMemoizedIndexCallback_1.useMemoizedIndexCallback)(insertRowAfter, 0);
    const selectionColMin = (_a = selection === null || selection === void 0 ? void 0 : selection.min.col) !== null && _a !== void 0 ? _a : activeCell === null || activeCell === void 0 ? void 0 : activeCell.col;
    const selectionColMax = (_b = selection === null || selection === void 0 ? void 0 : selection.max.col) !== null && _b !== void 0 ? _b : activeCell === null || activeCell === void 0 ? void 0 : activeCell.col;
    const selectionMinRow = (_c = selection === null || selection === void 0 ? void 0 : selection.min.row) !== null && _c !== void 0 ? _c : activeCell === null || activeCell === void 0 ? void 0 : activeCell.row;
    const selectionMaxRow = (_d = selection === null || selection === void 0 ? void 0 : selection.max.row) !== null && _d !== void 0 ? _d : activeCell === null || activeCell === void 0 ? void 0 : activeCell.row;
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ ref: outerRef, className: "dsg-container", onScroll: onScroll, style: { height: displayHeight } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: innerRef, style: {
                width: fullWidth ? '100%' : colVirtualizer.getTotalSize(),
                height: rowVirtualizer.getTotalSize(),
            } }, { children: [headerRowHeight > 0 && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, classnames_1.default)('dsg-row', 'dsg-row-header'), style: {
                        width: fullWidth ? '100%' : colVirtualizer.getTotalSize(),
                        height: headerRowHeight,
                    } }, { children: colVirtualizer.getVirtualItems().map((col) => ((0, jsx_runtime_1.jsx)(Cell_1.Cell, Object.assign({ gutter: col.index === 0, stickyRight: hasStickyRightColumn && col.index === columns.length - 1, width: col.size, left: col.start, className: (0, classnames_1.default)('dsg-cell-header', selectionColMin !== undefined &&
                            selectionColMax !== undefined &&
                            selectionColMin <= col.index - 1 &&
                            selectionColMax >= col.index - 1 &&
                            'dsg-cell-header-active', columns[col.index].headerClassName) }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dsg-cell-header-container" }, { children: columns[col.index].title })) }), col.key))) }))), rowVirtualizer.getVirtualItems().map((row) => {
                    const rowActive = Boolean(row.index >= (selectionMinRow !== null && selectionMinRow !== void 0 ? selectionMinRow : Infinity) &&
                        row.index <= (selectionMaxRow !== null && selectionMaxRow !== void 0 ? selectionMaxRow : -Infinity));
                    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: (0, classnames_1.default)('dsg-row', typeof rowClassName === 'string' ? rowClassName : null, typeof rowClassName === 'function'
                            ? rowClassName({
                                rowData: data[row.index],
                                rowIndex: row.index,
                            })
                            : null), style: {
                            height: row.size,
                            top: row.start,
                            width: fullWidth ? '100%' : colVirtualizer.getTotalSize(),
                        } }, { children: colVirtualizer.getVirtualItems().map((col) => {
                            const colCellClassName = columns[col.index].cellClassName;
                            const disabled = columns[col.index].disabled;
                            const Component = columns[col.index].component;
                            const cellDisabled = disabled === true ||
                                (typeof disabled === 'function' &&
                                    disabled({
                                        rowData: data[row.index],
                                        rowIndex: row.index,
                                    }));
                            const cellIsActive = (activeCell === null || activeCell === void 0 ? void 0 : activeCell.row) === row.index &&
                                activeCell.col === col.index - 1;
                            return ((0, jsx_runtime_1.jsx)(Cell_1.Cell, Object.assign({ gutter: col.index === 0, stickyRight: hasStickyRightColumn && col.index === columns.length - 1, active: col.index === 0 && rowActive, disabled: cellDisabled, className: (0, classnames_1.default)(typeof colCellClassName === 'function'
                                    ? colCellClassName({
                                        rowData: data[row.index],
                                        rowIndex: row.index,
                                        columnId: columns[col.index].id,
                                    })
                                    : colCellClassName, typeof cellClassName === 'function'
                                    ? cellClassName({
                                        rowData: data[row.index],
                                        rowIndex: row.index,
                                        columnId: columns[col.index].id,
                                    })
                                    : cellClassName), width: col.size, left: col.start }, { children: (0, jsx_runtime_1.jsx)(Component, { rowData: data[row.index], getContextMenuItems: getContextMenuItems, disabled: cellDisabled, active: cellIsActive, columnIndex: col.index - 1, rowIndex: row.index, focus: cellIsActive && editing, deleteRow: deleteGivenRow(row.index), duplicateRow: duplicateGivenRow(row.index), stopEditing: stopEditing, insertRowBelow: insertAfterGivenRow(row.index), setRowData: setGivenRowData(row.index), columnData: columns[col.index].columnData }) }), col.key));
                        }) }), row.key));
                }), children] })) })));
};
exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map