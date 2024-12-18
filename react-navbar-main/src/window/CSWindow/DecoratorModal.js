import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IComponent {
    void Operation();
  }     `,
  step2: `
  public class ConcreteComponent : IComponent {
    public void Operation() {
        Console.WriteLine("ConcreteComponent Operation");
    }
  }`,
  step3: `
  public abstract class Decorator : IComponent {
    protected IComponent component;

    public Decorator(IComponent component) {
        this.component = component;
    }

    public virtual void Operation() {
        component.Operation();
    }
  }`,
  step4: `
  public class ConcreteDecoratorA : Decorator {
    public ConcreteDecoratorA(IComponent component) : base(component) {}

    public override void Operation() {
        base.Operation();
        AddedBehavior();
    }

    private void AddedBehavior() {
        Console.WriteLine("ConcreteDecoratorA AddedBehavior");
    }
  }

  public class ConcreteDecoratorB : Decorator {
    public ConcreteDecoratorB(IComponent component) : base(component) {}

    public override void Operation() {
        base.Operation();
        AddedBehavior();
    }

    private void AddedBehavior() {
        Console.WriteLine("ConcreteDecoratorB AddedBehavior");
    }
  } `,
  step5: `
  class Program {
    static void Main(string[] args) {
        IComponent component = new ConcreteComponent();
        Decorator decoratorA = new ConcreteDecoratorA(component);
        Decorator decoratorB = new ConcreteDecoratorB(decoratorA);

        decoratorB.Operation();
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface IProduct {
    string GetDescription();
    decimal GetPrice();
  } `,
  step2: `
  public class BasicComputer : IProduct {
    public string GetDescription() {
        return "BasicComputer";
    }

    public decimal GetPrice() {
        return 5000m; 
    }
  }`,
  step3: `
  public abstract class ProductDecorator : IProduct {
    protected IProduct product;

    public ProductDecorator(IProduct product) {
        this.product = product;
    }

    public abstract string GetDescription();
    public abstract decimal GetPrice();
  }`,
  step4: `
  public class ExtraMemoryDecorator : ProductDecorator {
    public ExtraMemoryDecorator(IProduct product) : base(product) {}

    public override string GetDescription() {
        return product.GetDescription() + " + ExtraMemoryDecorator";
    }

    public override decimal GetPrice() {
        return product.GetPrice() + 800m; 
    }
  }

  public class HighEndCpuDecorator : ProductDecorator {
    public HighEndCpuDecorator(IProduct product) : base(product) {}

    public override string GetDescription() {
        return product.GetDescription() + " + HighEndCpuDecorator";
    }

    public override decimal GetPrice() {
        return product.GetPrice() + 1500m; 
    }
  }  `,

  step5: `
  class Program {
    static void Main(string[] args) {
        IProduct computer = new BasicComputer();
        Console.WriteLine($"{computer.GetDescription()}'s price {computer.GetPrice()}");

        computer = new ExtraMemoryDecorator(computer);
        Console.WriteLine($"{computer.GetDescription()}'s price {computer.GetPrice()}");

        computer = new HighEndCpuDecorator(computer);
        Console.WriteLine($"{computer.GetDescription()}'s price {computer.GetPrice()}");
    }
  }  `,
};

const HTDecoratorPattern = ({ onHide, show, state }) => {
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
        <h4>Decorator Pattern</h4>
        <p>
          Definition: The Decorator pattern provides a flexible alternative to
          inheritance by dynamically adding responsibilities to an object at
          runtime.
        </p>
        <p>
          The Decorator pattern is a structural design pattern used to
          dynamically add new functionalities to an object.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/DecoratorIma/DecoratorClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Component</code>: This is an interface or abstract class
              that defines the operations that an object can perform. In this
              example, Component defines a method called{" "}
              <code>operation()</code> that returns a string.
            </li>
            <li>
              2. <code>ConcreteComponent</code>: This is a concrete class that
              implements the Component interface. It is the basic object that
              can have responsibilities dynamically added to it by decorators.
            </li>
            <li>
              3. <code>Decorator</code>: This is an abstract class that also
              implements the Component interface but holds a reference to a
              Component object. It can be a concrete Component or another
              Decorator. Decorator redefines the Component's{" "}
              <code>operation()</code> method and adds additional behavior
              before or after calling the <code>operation()</code> method of the
              Component it holds.
            </li>
            <li>
              4. <code>ConcreteDecoratorA</code> and{" "}
              <code>ConcreteDecoratorB</code>: These are concrete
              implementations of Decorator that extend the functionality of the
              Decorator class. They override the <code>operation()</code> method
              and add additional behavior while calling the base Component's{" "}
              <code>operation()</code> method.
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
const EXDecoratorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXDecoratorPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Implementation Steps for Decorator Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the interface for the component.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>
              Step 2: Create the concrete implementation of the component.
            </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Create the abstract decorator class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Create the concrete decorator implementation.</h3>
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

const CDDecoratorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXDecoratorPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Decorator Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
              Consider a company that sells computers. Customers are able to
              select a fundamental computer configuration and subsequently
              append additional configurations as per their requirements, such
              as an enhanced hard drive, a more robust processor, or
              supplementary memory. By leveraging the Decorator pattern, we can
              empower customers to initiate with a foundational model and
              incrementally incorporate extra configurations, culminating in a
              tailored product.{" "}
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Create an interface to represent product components.</h3>
            <h5>
            First, we define a product component interface that declares methods for getting the product description and price.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create the concrete implementation for the basic computer.</h3>
            <h5>Following that, we create a specific class for a basic computer as our starting point.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Create an abstract class to represent configuration decorators.</h3>
            <h5>
            Following that, an abstract configuration decorator class is defined. This class encapsulates a reference to a product and adheres to the product component interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Create concrete implementations for configuration decorators.</h3>
            <h5>
            Implement concrete configuration decorator classes to inherit from the abstract decorator class. These classes enhance the basic computer with additional configurations.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Apply the Decorator pattern to dynamically customize computer configurations.</h3>
            <h5>Dynamically combine computers and configurations.</h5>
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

export { CDDecoratorPattern, EXDecoratorPattern, HTDecoratorPattern };
