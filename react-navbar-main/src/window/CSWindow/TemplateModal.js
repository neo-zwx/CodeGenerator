import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public abstract class AbstractClass {
    public final void templateMethod() {
        baseOperation();
        requiredOperations1();
        requiredOperations2();
        hook();
    }

    protected void baseOperation() {
        System.out.println("AbstractClass says: I am doing the bulk of the work");
    }

    protected abstract void requiredOperations1();
    protected abstract void requiredOperations2();
    protected void hook() {}
  }    `,
  step2: `
  public class ConcreteClass1 extends AbstractClass {
    protected void requiredOperations1() {
        System.out.println("ConcreteClass1 says: Implemented Operation1");
    }

    protected void requiredOperations2() {
        System.out.println("ConcreteClass1 says: Implemented Operation2");
    }
  }

  public class ConcreteClass2 extends AbstractClass {
    protected void requiredOperations1() {
        System.out.println("ConcreteClass2 says: Implemented Operation1");
    }

    protected void requiredOperations2() {
        System.out.println("ConcreteClass2 says: Implemented Operation2");
    }

    protected void hook() {
        System.out.println("ConcreteClass2 says: Overridden Hook");
    }
  } `,
  step3: `
  public class TemplateMethodDemo {
    public static void main(String[] args) {
        AbstractClass class1 = new ConcreteClass1();
        AbstractClass class2 = new ConcreteClass2();

        System.out.println("Testing ConcreteClass1:");
        class1.templateMethod();

        System.out.println("\nTesting ConcreteClass2:");
        class2.templateMethod();
    }
  }`,
};
const cdcodes = {
  step1: `
  public abstract class ReportGenerator {
    public final void generateReport() {
        printHeader();
        printSummary();
        printDetails();
        printConclusion();
    }

    protected abstract void printHeader();
    protected abstract void printSummary();
    protected abstract void printDetails();
    protected abstract void printConclusion();
  } `,
  step2: `
  //銷售報告：
  public class SalesReportGenerator extends ReportGenerator {
      protected void printHeader() {
          System.out.println("Sales Report Header");
      }
  
      protected void printSummary() {
          System.out.println("Sales Report Summary");
      }
  
      protected void printDetails() {
          System.out.println("Sales Report Details");
      }
  
      protected void printConclusion() {
          System.out.println("Sales Report Conclusion");
      }
  }
  //員工績效報告：
  public class PerformanceReportGenerator extends ReportGenerator {
      protected void printHeader() {
          System.out.println("Employee Performance Report Header");
      }
  
      protected void printSummary() {
          System.out.println("Employee Performance Report Summary");
      }
  
      protected void printDetails() {
          System.out.println("Employee Performance Report Details");
      }
  
      protected void printConclusion() {
          System.out.println("Employee Performance Report Conclusion");
      }
  }`,
  step3: `
  public class ReportDemo {
    public static void main(String[] args) {
        ReportGenerator salesReport = new SalesReportGenerator();
        ReportGenerator performanceReport = new PerformanceReportGenerator();

        System.out.println("Generating Sales Report:");
        salesReport.generateReport();

        System.out.println("\nGenerating Performance Report:");
        performanceReport.generateReport();
    }
  }`,
};

const HTTemplatePattern = ({ onHide, show, state }) => {
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
        <h4>Template Pattern</h4>
        <p>
          Definition: Decompose a function into multiple small steps, where each
          step is a method, and then use a template method to combine these
          steps into a cohesive function.
        </p>
        <p>
          The Template pattern is a behavioral design pattern that defines the
          framework of an algorithm in a base class, allowing subclasses to
          redefine certain steps of the algorithm without changing its
          structure.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/TemplateIma/TemplateClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>AbstractClass</code>: It defines a method named
              <code>templateMethod()</code>. This method is typically a
              framework for an algorithm, providing the sequence of steps in the
              algorithm. This method should not be altered by subclasses and is
              often marked as `final` in Java.
            </li>
            <li>
              2. <code>ConcreteClassA</code> and <code>ConcreteClassB</code>:
              These are concrete subclasses of <code>AbstractClass</code> that
              implement the algorithm steps defined in the parent class.
              <code>ConcreteClassA</code> implements the <code>step1()</code>,
              <code>step2()</code>, and <code>step3()</code> methods,
              representing individual steps in the algorithm.
              <code>ConcreteClassB</code> implements the <code>step1()</code>
              and <code>step2()</code> methods. Note that it does not implement
              <code>step3()</code>, which suggests that <code>step3()</code>
              might be an optional step, or <code>ConcreteClassB</code> does not
              require the implementation of this step.
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
const EXTemplatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXTemplatePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implements Template Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Abstract Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Template Method</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
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

const CDTemplatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXTemplatePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Template Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
              A common application of the Template  pattern is in report
              generation systems. Many enterprise systems need to generate
              various types of reports, such as sales reports, employee
              performance reports, and financial reports. These reports may
              share a similar structure, including sections like titles,
              summaries, details, and conclusions, but the specific content and
              format of each report may vary. By using the Template 
              pattern, we can define an abstract class that contains the
              framework for the report generation algorithm and allow different
              report classes to implement the specific report generation logic
              through inheritance.
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Abstract Report Generation Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Report Generation Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Use the Template Method to Generate Reports</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
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

export { CDTemplatePattern, EXTemplatePattern, HTTemplatePattern };
