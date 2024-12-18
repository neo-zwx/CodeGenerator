import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IVisitor {
    void VisitElementA(ElementA elementA);
    void VisitElementB(ElementB elementB);
  } `,
  step2: `
  public interface IElement {
    void Accept(IVisitor visitor);
  }`,
  step3: `
  public class ElementA : IElement {
    public void Accept(IVisitor visitor) {
        visitor.VisitElementA(this);
    }

    public void OperationA() {}
  }

  public class ElementB : IElement {
    public void Accept(IVisitor visitor) {
        visitor.VisitElementB(this);
    }

    public void OperationB() {}
  }`,
  step4: `
  public class ConcreteVisitor : IVisitor {
    public void VisitElementA(ElementA elementA) {
        Console.WriteLine("ConcreteVisitor deal with ElementA");
        elementA.OperationA();
    }

    public void VisitElementB(ElementB elementB) {
        Console.WriteLine("ConcreteVisitor deal with ElementB");
        elementB.OperationB();
    }
  }  `,
  step5: `
  class Program {
    static void Main(string[] args) {
        List<IElement> elements = new List<IElement> {
            new ElementA(),
            new ElementB()
        };

        IVisitor visitor = new ConcreteVisitor();

        foreach (var element in elements) {
            element.Accept(visitor);
        }
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface IDepartment {
    void Accept(IReportVisitor visitor);
  } `,
  step2: `
  public class SalesDepartment : IDepartment {
    public void Accept(IReportVisitor visitor) {
        visitor.VisitSalesDepartment(this);
    }

    public double GetSalesFigures() {
        return 100000; 
    }
  }

    public void Accept(IReportVisitor visitor) {
        visitor.VisitHRDepartment(this);
    }

    public int GetEmployeeCount() {
        return 50; 
    }
  }`,
  step3: `
  public interface IReportVisitor {
    void VisitSalesDepartment(SalesDepartment sales);
    void VisitHRDepartment(HRDepartment hr);
  }`,
  step4: `
  public class PerformanceReportVisitor : IReportVisitor {
    public void VisitSalesDepartment(SalesDepartment sales) {
        Console.WriteLine($"Sales Department Performance Report: Sales Figures {sales.GetSalesFigures()}");
    }

    public void VisitHRDepartment(HRDepartment hr) {
        Console.WriteLine($"Human Resources Department Report: Number of Employees {hr.GetEmployeeCount()}");
    }
  } `,
  step5: `
  class Program {
    static void Main(string[] args) {
        List<IDepartment> departments = new List<IDepartment> {
            new SalesDepartment(),
            new HRDepartment()
        };

        IReportVisitor visitor = new PerformanceReportVisitor();

        foreach (var department in departments) {
            department.Accept(visitor);
        }
    }
  }`,
};

const HTVisitorPattern = ({ onHide, show, state }) => {
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
        <h4>Visitor Pattern</h4>
        <p>
          Definition: Represents an operation that acts on elements within an
          object's structure. It allows you to define new operations on these
          elements without changing their classes.{" "}
        </p>
        <p>
          The Visitor pattern is a behavioral design pattern that allows you to
          add new operations to existing classes without modifying them. This is
          achieved by creating a visitor class that performs operations on a set
          of elements being visited.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/VisitorIma/VisitorClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Element</code>: This is an interface or abstract class
              that defines an `Accept` method, which takes a visitor object as a
              parameter.
            </li>
            <li>
              2. <code>ConcreteElementA</code> and <code>ConcreteElementB</code>
              : These are concrete classes that implement the
              <code>Element</code> interface. Each class implements the `Accept`
              method, which typically passes itself (i.e., `this`) as a
              parameter to the visitor's `Visit` method.
            </li>
            <li>
              3. <code>Visitor</code>: This is an interface that defines a set
              of visit operations, each corresponding to a type of
              <code>ConcreteElement</code>. In this example, there are
              `VisitConcreteElementA` and `VisitConcreteElementB` methods.
            </li>
            <li>
              4. <code>ConcreteVisitorA</code> and <code>ConcreteVisitorB</code>
              : These classes implement the <code>Visitor</code> interface and
              provide concrete implementations of the visit operations. These
              operations typically act on the element objects to perform
              specific processing.
            </li>
            <li>
              5. <code>ObjectStructure</code>: This is a container that holds a
              collection of element objects and allows traversal of these
              elements to enable the visitor to access them.
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
const EXVisitorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXVisitorPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implments Visitor Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Visitor Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the Element Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement Concrete Element Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement Concrete Visitor Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Visitor Pattern</h3>
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

const CDVisitorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXVisitorPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Visitor Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Assume a company needs to generate performance reports for different departments, including Sales, Human Resources, and Research & Development. Each department has its unique performance metrics, and the way reports are displayed may vary depending on the report type or the recipient. By using the Visitor pattern, we can generate multiple types of reports from the same data set without modifying the existing department classes.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Department Interface</h3>
            <h5>First, we define a department interface that declares a method for accepting a visitor.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Department Classes</h3>
            <h5>Next, create concrete classes for different departments that implement the department interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the Visitor Interface</h3>
            <h5>Then, define a visitor interface that declares methods for visiting different departments.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Implement Concrete Visitor Classes</h3>
            <h5>
            Next, create one or more concrete visitor classes that implement the visitor interface, used for generating different types of reports.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Use the Visitor Pattern to Generate Reports</h3>
            <h5>Generate reports for different departments through the visitor interface.</h5>
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
export { CDVisitorPattern, EXVisitorPattern, HTVisitorPattern };
