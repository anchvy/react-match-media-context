"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useMatchMedia() {
  var media = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var currentState = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(Object.keys(media).reduce(function (rs, key) {
    return _objectSpread({}, rs, _defineProperty({}, key, Boolean(media[key].isDefaultValue)));
  }, {})),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _react.useEffect)(function () {
    var mediaQueries = Object.keys(media).reduce(function (result, key) {
      var medium = media[key];
      var mediaQueryList = [medium.minWidth && "(min-width: ".concat(medium.minWidth, ")"), medium.maxWidth && "(max-width: ".concat(medium.maxWidth, ")")].filter(function (qs) {
        return !!qs;
      }).join(' and ');
      return _objectSpread({}, result, _defineProperty({}, key, window.matchMedia(mediaQueryList)));
    }, {});
    var mediaQueryKeys = Object.keys(mediaQueries);

    var update = function update(target) {
      var nextState = mediaQueryKeys.reduce(function (result, key) {
        return _objectSpread({}, result, _defineProperty({}, key, mediaQueries[key].matches));
      }, {}); // To prevent state updated twice
      // More information: https://stackoverflow.com/questions/44830917/window-matchmedia-listener-firing-twice/44864722#44864722

      if (currentState.current === null || currentState.current[target] !== nextState[target]) {
        setState(nextState);
        currentState.current = nextState;
      }
    };

    var callbacks = mediaQueryKeys.reduce(function (result, key) {
      return _objectSpread({}, result, _defineProperty({}, key, function () {
        return update(key);
      }));
    }, {});
    update();
    mediaQueryKeys.map(function (key) {
      return mediaQueries[key].addListener(callbacks[key]);
    });
    return function () {
      mediaQueryKeys.map(function (key) {
        return mediaQueries[key].removeListener(callbacks[key]);
      });
    };
  }, [mediaQueries]);
  return state;
}

var _default = useMatchMedia;
exports.default = _default;