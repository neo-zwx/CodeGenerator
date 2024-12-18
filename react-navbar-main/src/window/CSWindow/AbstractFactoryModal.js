import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IAbstractProductA {
    void PerformActionA();
  }

  public interface IAbstractProductB {
    void PerformActionB();
  } `,
  step2: `
  public class ConcreteProductA1 : IAbstractProductA {
    public void PerformActionA() {
        Console.WriteLine("ConcreteProductA1's Operation");
    }
  }

  public class ConcreteProductB1 : IAbstractProductB {
    public void PerformActionB() {
        Console.WriteLine("ConcreteProductB1's Operation");
    }
  }

  public class ConcreteProductA2 : IAbstractProductA {
    public void PerformActionA() {
        Console.WriteLine("ConcreteProductA2's Operation");
    }
  }

  public class ConcreteProductB2 : IAbstractProductB {
    public void PerformActionB() {
        Console.WriteLine("ConcreteProductB2's Operation");
    }
  }`,
  step3: `
  public interface IAbstractFactory {
    IAbstractProductA CreateProductA();
    IAbstractProductB CreateProductB();
  }`,
  step4: `
  public class ConcreteFactory1 : IAbstractFactory {
    public IAbstractProductA CreateProductA() {
        return new ConcreteProductA1();
    }

    public IAbstractProductB CreateProductB() {
        return new ConcreteProductB1();
    }
  }

  public class ConcreteFactory2 : IAbstractFactory {
    public IAbstractProductA CreateProductA() {
        return new ConcreteProductA2();
    }

    public IAbstractProductB CreateProductB() {
        return new ConcreteProductB2();
    }
  }  `,
  step5: `
  class Program {
    static void Main(string[] args) {
        IAbstractFactory factory1 = new ConcreteFactory1();
        var productA1 = factory1.CreateProductA();
        var productB1 = factory1.CreateProductB();
        productA1.PerformActionA();
        productB1.PerformActionB();

        IAbstractFactory factory2 = new ConcreteFactory2();
        var productA2 = factory2.CreateProductA();
        var productB2 = factory2.CreateProductB();
        productA2.PerformActionA();
        productB2.PerformActionB();
    }
  }  `,
};
const cdcodes = {
  step1: `
  public interface IReport {
    void Generate(IReportFormat format);
  }

  public interface IReportFormat {
    void Render();
  }`,
  step2: `
  public class SalesReport : IReport {
    public void Generate(IReportFormat format) {
        format.Render();
        Console.WriteLine("Generate SalesReport");
    }
  }

  public class CustomerServiceReport : IReport {
    public void Generate(IReportFormat format) {
        format.Render();
        Console.WriteLine("Generate CustomerServiceReport");
    }
  }

  public class PdfFormat : IReportFormat {
    public void Render() {
        Console.WriteLine("Render the report in PDF format");
    }
  }

  public class HtmlFormat : IReportFormat {
    public void Render() {
        Console.WriteLine("Render the report in HTML format");
    }
  }

  public class ExcelFormat : IReportFormat {
    public void Render() {
        Console.WriteLine("Render the report in EXCEL format");
    }
  }`,
  step3: `
  public interface IReportFactory {
    IReport CreateReport();
    IReportFormat CreateFormat();
  }`,
  step4: `
  public class SalesReportFactory : IReportFactory {
    public IReport CreateReport() {
        return new SalesReport();
    }

    public IReportFormat CreateFormat() {
        return new PdfFormat();
    }
  }

  public class CustomerServiceReportFactory : IReportFactory {
    public IReport CreateReport() {
        return new CustomerServiceReport();
    }

    public IReportFormat CreateFormat() {
        return new HtmlFormat();
    }
  }  `,
  step5: `
  class Program {
    static void Main(string[] args) {
        IReportFactory factory = new SalesReportFactory();
        IReport report = factory.CreateReport();
        IReportFormat format = factory.CreateFormat();
        report.Generate(format);

        factory = new CustomerServiceReportFactory();
        report = factory.CreateReport();
        format = factory.CreateFormat();
        report.Generate(format);
    }
  }  `,
};

const HTAbstractFactoryPattern = ({ onHide, show, state }) => (
  <Modal size="lg" centered show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {state === "editing" ? "Introduce" : "介紹"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Abstract Factory Pattern</h4>
      <p>
        Definition: Provides an interface for creating a series of related or
        interdependent objects without specifying their concrete classes.
      </p>
      <p>
        The Abstract Factory pattern is a creational design pattern that offers
        a way to encapsulate a group of individual factories, all sharing a
        common theme, without the need to specify concrete classes. This pattern
        is a further generalization of the Factory Method pattern and is used to
        handle the concept of product families.
      </p>
      <div className="item">
        <h4>Class Diagram</h4>
        <img
          src={require("../../image/AbstractFactroyIma/AbstractFactoryClass0.png")}
          alt="Exfw"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div className="item">
        <h4>Components：</h4>
        <ul>
          <li>
            1. <code>AbstractProduct</code> is an abstract product interface
            that defines the <code>usefulFunction()</code> method, representing
            the functionality that abstract products have.
          </li>
          <li>
            2. <code>ConcreteProductA</code> and <code>ConcreteProductB</code>{" "}
            are concrete product classes that implement the{" "}
            <code>AbstractProduct</code> interface and provide concrete
            implementations of the <code>usefulFunction()</code> method.
          </li>
          <li>
            3. <code>AbstractFactory</code> is an abstract factory interface
            that defines the <code>createProduct()</code> method, representing
            the product creation methods that abstract factories have.
          </li>
          <li>
            4. <code>ConcreteFactoryA</code> and <code>ConcreteFactoryB</code>{" "}
            are concrete factory classes that implement the{" "}
            <code>AbstractFactory</code> interface and provide concrete
            implementations of the <code>createProduct()</code> method.
          </li>
          <li>
            5. Use the concrete factory classes to call the{" "}
            <code>createProduct()</code> method, thereby creating the desired
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
const EXAbstractFactoryPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXAbstractFactoryPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Abstract Factory Pattern Implementation Steps</h2>
          </div>
          <div className="step">
            <h3>"Step 1: Define the Product Interface"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 2: Create Concrete Product Classes"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 3: Define the Abstract Factory Interface"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 4: Create Concrete Factory Classes"</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 5: Use the Abstract Factory Pattern"</h3>
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

const CDAbstractFactoryPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXAbstractFactoryPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Abstract Factory Pattern Example</h2>
          </div>
          <div className="step">
            <h3>"Step 1: Define the Report and Format Interfaces"</h3>
            <h5>"First, we define interfaces for the report and the report format."</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 2: Create Concrete Product Classes"</h3>
            <h5>"Next, create concrete product classes for each product interface."</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 3: Define the Report Factory Interface"</h3>
            <h5>
            "Then, we define a report factory interface that declares a set of methods for creating a range of related reports and formats."            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 4: Create Concrete Report Factory Classes"</h3>
            <h5>
            "Create concrete report factory classes for each business need, which implement the report factory interface."            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>"Step 5: Use the Abstract Factory Pattern"</h3>
            <h5>
            "The client code can create specific report factory instances as needed and use these factories to obtain instances of reports and report formats."            </h5>
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

export {
  CDAbstractFactoryPattern,
  EXAbstractFactoryPattern,
  HTAbstractFactoryPattern,
};
