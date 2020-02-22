"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResponsiveProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _useMatchMedia = _interopRequireDefault(require("./useMatchMedia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponsiveContext = _react.default.createContext(null);

var ResponsiveProvider = function ResponsiveProvider(_ref) {
  var children = _ref.children,
      media = _ref.media;
  var value = (0, _useMatchMedia.default)(media);
  return _react.default.createElement(ResponsiveContext.Provider, {
    value: value
  }, children);
};

exports.ResponsiveProvider = ResponsiveProvider;
var _default = ResponsiveContext;
exports.default = _default;