const _ = require('lodash');

const defConf = {
  branch: a => a.children,
  leaves: 'children'
};

//TODO: move to test file, you savage
const addTextAndIdAndChildren = s => ({text: s, id: _.uniqueId(), children: [
  {text: 'child1', id: 'child1', someBoolean: false},
  {text: 'child2', id: 'child2', someBoolean: false}
  ]});

const testArr = [{text: 'wut'}].concat(['woo'].map(addTextAndIdAndChildren));

const defPred = (match, key) => (a) => a[key] === match;

const toggleUpdate = (toggleKey) => (a) => ({...a, [toggleKey]: !a[toggleKey]});

const setMatchChildren = (key, val) => (a) => (a.children ?
  { ...a, children: a.children.map(ac => ({...ac, [key]: val}))} :
  {...a});

const idPred = defPred('child1', 'id');

const someToggle = toggleUpdate('someBoolean');

const parentPred = defPred('1', 'id');

const setSomeBooleanChildren = setMatchChildren('someBoolean', true);

const findDeepAnd = ({arr, pred, update, conf = defConf}) => {

  return arr.map(a => {

    if (pred(a)) {
      return update(a);
    }

    if (conf.branch(a)) {
      return {...a, [conf.leaves]: findDeepAnd({arr: a[conf.leaves], pred, update, conf})}
    }

    return a

  })
};

module.exports = findDeepAnd;