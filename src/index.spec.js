/* global describe, it, expect, test */
const {findDeepAnd, toggleUpdate, updateChildren, setOne, defPredicate} = require('./index');
const _ = require('lodash');

const simpleArray = [{id: 'foo0', someToggle: false}, {id: 'foo1', someToggle: true}, {id: 'foo2', someToggle: false}];

const nestedArray = s => ({text: s, id: _.uniqueId(), children: [
  {text: 'child1', id: 'child1', someBoolean: false},
  {text: 'child2', id: 'child2', someBoolean: false}
]});


describe('findDeepAnd', () => {

  it('should return a new array with a toggled boolean value defined in the update that matches the predicate', () => {
    const newArr = findDeepAnd({
      array: simpleArray,
      predicate: defPredicate('foo0', 'id'),
      update: toggleUpdate('someToggle')
    });

    expect(newArr[0].someToggle).toEqual(true);
  });
});
