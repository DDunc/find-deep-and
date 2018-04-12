const _ = require('lodash');
const defPredicate = (match, key) => (a) => a[key] === match;
const toggleUpdate = (toggleKey) => (a) => ({...a, [toggleKey]: !a[toggleKey]});
const updateChildren = (key, val) => (a) => (a.children ?
  { ...a, children: a.children.map(ac => ({...ac, [key]: val}))} : a);
const setOne = (key, val) => (a) => ({...a, [key]: val});

const defConfig = {
  shouldRecurse: a => a.children,
  childNodes: 'children'
};

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

const findDeepAll = ({array, predicate, config = defConfig}) => {
  return array.reduce((av, cv) => {
    if (predicate(cv)) {
      av.push(cv);
    }

    if (config.shouldRecurse(cv)) {
      return av.concat(findDeepAll({array: cv[config.childNodes], predicate, config}));
    }
    return av;
  }, []);
};

module.exports = {findDeepAnd, findDeepAll, toggleUpdate, updateChildren, defPredicate, setOne};