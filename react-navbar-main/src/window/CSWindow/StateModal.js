import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IState {
    void Handle(Context context);
  }    `,
  step2: `
  public class ConcreteStateA : IState {
    public void Handle(Context context) {
        Console.WriteLine("In state A");
        context.State = new ConcreteStateB();
    }
  }

  public class ConcreteStateB : IState {
    public void Handle(Context context) {
        Console.WriteLine("In state B");
        context.State = new ConcreteStateA();
    }
  }`,
  step3: `
  public class Context {
    private IState state;

    public Context(IState state) {
        this.state = state;
    }

    public IState State {
        get { return state; }
        set { state = value; }
    }

    public void Request() {
        state.Handle(this);
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        Context context = new Context(new ConcreteStateA());

        context.Request();  // Output: In state A, and switching to state B
        context.Request();  // Output: In state B, and switching to state A
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface IOrderState {
    void Proceed(OrderContext context);
  } `,
  step2: `
  public class NewOrderState : IOrderState {
    public void Proceed(OrderContext context) {
        Console.WriteLine("Order has been created.。");
        context.State = new PaidOrderState();
    }
  }

  public class PaidOrderState : IOrderState {
    public void Proceed(OrderContext context) {
        Console.WriteLine("Order has been paid。");
        context.State = new ShippedOrderState();
    }
  }

  public class ShippedOrderState : IOrderState {
    public void Proceed(OrderContext context) {
        Console.WriteLine("Order has been shipped.");
        context.State = new CompletedOrderState();
    }
  }

  public class CompletedOrderState : IOrderState {
    public void Proceed(OrderContext context) {
        Console.WriteLine("Order has been finished.");
    }
  }`,
  step3: `
  public class OrderContext {
    public IOrderState State { get; set; }

    public OrderContext(IOrderState state) {
        State = state;
    }

    public void NextState() {
        State.Proceed(this);
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        OrderContext order = new OrderContext(new NewOrderState());

        order.NextState();  
        order.NextState();  
        order.NextState();  
        order.NextState();  
    }
  }   `,
};

const HTStatePattern = ({ onHide, show, state }) => {
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
        <h4>State Pattern</h4>
        <p>
          Definition: The State Pattern is a behavioral design pattern that
          allows an object to change its behavior when its internal state
          changes. The object will appear to change its class. This pattern is
          useful for managing state-specific behaviors and transitions between
          states.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/StateIma/StateClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>State</code> interface represents a state and defines
              a <code>handle()</code> method for handling state-related
              operations.
            </li>
            <li>
              2. The <code>ConcreteStateA</code> and <code>ConcreteStateB</code>
              classes are concrete states that implement the <code>State</code>
              interface. Each concrete state class implements the
              <code>handle()</code> method and performs the appropriate
              operations based on its specific state.
            </li>
            <li>
              3. The <code>Context</code> class represents the context and
              contains a reference to a <code>State</code>. The
              <code>Context</code> class's <code>transitionTo()</code> method is
              used to switch to a different state and update the state
              reference. The <code>Context</code> class's <code>request()</code>
              method is used to invoke the <code>handle()</code> method of the
              current state.
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
const EXStatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXStatePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements State Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the State Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete State Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the Context Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Use the State Pattern</h3>
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
const CDStatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXStatePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>State Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Order State Interface</h3>
            <h5>
              First, we define an order state interface that declares the
              actions to be performed when the order state changes.{" "}
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Order State Classes</h3>
            <h5>
              Next, create concrete classes for different order states that
              implement the order state interface.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the Order Context Class</h3>
            <h5>
              Then, define an order context class that holds a reference to an
              order state object and allows the order's behavior to change based
              on the state.{" "}
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the State Pattern to Control Order States</h3>
            <h5>
              Change the order's behavior by modifying the state of the order
              context.
            </h5>
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
export { CDStatePattern, EXStatePattern, HTStatePattern };
