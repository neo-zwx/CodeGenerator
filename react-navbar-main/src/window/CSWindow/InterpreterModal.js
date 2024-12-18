import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public abstract class AbstractExpression {
    public abstract void Interpret(Context context);
  }    `,
  step2: `
  public class TerminalExpression : AbstractExpression {
    public override void Interpret(Context context) {
        Console.WriteLine("Call the Terminal Expression");
    }
  }

  public class NonterminalExpression : AbstractExpression {
    public override void Interpret(Context context) {
        Console.WriteLine("Call the Nonterminal Expression");
    }
  }`,
  step3: `
  public class Context {
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        Context context = new Context();

        List<AbstractExpression> expressions = new List<AbstractExpression> {
            new TerminalExpression(),
            new NonterminalExpression(),
            new TerminalExpression()
        };

        foreach (var expression in expressions) {
            expression.Interpret(context);
        }
    }
  }  `,
};
const cdcodes = {
  step1: `
  public interface IRuleExpression {
    bool Evaluate(ApplicantData data);
  } `,
  step2: `
  public class AgeRuleExpression : IRuleExpression {
    private int minimumAge;

    public AgeRuleExpression(int minimumAge) {
        this.minimumAge = minimumAge;
    }

    public bool Evaluate(ApplicantData data) {
        return data.Age >= minimumAge;
    }
  }

  public class HealthConditionRuleExpression : IRuleExpression {
    public bool Evaluate(ApplicantData data) {
        return data.HasGoodHealth;
    }
  }`,
  step3: `public class ApplicantData {
    public int Age { get; set; }
    public bool HasGoodHealth { get; set; }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        ApplicantData applicant = new ApplicantData { Age = 30, HasGoodHealth = true };

        IRuleExpression ageRule = new AgeRuleExpression(18);
        IRuleExpression healthRule = new HealthConditionRuleExpression();

        bool isEligible = ageRule.Evaluate(applicant) && healthRule.Evaluate(applicant);

        Console.WriteLine($"Is the applicant in compliance with the insurance regulations?: {isEligible}");
    }
  }   `,
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
            <h2>Steps to implement the Interpreter Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the abstract expression class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement specific expression classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the context class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the Interpreter Pattern.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
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
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Suppose an insurance company needs to evaluate customer insurance applications based on a complex set of business rules to determine whether an application is approved. These rules may involve factors such as age, health condition, and insurance history. Using the Interpreter Pattern, we can build a flexible rule interpreter that evaluates customer application data according to defined rules.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the interface for rule expressions.</h3>
            <h5>Initially, we define an interface for rule expressions that specifies a method to evaluate rules.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement specific rule expression classes.</h3>
            <h5>
            Subsequently, we create specific rule expression classes that implement the defined rule expression interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define a class to represent application data.</h3>
            <h5>Define a class to represent and store customer application data.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Employ the Interpreter pattern to assess insurance applications.</h3>
            <h5>Assess the compliance of customer insurance applications with business rules by utilizing the expression interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>{" "}
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
