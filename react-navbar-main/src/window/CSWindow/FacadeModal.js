import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public class SubsystemA {
    public void OperationA() {
        Console.WriteLine("SubsystemA OperationA");
    }
  }

  public class SubsystemB {
    public void OperationB() {
        Console.WriteLine("SubsystemB OperationB");
    }
  }

  public class SubsystemC {
    public void OperationC() {
        Console.WriteLine("SubsystemC OperationC");
    }
  }    `,
  step2: `
  public class Facade {
    private SubsystemA subsystemA;
    private SubsystemB subsystemB;
    private SubsystemC subsystemC;

    public Facade() {
        subsystemA = new SubsystemA();
        subsystemB = new SubsystemB();
        subsystemC = new SubsystemC();
    }

    public void Operation1() {
        Console.WriteLine("Facade Operation1");
        subsystemA.OperationA();
        subsystemB.OperationB();
    }

    public void Operation2() {
        Console.WriteLine("Facade Operation2");
        subsystemB.OperationB();
        subsystemC.OperationC();
    }
  }`,
  step3: `
  class Program {
    static void Main(string[] args) {
        Facade facade = new Facade();

        facade.Operation1();
        facade.Operation2();
    }
  }`,
};
const cdcodes = {
  step1: `
  public class CreditCardPaymentSystem {
    public void ProcessPayment(decimal amount) {
        Console.WriteLine($"Pay {amount} dollars with a credit card.");
    }
  }

  public class EWalletPaymentSystem {
    public void ProcessPayment(string userId, decimal amount) {
        Console.WriteLine($"The user {userId} paid {amount} dollars via an electronic wallet.");
    }
  }

  public class BankTransferSystem {
    public void TransferFunds(string accountNumber, decimal amount) {
        Console.WriteLine($"Transfer {amount} dollars from the accoun {account}");
    }
  }`,
  step2: `
  public class PaymentFacade {
    private CreditCardPaymentSystem creditCardSystem = new CreditCardPaymentSystem();
    private EWalletPaymentSystem eWalletSystem = new EWalletPaymentSystem();
    private BankTransferSystem bankTransferSystem = new BankTransferSystem();

    public void MakePayment(PaymentType type, decimal amount, string account = null, string userId = null) {
        switch (type) {
            case PaymentType.CreditCard:
                creditCardSystem.ProcessPayment(amount);
                break;
            case PaymentType.EWallet:
                eWalletSystem.ProcessPayment(userId, amount);
                break;
            case PaymentType.BankTransfer:
                bankTransferSystem.TransferFunds(account, amount);
                break;
            default:
                throw new ArgumentException("Unsupported payment type");
        }
    }
  }

  public enum PaymentType {
    CreditCard,
    EWallet,
    BankTransfer
  }`,
  step3: `
  class Program {
    static void Main(string[] args) {
        PaymentFacade paymentFacade = new PaymentFacade();

        paymentFacade.MakePayment(PaymentType.CreditCard, 100m);
        paymentFacade.MakePayment(PaymentType.EWallet, 50m, userId: "user123");
        paymentFacade.MakePayment(PaymentType.BankTransfer, 200m, account: "ACC456");
    }
}
`,
};

const HTFacadePattern = ({ onHide, show, state }) => {
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
        <h4>Facade Pattern</h4>
        <p>
          Definition: Defines a high-level interface to a subsystem that makes
          the subsystem easier to use by providing a unified interface for a set
          of interfaces.
        </p>
        <p>
          The Facade pattern is a structural design pattern that simplifies the
          interface to a subsystem by defining a higher-level interface that
          provides a unified access point to a set of interfaces.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/FacadeIma/FacadeClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. **Component:** This is an interface or abstract class that
              defines the operations that an object can execute. In this
              example, Component defines a method called `operation()` that
              returns a string.
            </li>
            <li>
              2. **ConcreteComponent:** This is a concrete class that implements
              the Component interface. It is the basic object that can have
              responsibilities dynamically added to it by decorators.
            </li>
            <li>
              3. **Decorator:** This is an abstract class that also implements
              the Component interface, but it holds a reference to a Component
              object. It can be a concrete Component or another Decorator.
              Decorator redefines the `operation()` method of Component and adds
              additional behavior before or after calling the `operation()`
              method of the Component object it holds.
            </li>
            <li>
              4. **ConcreteDecoratorA** and **ConcreteDecoratorB:** These are
              concrete implementations of Decorator that extend the
              functionality of the Decorator class. They override the
              `operation()` method and add additional behavior when calling the
              `operation()` method of the underlying Component.
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
const EXFacadePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFacadePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Implementation steps of Facade Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the component interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete component classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the abstract decorator class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Create concrete implementations of the decorator.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>
              Step 5: Extend functionality by applying the Decorator pattern.
            </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step5}
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

const CDFacadePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFacadePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Facade Pattern example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
              A typical application of the Facade Pattern is the integration of
              online payment systems. Many e-commerce platforms need to support
              multiple payment methods, such as credit card payments, digital
              wallets, and bank transfers. These payment methods often involve
              complex transaction processes and system interactions. By using
              the Facade Pattern, we can provide a unified and simple interface
              for these complex payment systems, making it easier for
              applications to utilize them.{" "}
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the structure and boundaries of the payment subsystem.</h3>
            <h5>First, we define several subsystems representing different payment methods. </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create the Payment Facade class.</h3>
            <h5>
            Following that, we establish a Payment Facade class to consolidate the control of operations for these payment subsystems and provide a straightforward payment interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Simplify payment operations using the Facade Pattern.</h3>
            <h5>
            By utilizing the Payment Facade, payment operations can be executed without requiring direct interaction with the intricate underlying payment subsystems.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
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

export { CDFacadePattern, EXFacadePattern, HTFacadePattern };
