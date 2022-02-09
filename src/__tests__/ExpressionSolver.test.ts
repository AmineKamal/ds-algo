import { isValid, solve } from '../ExpressionSolver';

test('isValid function should work properly', () => {
  expect(isValid('')).toBe(false);
  expect(isValid('+')).toBe(false);
  expect(isValid('+5')).toBe(false);
  expect(isValid('2k5')).toBe(false);
  expect(isValid('5+hello')).toBe(false);
  expect(isValid('5+0-')).toBe(false);
  expect(isValid('(+)')).toBe(false);
  expect(isValid('(5+4)+7)')).toBe(false);

  expect(isValid('55')).toBe(true);
  expect(isValid('(55)')).toBe(true);
  expect(isValid('(5+4)+7')).toBe(true);
  expect(isValid('(5+4)+(7*4)')).toBe(true);
  expect(isValid('5+34')).toBe(true);
  expect(isValid('5+34*7')).toBe(true);
  expect(isValid('5+34*-7')).toBe(true);
});

test('solve function should work properly', () => {
  expect(solve('')).toBe(undefined);
  expect(solve('+')).toBe(undefined);
  expect(solve('+5')).toBe(undefined);
  expect(solve('2k5')).toBe(undefined);
  expect(solve('5+hello')).toBe(undefined);
  expect(solve('5+0-')).toBe(undefined);
  expect(solve('(+)')).toBe(undefined);
  expect(solve('(5+4)+7)')).toBe(undefined);

  expect(solve('55')).toBe(55);
  expect(solve('(55)')).toBe(55);
  expect(solve('(5+4)+7')).toBe(5 + 4 + 7);
  expect(solve('(5+4)+(7*4)')).toBe(5 + 4 + 7 * 4);
  expect(solve('5+34')).toBe(5 + 34);
  expect(solve('5+34*7')).toBe(5 + 34 * 7);
  expect(solve('500/25+5')).toBe(500 / 25 + 5);
  expect(solve('5+34*-7')).toBe(5 + 34 * -7);
  expect(solve('55+43-97+45')).toBe(55+43-97+45);
});
