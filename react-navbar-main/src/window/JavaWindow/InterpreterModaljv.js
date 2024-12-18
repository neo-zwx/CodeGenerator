import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Expression {
    int interpret();
  }
    `,
  step2: `
  public class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    @Override
    public int interpret() {
        return number;
    }
  }

  public class AddExpression implements Expression {
    private Expression leftExpression;
    private Expression rightExpression;

    public AddExpression(Expression leftExpression, Expression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }

    @Override
    public int interpret() {
        return leftExpression.interpret() + rightExpression.interpret();
    }
  }

  public class SubtractExpression implements Expression {
    private Expression leftExpression;
    private Expression rightExpression;

    public SubtractExpression(Expression leftExpression, Expression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }

    @Override
    public int interpret() {
        return leftExpression.interpret() - rightExpression.interpret();
    }
  }
`,
  step3: `
  public class InterpreterPatternDemo {
    public static void main(String[] args) {
        Expression number1 = new NumberExpression(3);
        Expression number2 = new NumberExpression(5);
        Expression number3 = new NumberExpression(2);

        Expression addExpression = new AddExpression(number1, number2);
        Expression subtractExpression = new SubtractExpression(addExpression, number3);

        int result = subtractExpression.interpret();
        System.out.println("Result: " + result);  // 输出：Result: 6
    }
  }
`,
};
const cdcodes = {
  step1: `
  public interface Expression {
    boolean interpret();
  }
`,
  step2: `
  public class BooleanExpression implements Expression {
    private boolean value;

    public BooleanExpression(boolean value) {
        this.value = value;
    }

    @Override
    public boolean interpret() {
        return value;
    }
  }

  public class AndExpression implements Expression {
    private Expression leftExpression;
    private Expression rightExpression;

    public AndExpression(Expression leftExpression, Expression rightExpression) {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }

    @Override
    public boolean interpret() {
        return leftExpression.interpret() && rightExpression.interpret();
    }
  }

  public class OrExpression implements Expression {
    private Expression leftExpression;
    private Expression rightExpression;

    public OrExpression(Expression leftExp
`,
  step3: `
  public class InterpreterPatternDemo {
    public static void main(String[] args) {
        Expression trueExpr = new BooleanExpression(true);
        Expression falseExpr = new BooleanExpression(false);

        Expression andExpression = new AndExpression(trueExpr, falseExpr);
        Expression orExpression = new OrExpression(andExpression, trueExpr);

        boolean result = orExpression.interpret();
        System.out.println("Result: " + result);  // 输出：Result: true
    }
  }
`,
};

const HTInterpreterPattern = ({ onHide, show, state }) => {
  useEffect(() => {
    const updateModalPosition = () => {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const modalHeight = modalElement.clientHeight;

        // 確保 modal 在可視範圍內並適當調整位置
        const topPosition = scrollY + (windowHeight - modalHeight) / 2;
        modalElement.style.top = `${
          topPosition > scrollY ? topPosition : scrollY + 20
        }px`;
      }
    };

    if (show) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition);
    }

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
  }, [show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {state === "editing" ? "Introduce" : "介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Interpreter Pattern</h4>
        <p>
          Definition: A representation of a language's grammar is given, and an
          interpreter is defined that uses this representation to interpret
          sentences in the language.
        </p>
        <p>
          The Interpreter pattern is a behavioral design pattern that defines a
          grammar for a language and provides an interpreter to interpret
          sentences in that language. This pattern is commonly used in systems
          that frequently process languages.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/InterpreterIma/InterpreterClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Expression</code> is an abstract interface representing
              an expression. It defines an
              <code>interpret(context: string): boolean</code> method, used to
              interpret the expression based on a specific context.
            </li>
            <li>
              2. <code>TerminalExpression</code> is a terminal expression
              implementing the <code>Expression</code> interface. It contains a
              private <code>data</code> attribute and implements the
              <code>interpret(context: string): boolean</code> method, used to
              interpret the expression based on whether the context contains
              specific data.
            </li>
            <li>
              3. <code>OrExpression</code> is an OR expression implementing the
              <code>Expression</code> interface. It contains two
              sub-expressions, <code>expr1</code> and <code>expr2</code>, and
              implements the <code>interpret(context: string): boolean</code>
              method, used to perform an OR operation based on the
              interpretation results of its sub-expressions.
            </li>
            <li>
              4. <code>AndExpression</code> is an AND expression implementing
              the <code>Expression</code> interface. It also contains two
              sub-expressions, <code>expr1</code> and <code>expr2</code>, and
              implements the <code>interpret(context: string): boolean</code>
              method, used to perform an AND operation based on the
              interpretation results of its sub-expressions.
            </li>
            <li>
              5. Client code can use a concrete creator class to call the
              <code>factoryMethod()</code> method to create the required
              concrete product objects.
            </li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const EXInterpreterPattern = ({ onHide, show, state }) => {
  useEffect(() => {
    const updateModalPosition = () => {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const modalHeight = modalElement.clientHeight;

        // 確保 modal 在可視範圍內並適當調整位置
        const topPosition = scrollY + (windowHeight - modalHeight) / 2;
        modalElement.style.top = `${
          topPosition > scrollY ? topPosition : scrollY + 20
        }px`;
      }
    };

    if (show) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition);
    }

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
  }, [show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="EXInterpreterPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Interpreter Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the abstract expression interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete expression classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Interpreter Pattern to interpret expressions.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CDInterpreterPattern = ({ onHide, show, state }) => {
  useEffect(() => {
    const updateModalPosition = () => {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const modalHeight = modalElement.clientHeight;

        // 確保 modal 在可視範圍內並適當調整位置
        const topPosition = scrollY + (windowHeight - modalHeight) / 2;
        modalElement.style.top = `${
          topPosition > scrollY ? topPosition : scrollY + 20
        }px`;
      }
    };

    if (show) {
      updateModalPosition();
      window.addEventListener("resize", updateModalPosition);
    }

    return () => {
      window.removeEventListener("resize", updateModalPosition);
    };
  }, [show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="EXInterpreterPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Interpreter Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Create an Expression interface.</h3>
            <h5>Firstly, define an abstract expression interface, declaring the methods that all expression classes must implement.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete expression classes.</h3>
            <h5>Next, implement concrete expression classes, each of which implements the Expression interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Interpreter Pattern to interpret Boolean expressions.</h3>
            <h5>In the client code, use the Interpreter Pattern to parse and evaluate Boolean expressions.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CDInterpreterPattern, EXInterpreterPattern, HTInterpreterPattern };
