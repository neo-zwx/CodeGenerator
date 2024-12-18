import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IImplementor {
    void OperationImpl();
  }`,
  step2: `
  public class ConcreteImplementorA : IImplementor {
    public void OperationImpl() {
        Console.WriteLine("ConcreteImplementorA OperationImpl");
    }
  }

  public class ConcreteImplementorB : IImplementor {
    public void OperationImpl() {
        Console.WriteLine("ConcreteImplementorB OperationImpl");
    }
  }`,
  step3: `
  public abstract class Abstraction {
    protected IImplementor implementor;

    public Abstraction(IImplementor implementor) {
        this.implementor = implementor;
    }

    public abstract void Operation();
  }`,
  step4: `
  public class RefinedAbstraction : Abstraction {
    public RefinedAbstraction(IImplementor implementor) : base(implementor) {}

    public override void Operation() {
        Console.WriteLine("RefinedAbstraction Operation");
        implementor.OperationImpl();
    }
  }   `,
  step5: `
  class Program {
    static void Main(string[] args) {
        IImplementor implementorA = new ConcreteImplementorA();
        Abstraction abstractionA = new RefinedAbstraction(implementorA);
        abstractionA.Operation();

        IImplementor implementorB = new ConcreteImplementorB();
        Abstraction abstractionB = new RefinedAbstraction(implementorB);
        abstractionB.Operation();
    }
  }  `,
};
const cdcodes = {
  step1: `
  public interface IWindowImplementor {
    void DrawWindow(string title);
    void DrawButton(string text);
  } `,
  step2: `
  public class WindowsWindowImplementor : IWindowImplementor {
    public void DrawWindow(string title) {
        Console.WriteLine($"Draw a window on Windows: {title}");
    }

    public void DrawButton(string text) {
        Console.WriteLine($"Draw a button on Windows: {text}");
    }
  }

  public class MacOSWindowImplementor : IWindowImplementor {
    public void DrawWindow(string title) {
        Console.WriteLine($"Draw a window on macOS: {title}");
    }

    public void DrawButton(string text) {
        Console.WriteLine($"Draw a button on macOS: {text}");
    }
  } `,
  step3: `
  public abstract class Window {
    protected IWindowImplementor implementor;

    public Window(IWindowImplementor implementor) {
        this.implementor = implementor;
    }

    public abstract void Draw();
  }`,
  step4: `
  public class ApplicationWindow : Window {
    private string title;

    public ApplicationWindow(IWindowImplementor implementor, string title) : base(implementor) {
        this.title = title;
    }

    public override void Draw() {
        implementor.DrawWindow(title);
        implementor.DrawButton("Confirm");
        implementor.DrawButton("Cancel");
    }
  }`,
  step5: `
  class Program {
    static void Main(string[] args) {
        IWindowImplementor windowsImpl = new WindowsWindowImplementor();
        Window windowsWindow = new ApplicationWindow(windowsImpl, "Example Application");
        windowsWindow.Draw();

        IWindowImplementor macImpl = new MacOSWindowImplementor();
        Window macWindow = new ApplicationWindow(macImpl, "Example Application");
        macWindow.Draw();
    }
  }`,
};

const HTBridgePattern = ({ onHide, show, state }) => {
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
        <h4>Bridge Pattern</h4>
        <p>
          Definition: Separate the abstraction from the implementation so that
          both can evolve independently.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/BridgeIma/BridgeClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Abstraction</code>: This is an abstract class that holds
              a reference to an `Implementation` interface, allowing it to call
              methods from the implementation. It provides a method called{" "}
              <code>operation()</code>, which internally uses `Implementation`
              to perform its functionality.
            </li>
            <li>
              2. <code>ExtendedAbstraction</code>: This is an extension of
              `Abstraction` and also provides the <code>operation()</code>{" "}
              method. It can redefine or extend the behavior of `Abstraction`.
            </li>
            <li>
              3. <code>Implementation</code>: This is an interface that defines
              the operations that implementation classes need to provide. In
              this example, it offers a method called{" "}
              <code>operationImplementation()</code>.
            </li>
            <li>
              4. <code>ConcreteImplementationA</code> and{" "}
              <code>ConcreteImplementationB</code>: These are concrete classes
              that implement the `Implementation` interface. They provide
              specific implementations of the{" "}
              <code>operationImplementation()</code> method. These concrete
              implementations can have entirely different internal workings.
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
const EXBridgePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXBridgePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Bridge Pattern Implementation Steps</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Implementation Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Implementation Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the Abstraction Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Implement Concrete Abstraction Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Use the Bridge Pattern</h3>
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

const CDBridgePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXBridgePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Bridge Pattern Example</h2>
            <br></br>
            <h3>Context：</h3>
            <p>
              Suppose a software development company needs to create an
              application that must run on different operating systems (such as
              Windows, macOS, Linux) while maintaining a consistent user
              interface and experience across all platforms. By using the Bridge
              Pattern, we can separate the high-level business logic (the
              abstraction) from the platform-specific implementations (the
              implementation). This allows the application to run on various
              platforms without requiring changes to the business logic.{" "}
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Window Implementation Interface</h3>
            <h5>
            First, we define a window implementation interface that declares methods for drawing GUI elements like windows and buttons on different platforms.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Platform-Specific Window Classes</h3>
            <h5>
            Next, create concrete platform-specific window classes for each supported operating system, implementing the window implementation interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the Abstract Window Class</h3>
            <h5>
            Then, define an abstract window class that contains a reference to the window implementation interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Implement Concrete Window Classes</h3>
            <h5>
            Create concrete window classes for the application that inherit from the abstract window class and implement its drawing methods.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Use the Bridge Pattern to Implement a Cross-Platform Window System</h3>
            <h5>
            Choose the concrete window implementation based on the target operating system and use it through the abstract window class.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step5}
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

export { CDBridgePattern, EXBridgePattern, HTBridgePattern };
