import stack from "../utils/stack.js";

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 4,
};

function isOperand(val) {
  return !isNaN(val);
}

function infixToPostfix(tokens) {
  const myStack = stack();
  const expression = [];

  tokens.forEach((token, i) => {
    if (isOperand(token)) {
      expression.push(token);
    } else if (token == "(") {
      myStack.push(token);
    } else {
      if (token == ")") {
        while (!myStack.isEmpty() && myStack.peek() != "(") {
          expression.push(myStack.pop());
        }

        myStack.pop();
      } else {
        while (
          !myStack.isEmpty() &&
          precedence[myStack.peek()] >= precedence[token]
        ) {
          expression.push(myStack.pop());
        }

        myStack.push(token);
      }
    }
  });

  // Pop remaining operators in the stack
  while (!myStack.isEmpty()) {
    expression.push(myStack.pop());
  }

  return expression;
}

function evaluatePostfix(postfix) {
  const myStack = stack();

  postfix.forEach((token) => {
    if (isOperand(token)) {
      myStack.push(parseFloat(token)); // push operand
    } else {
      const b = myStack.pop();
      const a = myStack.pop();

      // Perform operation based on the token
      let result;
      switch (token) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = a / b;
          break;
        case "^":
          result = Math.pow(a, b);
          break;
        default:
          break;
      }

      myStack.push(result);
    }
  });

  return myStack.pop(); // Final result after processing all tokens
}

function calculateAns(tokens) {
  const postfix = infixToPostfix(tokens);
  const ans = evaluatePostfix(postfix);
  return ans >= 0 ? ans : "\\\\" + ans;
}

export default calculateAns;
