import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Shape {
    void draw();
  }
    `,
  step2: `
  public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
  }

  public class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Rectangle");
    }
  }

  public class Triangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Triangle");
    }
  }
`,
  step3: `
  public class ShapeFactory {
    public Shape createShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase("CIRCLE")) {
            return new Circle();
        } else if (shapeType.equalsIgnoreCase("RECTANGLE")) {
            return new Rectangle();
        } else if (shapeType.equalsIgnoreCase("TRIANGLE")) {
            return new Triangle();
        }
        return null;
    }
}
`,
  step4: `
  public class FactoryPatternDemo {
    public static void main(String[] args) {
        ShapeFactory shapeFactory = new ShapeFactory();

        Shape shape1 = shapeFactory.createShape("CIRCLE");
        shape1.draw();

        Shape shape2 = shapeFactory.createShape("RECTANGLE");
        shape2.draw();

        Shape shape3 = shapeFactory.createShape("TRIANGLE");
        shape3.draw();
    }
  }
  `,
};
const cdcodes = {
  step1: `
  public interface MessageSender {
    void sendMessage(String recipient, String message);
  }
 `,
  step2: `
  public class EmailSender implements MessageSender {
    @Override
    public void sendMessage(String recipient, String message) {
        System.out.println("Sending email to " + recipient + ": " + message);
    }
  }

  public class SmsSender implements MessageSender {
    @Override
    public void sendMessage(String recipient, String message) {
        System.out.println("Sending SMS to " + recipient + ": " + message);
    }
  }
`,
  step3: `
  public class MessageSenderFactory {
    public MessageSender createMessageSender(String type) {
        if (type == null) {
            return null;
        }
        if (type.equalsIgnoreCase("EMAIL")) {
            return new EmailSender();
        } else if (type.equalsIgnoreCase("SMS")) {
            return new SmsSender();
        }
        return null;
    }
  }
`,
  step4: `
  public class FactoryPatternDemo {
    public static void main(String[] args) {
        MessageSenderFactory factory = new MessageSenderFactory();

        MessageSender emailSender = factory.createMessageSender("EMAIL");
        emailSender.sendMessage("john.doe@example.com", "Hello, John!");

        MessageSender smsSender = factory.createMessageSender("SMS");
        smsSender.sendMessage("+1234567890", "Hi there!");
    }
  }
   `,
};

const HTFactoryPattern = ({ onHide, show, state }) => {
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
        <h4>Factory Pattern</h4>
        <p>
          Definition: To utilize shared technology to effectively support a
          large number of fine-grained objects.
        </p>
        <p>
        The Factory Pattern is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. This allows the instantiation of a class to be deferred to its subclasses.   
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/FactoryIma/FactoryClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1.<code>Product</code>Defines the public interface or abstract class of a product. All concrete products must implement this interface or inherit from this abstract class.
            </li>
            <li>
              2. <code>ConcreteProduct</code>classes implement the Product interface. Each concrete product has a different implementation logic.            </li>
            <li>
              3. <code>Factory</code>class provides a method to create instances of Product without explicitly specifying the concrete product class. The factory typically decides which type of product to create based on the input parameters.            </li>
            <li>
              4. <code>Client</code> uses the factory to create products. The client does not directly depend on the concrete product classes, but instead obtains product instances through the factory and relies on the Product interface.
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
const EXFactoryPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFactoryPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Factory Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the product interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete product classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the factory class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Apply the Factory Pattern.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
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

const CDFactoryPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFactoryPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Factory Pattern Example</h2>
            <h3>Scenario:</h3>
            <p>Suppose we need a system to send notifications, which can be delivered via email or SMS. We want to have a unified interface to handle these different types of message delivery methods.</p>
          </div>
          <div className="step">
            <h3>Step 1: Define a product interface.</h3>
            <h5>Firstly, define a product interface that declares the method for sending messages.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete product classes.</h3>
            <h5>Next, implement concrete product classes, each of which implements the MessageSender interface, providing specific message sending implementations.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define a factory class.</h3>
            <h5>The factory class provides a method for creating the corresponding message sender object based on input parameters.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Factory Pattern.</h3>
            <h5>
            Clients use the factory to obtain sender instances, promoting loose coupling.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
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

export { CDFactoryPattern, EXFactoryPattern, HTFactoryPattern };
