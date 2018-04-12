'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defPredicate = function defPredicate(match, key) {
  return function (a) {
    return a[key] === match;
  };
};
var toggleUpdate = function toggleUpdate(toggleKey) {
  return function (a) {
    return _extends({}, a, _defineProperty({}, toggleKey, !a[toggleKey]));
  };
};
var updateChildren = function updateChildren(key, val) {
  return function (a) {
    return a.children ? _extends({}, a, { children: a.children.map(function (ac) {
      return _extends({}, ac, _defineProperty({}, key, val));
    }) }) : a;
  };
};
var setOne = function setOne(key, val) {
  return function (a) {
    return _extends({}, a, _defineProperty({}, key, val));
  };
};

var defConfig = {
  shouldRecurse: function shouldRecurse(a) {
    return a.children;
  },
  childNodes: 'children'
};

var findDeepAnd = function findDeepAnd(_ref) {
  var array = _ref.array,
    predicate = _ref.predicate,
    update = _ref.update,
    _ref$config = _ref.config,
    config = _ref$config === undefined ? defConfig : _ref$config;

  return array.map(function (a) {

    if (predicate(a)) {
      return update(a);
    }

    if (config.shouldRecurse(a)) {
      return _extends({}, a, _defineProperty({}, config.childNodes, findDeepAnd({ array: a[config.childNodes], predicate: predicate, update: update, config: config })));
    }

    return a;
  });
};

var findDeepAll = function findDeepAll(_ref2) {
  var array = _ref2.array,
    predicate = _ref2.predicate,
    _ref2$config = _ref2.config,
    config = _ref2$config === undefined ? defConfig : _ref2$config;

  return array.reduce(function (av, cv) {
    if (predicate(cv)) {
      av.push(cv);
    }

    if (config.shouldRecurse(cv)) {
      return av.concat(findDeepAll({ array: cv[config.childNodes], predicate: predicate, config: config }));
    }
    return av;
  }, []);
};

module.exports = { findDeepAnd: findDeepAnd, findDeepAll: findDeepAll, toggleUpdate: toggleUpdate, updateChildren: updateChildren, defPredicate: defPredicate, setOne: setOne };
