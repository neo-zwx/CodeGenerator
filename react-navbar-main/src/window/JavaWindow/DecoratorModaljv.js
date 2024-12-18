import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Coffee {
    double getCost();    
    String getDescription(); 
  }
    `,
  step2: `
  public class SimpleCoffee implements Coffee {
    @Override
    public double getCost() {
        return 5.0; 
    }

    @Override
    public String getDescription() {
        return "Simple Coffee";
    }
}
`,
  step3: `
  public abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee decoratedCoffee) {
        this.decoratedCoffee = decoratedCoffee;
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost(); 
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription(); 
    }
  }
`,
  step4: `
  public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }

    @Override
    public double getCost() {
        return super.getCost() + 1.5; 
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", Milk";
    }
  }


  public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }

    @Override
    public double getCost() {
        return super.getCost() + 0.5; 
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", Sugar";
    }
}


  public class ChocolateDecorator extends CoffeeDecorator {
    public ChocolateDecorator(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }

    @Override
    public double getCost() {
        return super.getCost() + 2.0; 
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", Chocolate";
    }
  }
 `,
 step5: `
  public class DecoratorPatternDemo {
    public static void main(String[] args) {

        Coffee simpleCoffee = new SimpleCoffee();
        System.out.println(simpleCoffee.getDescription() + " $" + simpleCoffee.getCost());

        Coffee milkCoffee = new MilkDecorator(simpleCoffee);
        System.out.println(milkCoffee.getDescription() + " $" + milkCoffee.getCost());

        Coffee milkSugarCoffee = new SugarDecorator(milkCoffee);
        System.out.println(milkSugarCoffee.getDescription() + " $" + milkSugarCoffee.getCost());

        Coffee finalCoffee = new ChocolateDecorator(milkSugarCoffee);
        System.out.println(finalCoffee.getDescription() + " $" + finalCoffee.getCost());
    }
  }
`,
};
const cdcodes = {
  step1: `
  public interface Message {
    String getContent();
  }
 `,
  step2: `
  public class SimpleMessage implements Message {
    private String content;

    public SimpleMessage(String content) {
        this.content = content;
    }

    @Override
    public String getContent() {
        return content;
    }
  }
`,
  step3: `
  public abstract class MessageDecorator implements Message {
    protected Message decoratedMessage;

    public MessageDecorator(Message decoratedMessage) {
        this.decoratedMessage = decoratedMessage;
    }

    @Override
    public String getContent() {
        return decoratedMessage.getContent();
    }
  }
`,
  step4: `
  public class EncryptedMessageDecorator extends MessageDecorator {
    public EncryptedMessageDecorator(Message decoratedMessage) {
        super(decoratedMessage);
    }

    @Override
    public String getContent() {
        return encryptContent(super.getContent());
    }

    private String encryptContent(String content) {
        return new StringBuilder(content).reverse().toString();
    }
  }

  public class CompressedMessageDecorator extends MessageDecorator {
    public CompressedMessageDecorator(Message decoratedMessage) {
        super(decoratedMessage);
    }

    @Override
    public String getContent() {
        return compressContent(super.getContent());
    }

    private String compressContent(String content) {
        return content.replaceAll("\\s", "");
    }
  }

  import java.util.Date;

  public class TimestampMessageDecorator extends MessageDecorator {
    public TimestampMessageDecorator(Message decoratedMessage) {
        super(decoratedMessage);
    }

    @Override
    public String getContent() {
        return addTimestamp(super.getContent());
    }

    private String addTimestamp(String content) {
        return new Date().toString() + ": " + content;
    }
  }
  `,
  step5: `
  public class DecoratorPatternDemo {
    public static void main(String[] args) {
        Message simpleMessage = new SimpleMessage("Hello, World!");
        System.out.println("Original Message: " + simpleMessage.getContent());

        Message encryptedMessage = new EncryptedMessageDecorator(simpleMessage);
        System.out.println("Encrypted Message: " + encryptedMessage.getContent());

        Message compressedMessage = new CompressedMessageDecorator(encryptedMessage);
        System.out.println("Compressed & Encrypted Message: " + compressedMessage.getContent());

        Message timestampedMessage = new TimestampMessageDecorator(compressedMessage);
        System.out.println("Timestamped, Compressed & Encrypted Message: " + timestampedMessage.getContent());
    }
}

  `,
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
            <h2>Steps to implements Decorator Pattern</h2>
          </div>
          <div className="step">
            <h3>Steps1: Define the component interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Steps2: Implement the concrete component</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Steps3: Define the abstract decorator class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Steps 4: Implement the concrete decorators</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Steps 5: Use the Decorator Pattern</h3>
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
            <h3>Scenario:</h3>
            <p>We will implement a message transmission system with the basic function of sending messages. Through the decorator pattern, we can add encryption, compression, and timestamp functions to the message.</p>
          </div>
          <div className="step">
            <h3>Step1: Define the component interface</h3>
            <h5>First, define a component interface that declares the method for sending messages.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step2: Implement the concrete component</h3>
            <h5>Implement a concrete component class that represents the basic message.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step3: Define the abstract decorator class</h3>
            <h5>Define an abstract decorator class that implements the component interface and contains a reference to a component object.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>step4: Implement the concrete decorators</h3>
            <h5>
            Implement concrete decorator classes that dynamically add functionality to the message object.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step5: Use the Decorator Pattern</h3>
            <h5>In the client code, create a basic message object and use decorators to dynamically add functionality to it.</h5>
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

export { CDDecoratorPattern, EXDecoratorPattern, HTDecoratorPattern };
