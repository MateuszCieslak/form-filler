import { addPopertyByPath } from '../src/object.helper';

test('Assing single property', () => {
    const result = addPopertyByPath({}, 'label', 'val');
    expect(result).toStrictEqual({ label: 'val' });
});

test('Assing nested single property', () => {
    const result = addPopertyByPath({}, 'foo.bar', 'some string');
    expect(result).toStrictEqual({ foo: { bar: 'some string' }});
});

test('Assing nested single property to existing object with other property', () => {
    const result = addPopertyByPath({ name: 'some'}, 'foo.bar', 'some string');
    expect(result).toStrictEqual({ name: 'some', foo: { bar: 'some string' }});
});

test('Assing nested single property nested object', () => {
    const result = addPopertyByPath({ foo: { bar: 1 }}, 'foo.bar2', 'some string');
    expect(result).toStrictEqual({foo: { bar: 1, bar2: 'some string' }});
});

test('Create simple array and assing value to it', () => {
    const result = addPopertyByPath({}, 'foo.bar[0]', 'some string');
    expect(result).toStrictEqual({foo: { bar: ['some string'] }});
});

test('Assing value to simple array at index 1', () => {
    const result = addPopertyByPath({ foo: { bar: ['x'] } }, 'foo.bar[1]', 'some string');
    expect(result).toStrictEqual({foo: { bar: ['x', 'some string'] }});
});

test('Assing object to simple array', () => {
    const result = addPopertyByPath({}, 'foo.bar[0].val', 'some string');
    expect(result).toStrictEqual({foo: { bar: [{val: 'some string'}] }});
});

test('Add object to array', () => {
    const result = addPopertyByPath({ foo: [ {val: '1'} ]}, 'foo[1].val', '2');
    expect(result).toStrictEqual({foo: [{val: '1'},{val: '2'}] });
});

test('Update object inside array', () => {
    const result = addPopertyByPath({ foo: { bar: [{ name: 'name' }] } }, 'foo.bar[0].val', 'some string');
    expect(result).toStrictEqual({foo: { bar: [{name: 'name', val: 'some string'}] }});
});