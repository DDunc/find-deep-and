/* global describe, it, expect, test */
const {findDeepAnd, findDeepAll, toggleUpdate, updateChildren, setOne, defPredicate} = require('./index');
const _ = require('lodash');

const simpleArray = [{id: 'foo0', someToggle: false}, {id: 'foo1', someToggle: true}, {id: 'foo2', someToggle: false}];

const nestedArray = ['foo', 'pony'].map((s) => ({text: s, id: _.uniqueId(), someBoolean: true, children: [
  {text: 'child1', id: _.uniqueId(), someBoolean: false},
  {text: 'child2', id: _.uniqueId(), someBoolean: false}
]}));

const testArr = findDeepAnd({
  array: simpleArray,
  predicate: defPredicate('foo0', 'id'),
  update: toggleUpdate('someToggle')
});

describe('findDeepAnd', () => {

  it('should return a new array with a toggled boolean value defined in the update that matches the predicate', () => {

    expect(testArr[0].someToggle).toEqual(true);
  });
});

describe('findDeepAll', () => {

  const findAllFalseSomeBooleans = (array) => findDeepAll({array, predicate: defPredicate(false, 'someBoolean')});
  it('should return all items which match the predicate in a one-dimensional array', () => {

    expect(findAllFalseSomeBooleans(nestedArray).length).toEqual(4)
  });
});


