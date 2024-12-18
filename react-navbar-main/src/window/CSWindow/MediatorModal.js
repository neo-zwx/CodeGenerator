import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Mediator {
    void send(String message, Colleague colleague);
  }      `,
  step2: `
  public abstract class Colleague {
    protected Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    public abstract void send(String message);
    public abstract void receive(String message);
  }`,
  step3: `
  public class ConcreteColleague1 extends Colleague {
    public ConcreteColleague1(Mediator mediator) {
        super(mediator);
    }

    public void send(String message) {
        mediator.send(message, this);
    }

    public void receive(String message) {
        System.out.println("ConcreteColleague1 received: " + message);
    }
  }

  public class ConcreteColleague2 extends Colleague {
    public ConcreteColleague2(Mediator mediator) {
        super(mediator);
    }

    public void send(String message) {
        mediator.send(message, this);
    }

    public void receive(String message) {
        System.out.println("ConcreteColleague2 received: " + message);
    }
  }`,
  step4: `
  public class ConcreteMediator implements Mediator {
    private ConcreteColleague1 colleague1;
    private ConcreteColleague2 colleague2;

    public void setColleague1(ConcreteColleague1 colleague1) {
        this.colleague1 = colleague1;
    }

    public void setColleague2(ConcreteColleague2 colleague2) {
        this.colleague2 = colleague2;
    }

    public void send(String message, Colleague colleague) {
        if (colleague == colleague1) {
            colleague2.receive(message);
        } else {
            colleague1.receive(message);
        }
    }
  }  `,
  step5: `
  public class MediatorPatternDemo {
    public static void main(String[] args) {
        ConcreteMediator mediator = new ConcreteMediator();

        ConcreteColleague1 colleague1 = new ConcreteColleague1(mediator);
        ConcreteColleague2 colleague2 = new ConcreteColleague2(mediator);

        mediator.setColleague1(colleague1);
        mediator.setColleague2(colleague2);

        colleague1.send("Hello, World! (from colleague1)");
        colleague2.send("Hello, World! (from colleague2)");
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface ERPSystem {
    void notify(Module module, String event);
  }`,
  step2: `
  public abstract class Module {
    protected ERPSystem system;

    public Module(ERPSystem system) {
        this.system = system;
    }

    public abstract void receive(String message);
  }`,
  step3: `
  public class InventoryModule extends Module {
    public InventoryModule(ERPSystem system) {
        super(system);
    }

    public void receive(String message) {
        System.out.println("Inventory Module received: " + message);
    }
  }

  public class OrderModule extends Module {
    public OrderModule(ERPSystem system) {
        super(system);
    }

    public void receive(String message) {
        System.out.println("Order Module received: " + message);
        system.notify(this, "Order Processed");
    }
  }

  public class FinanceModule extends Module {
    public FinanceModule(ERPSystem system) {
        super(system);
    }

    public void receive(String message) {
        System.out.println("Finance Module received: " + message);
    }
  }`,
  step4: `
  public class ERPSystemImpl implements ERPSystem {
    private InventoryModule inventory;
    private OrderModule order;
    private FinanceModule finance;

    public void setInventoryModule(InventoryModule inventory) {
        this.inventory = inventory;
    }

    public void setOrderModule(OrderModule order) {
        this.order = order;
    }

    public void setFinanceModule(FinanceModule finance) {
        this.finance = finance;
    }

    public void notify(Module module, String event) {
        if (module instanceof OrderModule && "Order Processed".equals(event)) {
            inventory.receive("Update inventory for new order.");
            finance.receive("Generate invoice for new order.");
        }
    }
  }  `,
  step5: `
  public class ERPDemo {
    public static void main(String[] args) {
        ERPSystemImpl system = new ERPSystemImpl();

        InventoryModule inventoryModule = new InventoryModule(system);
        OrderModule orderModule = new OrderModule(system);
        FinanceModule financeModule = new FinanceModule(system);

        system.setInventoryModule(inventoryModule);
        system.setOrderModule(orderModule);
        system.setFinanceModule(financeModule);

        orderModule.receive("New order placed.");
    }
  } `,
};

const HTMediatorPattern = ({ onHide, show, state }) => {
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
        <h4>Mediator Pattern</h4>
        <p>
          Definition: A Mediator defines an object that encapsulates how a set
          of objects interact. The mediator promotes loose coupling by
          preventing objects from referring to each other directly, and it
          allows for the independent variation of object interactions.  
        </p>
        <p>
          A Mediator is a behavioral design pattern that defines an object to
          encapsulate how a set of objects interact. This pattern promotes loose
          coupling by preventing objects from referring to each other directly.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/MediatorIma/MediatorClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Mediator</code> interface represents a mediator and
              defines a <code>notify()</code> method for notifying the mediator
              of events.
            </li>
            <li>
              2. The <code>BaseComponent</code> class is a base component that
              provides basic functionality to store a mediator instance in a
              component object.
            </li>
            <li>
              3. The <code>Component1</code> and <code>Component2</code> classes
              are concrete components that implement various functionalities.
              They do not depend on other components or on the specific mediator
              class.
            </li>
            <li>
              4. The <code>ConcreteMediator</code> class is a concrete mediator
              that implements the <code>Mediator</code> interface. The
              <code>ConcreteMediator</code> class coordinates the behavior of
              several components. It contains references to
              <code>Component1</code> and <code>Component2</code> and triggers
              corresponding operations by calling their methods.
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
const EXMediatorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXMediatorPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implement the Mediator Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Mediator interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create the Colleague class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement specific Colleague classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Implement a specific Mediator class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Apply the Mediator Pattern</h3>
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

const CDMediatorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXMediatorPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Mediator Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            The Mediator pattern is employed to streamline communication among diverse system components, ensuring their autonomy and reusability. This design pattern is exceptionally well-suited for crafting extensive enterprise applications that necessitate interaction between numerous modules or services while minimizing direct interdependencies.
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Mediator interface. </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create a Module class. </h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement specific Module classes.</h3>
            <h5>Next, create a specific character class that implements the character interface. This class will provide a concrete implementation for the character's behavior.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Implement a specific Mediator class. This class will coordinate the interactions between the concrete Module classes.</h3>
            <h5>
            Next, we'll create a character factory class. This class will be dedicated to instantiating and managing the Mediator object specifically designed for character interactions.          </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Apply the Mediator pattern.</h3>
            <h5>Retrieve the shared character Mediator objects using the character factory and subsequently display them.</h5>
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

export { CDMediatorPattern, EXMediatorPattern, HTMediatorPattern };
