import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface DrawingAPI {
    void drawCircle(double x, double y, double radius);
  }      `,
  step2: `
  public class DrawingAPI1 implements DrawingAPI {
    @Override
    public void drawCircle(double x, double y, double radius) {
        System.out.println("DrawingAPI1: Circle at (" + x + ", " + y + ") with radius " + radius);
    }
  }

  public class DrawingAPI2 implements DrawingAPI {
    @Override
    public void drawCircle(double x, double y, double radius) {
        System.out.println("DrawingAPI2: Circle at (" + x + ", " + y + ") with radius " + radius);
    }
  } `,
  step3: `
  public abstract class Shape {
    protected DrawingAPI drawingAPI;

    protected Shape(DrawingAPI drawingAPI) {
        this.drawingAPI = drawingAPI;
    }

    public abstract void draw();
    public abstract void resizeByPercentage(double pct);
  }`,
  step4: `
  public class CircleShape extends Shape {
    private double x, y, radius;

    public CircleShape(double x, double y, double radius, DrawingAPI drawingAPI) {
        super(drawingAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    @Override
    public void draw() {
        drawingAPI.drawCircle(x, y, radius);
    }

    @Override
    public void resizeByPercentage(double pct) {
        radius *= (1 + pct / 100.0);
    }
  }  `,
  step5: `
  public class BridgePatternDemo {
    public static void main(String[] args) {
        Shape circle1 = new CircleShape(5, 10, 7, new DrawingAPI1());
        circle1.draw();
        circle1.resizeByPercentage(10);
        circle1.draw();
        
        Shape circle2 = new CircleShape(15, 20, 10, new DrawingAPI2());
        circle2.draw();
        circle2.resizeByPercentage(20);
        circle2.draw();
    }
  }
   `,
};
const cdcodes = {
  step1: `
  public interface UIImplementation {
    void drawButton(String text);
  } `,
  step2: `
  public class WindowsUI implements UIImplementation {
    @Override
    public void drawButton(String text) {
        System.out.println("Drawing button on Windows with text: " + text);
    }
  }

  public class MacUI implements UIImplementation {
    @Override
    public void drawButton(String text) {
        System.out.println("Drawing button on Mac with text: " + text);
    }
  }`,
  step3: `
  public abstract class UIComponent {
    protected UIImplementation uiImplementation;

    protected UIComponent(UIImplementation uiImplementation) {
        this.uiImplementation = uiImplementation;
    }

    public abstract void draw();
  }`,
  step4: `
  public class Button extends UIComponent {
    private String text;

    public Button(String text, UIImplementation uiImplementation) {
        super(uiImplementation);
        this.text = text;
    }

    @Override
    public void draw() {
        uiImplementation.drawButton(text);
    }
  }  `,
  step5: `
  public class BridgePatternDemo {
    public static void main(String[] args) {
        UIComponent windowsButton = new Button("Submit", new WindowsUI());
        windowsButton.draw();
        
        UIComponent macButton = new Button("Submit", new MacUI());
        macButton.draw();
    }
  }
  `,
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
          Definition: Efficiently supporting a large number of fine-grained
          objects through the use of shared technology.。
        </p>
        <p>
          The Bridge pattern is a structural design pattern used to efficiently
          support the reuse of a large number of fine-grained objects through
          sharing. This pattern is typically employed to optimize performance
          and memory usage, especially when an application involves a large
          number of objects, most of whose states can be shared.{" "}
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
              1. <code>Abstraction</code>: This is the interface or abstract
              class that defines the high-level operations. It contains a
              reference to an implementation object (i.e., a bridge). The
              Abstraction usually delegates the work to the implementation
              object.
            </li>
            <li>
              2. <code>RefinedAbstraction</code>: This is a subclass of the
              Abstraction that extends or refines the interface defined by the
              Abstraction. It may add additional functionalities or modify the
              existing ones.
            </li>
            <li>
              3. <code>Implementor</code>: This is the interface or abstract
              class for the implementation. It defines the methods that the
              Abstraction will use. This interface is separate from the
              Abstraction and focuses on the actual implementation details..
            </li>
            <li>
              4. <code>ConcreteImplementor</code>: These are concrete classes
              that implement the Implementor interface. They provide specific
              implementations for the methods defined in the Implementor
              interface.
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
            <h2>Steps to implements Bridge Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Bridge Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement the Concrete Bridge Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the Abstract Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement the Concrete Abstract Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the `Bridge`</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step5}
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
          </div>
          <div className="step">
            <h3>Step 1: Define an interface for implementation.</h3>
            <h5>
              Initially, we establish an abstract interface for rendering UI
              elements. Concrete UI classes must inherit from this interface.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete implementation classes.</h3>
            <h5>
              Create specific UI implementation classes that provide
              platform-specific rendering methods for UI components.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Create an abstract class.</h3>
            <h5>
              This class contains a reference to the UI implementation interface
              and declares an abstract draw method.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement concrete subclasses.</h3>
            <h5>
              Implement concrete subclasses of the abstract class, using
              different UI implementations to render specific UI components.{" "}
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Employ the Bridge Pattern.</h3>
            <h5>
              In client code, we can utilize different platform implementations
              to render buttons.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step5}
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

export { CDBridgePattern, EXBridgePattern, HTBridgePattern };
