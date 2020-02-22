"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MatchMediaProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _useMatchMedia = _interopRequireDefault(require("./useMatchMedia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MatchMediaContext = _react.default.createContext(null);

var MatchMediaProvider = function MatchMediaProvider(_ref) {
  var children = _ref.children,
      media = _ref.media;
  var value = (0, _useMatchMedia.default)(media);
  return _react.default.createElement(MatchMediaContext.Provider, {
    value: value
  }, children);
};

exports.MatchMediaProvider = MatchMediaProvider;
var _default = MatchMediaContext;
exports.default = _default;