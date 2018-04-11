const _ = require('lodash');

const defPredicate = (match, key) => (a) => a[key] === match;
const defConfig = {
  shouldRecurse: a => a.children,
  childNodes: 'children'
};
const toggleUpdate = (toggleKey) => (a) => ({...a, [toggleKey]: !a[toggleKey]});
const updateChildren = (key, val) => (a) => (a.children ?
  { ...a, children: a.children.map(ac => ({...ac, [key]: val}))} : a);
const setOne = (key, val) => (a) => ({...a, [key]: val});

const findDeepAnd = ({array, predicate, update, config = defConfig}) => {
  return array.map(a => {

    if (predicate(a)) {
      return update(a);
    }

    if (config.shouldRecurse(a)) {
      return {...a, [config.childNodes]: findDeepAnd({array: a[config.childNodes], predicate, update, config})};
    }

    return a;
  });
};

module.exports = {findDeepAnd, toggleUpdate, updateChildren, defPredicate, setOne};