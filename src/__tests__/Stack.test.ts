import { Stack } from '../Stack';

test('Stack should work as expected', () => {
  const stack = new Stack<number>();

  expect(stack.peek()).toBe(undefined);
  expect(stack.length).toBe(0);

  const values = [1, 10, 20, 30];

  for (const val of values) {
    const l = stack.length;
    stack.push(val);
    expect(stack.length).toBe(l + 1);
  }

  for (let i = values.length - 1; i >= 0; i--) {
    const l = stack.length;
    expect(stack.peek()).toBe(values[i]);
    expect(stack.pop()).toBe(values[i]);
    expect(stack.length).toBe(l - 1);
  }

  expect(stack.peek()).toBe(undefined);
  expect(stack.length).toBe(0);
});
