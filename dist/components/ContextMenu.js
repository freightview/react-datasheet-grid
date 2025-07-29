"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = exports.createContextMenuComponent = exports.defaultRenderItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useDocumentEventListener_1 = require("../hooks/useDocumentEventListener");
const defaultRenderItem = (item) => {
    if (item.type === 'CUT') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Cut" });
    }
    if (item.type === 'COPY') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Copy" });
    }
    if (item.type === 'PASTE') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Paste" });
    }
    if (item.type === 'DELETE_ROW') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Delete row" });
    }
    if (item.type === 'DELETE_ROWS') {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Delete rows ", (0, jsx_runtime_1.jsx)("b", { children: item.fromRow }), " to ", (0, jsx_runtime_1.jsx)("b", { children: item.toRow })] }));
    }
    if (item.type === 'INSERT_ROW_BELLOW') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Insert row below" });
    }
    if (item.type === 'DUPLICATE_ROW') {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Duplicate row" });
    }
    if (item.type === 'DUPLICATE_ROWS') {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Duplicate rows ", (0, jsx_runtime_1.jsx)("b", { children: item.fromRow }), " to ", (0, jsx_runtime_1.jsx)("b", { children: item.toRow })] }));
    }
    return item.type;
};
exports.defaultRenderItem = defaultRenderItem;
const createContextMenuComponent = (renderItem = exports.defaultRenderItem) => 
// eslint-disable-next-line react/display-name
({ clientX, clientY, items, close }) => {
    const containerRef = (0, react_1.useRef)(null);
    const onClickOutside = (0, react_1.useCallback)((event) => {
        var _a;
        const clickInside = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target);
        if (!clickInside) {
            close();
        }
    }, [close]);
    (0, useDocumentEventListener_1.useDocumentEventListener)('mousedown', onClickOutside);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "dsg-context-menu", style: { left: clientX + 'px', top: clientY + 'px' }, ref: containerRef }, { children: items.map((item) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: item.action, className: "dsg-context-menu-item" }, { children: renderItem(item) }), item.type))) })));
};
exports.createContextMenuComponent = createContextMenuComponent;
exports.ContextMenu = (0, exports.createContextMenuComponent)(exports.defaultRenderItem);
exports.ContextMenu.displayName = 'ContextMenu';
//# sourceMappingURL=ContextMenu.js.map