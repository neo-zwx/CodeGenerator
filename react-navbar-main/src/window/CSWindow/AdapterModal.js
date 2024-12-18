import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface ITarget {
    void Request();
  } `,
  step2: `
  public class Adaptee {
    public void SpecificRequest() {
        Console.WriteLine("SpecificRequest");
    }
  }  `,
  step3: `
  public class Adapter : ITarget {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public void Request() {
        adaptee.SpecificRequest();
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        Adaptee adaptee = new Adaptee();
        ITarget target = new Adapter(adaptee);

        Console.WriteLine("The client code can create specific report factory instances as needed and use these factories to obtain instances of reports and report formats.");
        target.Request();
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface IPayment {
    void Pay(decimal amount);
  }`,
  step2: `
  public class PayPalService {
    public void PayPalPayment(decimal amount) {
        Console.WriteLine($"Paid {amount} through PayPal");
    }
  }

  public class AlipayService {
    public void AlipayTransfer(decimal amount) {
        Console.WriteLine($"Transferred {amount} through Alipay.");
    }
  }`,
  step3: `
  public class PayPalAdapter : IPayment {
    private PayPalService payPalService;

    public PayPalAdapter(PayPalService service) {
        payPalService = service;
    }

    public void Pay(decimal amount) {
        payPalService.PayPalPayment(amount);
    }
  }

  public class AlipayAdapter : IPayment {
    private AlipayService alipayService;

    public AlipayAdapter(AlipayService service) {
        alipayService = service;
    }

    public void Pay(decimal amount) {
        alipayService.AlipayTransfer(amount);
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        PayPalService paypal = new PayPalService();
        IPayment paypalPayment = new PayPalAdapter(paypal);
        paypalPayment.Pay(100m);  

        AlipayService alipay = new AlipayService();
        IPayment alipayPayment = new AlipayAdapter(alipay);
        alipayPayment.Pay(200m);  
    }
  }`,
};

const HTAdapterPattern = ({ onHide, show, state }) => {
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
        <h4>Adapter Pattern</h4>
        <p>
          Definition:The Adapter Pattern converts the interface of a class into
          another interface that clients expect. The Adapter allows classes that
          would otherwise not be compatible due to interface differences to work
          together.{" "}
        </p>
        <p>
          The Adapter Pattern is a structural design pattern that allows
          interaction between incompatible interfaces. This pattern involves a
          separate class that is responsible for bridging the gap between
          independent or incompatible interfaces.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/AdapterIma/AdapterClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Target</code>: This is an interface that defines methods
              related to a specific domain that the client uses. In this
              example, the <code>Target</code> interface provides a method
              called <code>request()</code>, which returns a string.
            </li>
            <li>
              2. <code>Adaptee</code>: This is a class with an existing
              interface that is incompatible with the <code>Target</code>{" "}
              interface. In this class diagram, the <code>Adaptee</code> class
              provides a method called <code>specificRequest()</code>, which
              also returns a string but has a different method signature from
              the <code>request()</code> method in the <code>Target</code>{" "}
              interface.
            </li>
            <li>
              3. <code>Adapter</code>: This is a class that implements the{" "}
              <code>Target</code> interface and converts <code>Target</code>{" "}
              interface calls into compatible calls to the <code>Adaptee</code>.
              In this example, the <code>Adapter</code> class contains a
              property of type <code>Adaptee</code> named <code>adaptee</code>.
              It implements the <code>request()</code> method, which internally
              calls the <code>specificRequest()</code> method of the{" "}
              <code>Adaptee</code> object it holds, thereby adapting the two
              incompatible interfaces.
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
const CDAdapterPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXAdapterPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Adapter Pattern Implementation Steps</h2>
            <br></br>
            <h3>"Context"：</h3>
            <p>
            A typical application of the Adapter Pattern is in payment system integration. Many e-commerce platforms need to support various payment methods, such as credit card payments and third-party payment services (e.g., PayPal, Alipay). These payment services each have different interfaces, and using the Adapter Pattern can integrate them into a unified payment system, thereby enhancing the system's flexibility and scalability.            </p>
          </div>
          <div className="step">
            <h3>"Step 1: Define a Unified Payment Interface"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 2: Define Third-Party Payment Service Classes"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 3: Implement Payment Service Adapter Classes"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 4: Use the Adapter Pattern for Payment Processing"</h3>
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

const EXAdapterPattern = ({ onHide, show, state }) => (
  <Modal size="lg" centered show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title id="EXAdapterPattern">
        {state === "editing" ? "Example" : "範例介紹"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="body">
        <div>
          <h2>Adapter Pattern Example</h2>
        </div>
        <div className="step">
          <h3>Step 1: Define the Character Interface</h3>
          <h5>First, we define a character interface that declares the operation for displaying characters.</h5>
          <div class="showcode">
            <pre tabindex="0" class="chroma">
              <code class="language-html" data-lang="html">
                {cdcodes.step1}
              </code>
            </pre>
          </div>{" "}
        </div>
        <div className="step">
          <h3>Step 2: Implement Concrete Character Classes</h3>
          <h5>"Next, create a concrete character class that implements the character interface."</h5>
          <div class="showcode">
            <pre tabindex="0" class="chroma">
              <code class="language-html" data-lang="html">
                {cdcodes.step2}
              </code>
            </pre>
          </div>{" "}
        </div>
        <div className="step">
          <h3>Step 3: Define the Character Factory Class</h3>
          <h5>
          Then, we define a character factory class that is responsible for creating and managing the Adapter objects for characters.
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
          <h3>Step 4: Use the Adapter Pattern to Display Documents</h3>
          <h5>Obtain shared character Adapter objects through the character factory and display them.</h5>
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

export { CDAdapterPattern, EXAdapterPattern, HTAdapterPattern };
