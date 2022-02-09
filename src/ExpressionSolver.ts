import { Stack } from './Stack';

const OP_TOKENS = ['+', '-', '*', '/', '(', ')'] as const;
type OpToken = typeof OP_TOKENS[number];

function isOpToken(s: string): s is OpToken {
  return OP_TOKENS.includes(s as OpToken);
}

const Priority = {
  '/': 3,
  '*': 2,
  '-': 1,
  '+': 0,
  '(': -1,
  ')': -1,
} as const;

/**
 * Apply the operation with the given parameters
 *
 * Complexity - O(1)
 * @param op
 * @param v1
 * @param v2
 * @returns
 */
function applyOperation(op: OpToken, v1: number, v2: number): number | undefined {
  if (!v1 || !v2 || !op) return undefined;
  if (op === '(' || op === ')') return undefined;

  switch (op) {
    case '+':
      return v1 + v2;
    case '-':
      return v1 - v2;
    case '*':
      return v1 * v2;
    case '/':
      return v1 / v2;
  }
}

/**
 * Checks if the given expression is a valid expression
 *
 * Complexity - O(n)
 * @param expression
 * @returns
 */
export function isValid(expression: string) {
  let current = '';
  let parenthesisCount = 0;

  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];

    // Number or possible negative number
    if (!isOpToken(c) || (c === '-' && isOpToken(expression[i - 1]) && expression[i - 1] !== ')')) {
      current += c;
      continue;
    }

    // Check if the current value is a valid number
    if (current === '' && c !== '(' && expression[i - 1] !== ')') return false;
    if (isNaN(Number(current))) return false;

    current = '';

    if (c === '(') {
      parenthesisCount++;
    } else if (c === ')') {
      parenthesisCount--;

      // Parenthesis do not match
      if (parenthesisCount < 0) return false;
    }
  }

  if (current === '' && expression[expression.length - 1] !== ')') return false;
  if (isNaN(Number(current))) return false;

  return true;
}

/**
 * Solves the given mathematical expression, if the expression is invalid will return undefined
 *
 * Complexity - O(n)
 * @param expression
 * @returns
 */
export function solve(expression: string): number | undefined {
  if (!isValid(expression)) return undefined;

  const valuesStack = new Stack<number>();
  const opStack = new Stack<OpToken>();

  let current = '';

  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];

    // Number or possible negative number
    if (!isOpToken(c) || (c === '-' && isOpToken(expression[i - 1]) && expression[i - 1] !== ')')) {
      current += c;
      continue;
    }

    if (current !== '') valuesStack.push(Number(current));
    current = '';

    if (c === '(') {
      opStack.push(c);
      continue;
    }

    if (c === ')') {
      while (opStack.peek() !== '(') {
        const op = opStack.pop()!;
        const [v2, v1] = [valuesStack.pop()!, valuesStack.pop()!];
        const res = applyOperation(op, v1, v2);

        if (!res) return undefined;
        valuesStack.push(res);
      }

      // Remove the "("
      opStack.pop();
      continue;
    }

    while (opStack.length > 0 && Priority[c] < Priority[opStack.peek()!]) {
      const op = opStack.pop()!;
      const [v2, v1] = [valuesStack.pop()!, valuesStack.pop()!];
      const res = applyOperation(op, v1, v2);

      if (!res) return undefined;
      valuesStack.push(res);
    }

    opStack.push(c);
  }

  if (current !== '') valuesStack.push(Number(current));

  while (opStack.length > 0) {
    const op = opStack.pop()!;
    const [v2, v1] = [valuesStack.pop()!, valuesStack.pop()!];
    const res = applyOperation(op, v1, v2);

    if (!res) return undefined;
    valuesStack.push(res);
  }

  return valuesStack.pop();
}
