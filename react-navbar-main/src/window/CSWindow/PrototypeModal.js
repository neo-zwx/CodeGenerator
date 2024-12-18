import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IPrototype {
    IPrototype Clone();
  }     `,
  step2: `
  class Program {
    static void Main(string[] args) {
        House prototypeHouse = new House("Modern style", "White");

        House house1 = prototypeHouse.Clone() as House;
        house1.Color = "Blue";
        house1.DisplayInfo();

        House house2 = prototypeHouse.Clone() as House;
        house2.Color = "Gray";
        house2.DisplayInfo();

    }
  }`,
  step3: `
  class Program {
    static void Main(string[] args) {
        ConcretePrototype prototype = new ConcretePrototype(100, "");
        ConcretePrototype clonedPrototype = prototype.Clone() as ConcretePrototype;
        Console.WriteLine($"Property 1 of the prototype object: {prototype.Property1}, Property2: {prototype.Property2}");
        Console.WriteLine($"Property 1 of the clone object: {clonedPrototype.Property1}, Property2: {clonedPrototype.Property2}");
    }
  }`,
};
const cdcodes = {
  step1: `
  public interface IReportPrototype {
    IReportPrototype Clone();
  } `,
  step2: `
  public class ReportPrototype implements IReportPrototype {
    private String departmentName;
    private List<String> dataSections;
    private Map<String, Object> settings;

    public ReportPrototype(String departmentName) {
        this.departmentName = departmentName;
        this.dataSections = new ArrayList<>();
        this.settings = new HashMap<>();
    }

    public void addDataSection(String section) {
        dataSections.add(section);
    }

    public void setSetting(String key, Object value) {
        settings.put(key, value);
    }

    public IReportPrototype Clone() {
        try {
            ReportPrototype clone = (ReportPrototype) super.clone();
            clone.dataSections = new ArrayList<>(this.dataSections); 
            clone.settings = new HashMap<>(this.settings); 
            return clone;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); 
        }
    }
  }`,
  step3: `
  public class Program {
    public static void main(String[] args) {
        ReportPrototype prototype = new ReportPrototype("Finance Department");
        prototype.addDataSection("Income");
        prototype.addDataSection("Expenses");
        prototype.setSetting("Color", "Blue");

        ReportPrototype clonedReport = (ReportPrototype) prototype.Clone();
        clonedReport.setSetting("Color", "Green"); 

        System.out.println("Configuration of the prototype report: " + prototype.getSettings());
        System.out.println("Configuration of the clone report: " + clonedReport.getSettings());
    }
}`,
};

const HTPrototypePattern = ({ onHide, show, state }) => {
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
        <h4>Prototype Pattern</h4>
        <p>
          Definition: Specifies the type of object to be created using a
          prototype instance, and creates new objects by copying this prototype.{" "}
        </p>
        <p>
          The Prototype pattern is a creational design pattern that allows you
          to create new objects by copying an existing object, thus avoiding the
          need to know the specific class of the object being copied. This
          pattern enhances system flexibility and efficiency, especially when
          creating complex objects is costly.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/PrototypeIma/PrototypeClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Prototype</code> is an interface that defines possible
              methods such as
              <code>clone(): Prototype</code> and
              <code>toString(): string</code>. These methods allow objects to be
              copied and provide a textual representation of themselves.
            </li>
            <li>
              2. <code>ConcretePrototype1</code> and
              <code>ConcretePrototype2</code> are concrete prototype classes
              that implement the
              <code>Prototype</code> interface, providing specific
              implementations. They both contain a property named
              <code>primitive</code>, which can be of any type, and
              <code>ConcretePrototype2</code> additionally contains a
              <code>component</code> property that is an object.
            </li>
            <li>
              3. These concrete prototype classes use the <code>clone()</code>
              method to create a copy of a prototype object. This method returns
              a new instance of the
              <code>Prototype</code> type that is a clone of the original
              object. They also implement the <code>toString()</code> method,
              returning a string representation of the object.
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
const EXPrototypePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXPrototypePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implement the Prototype Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Prototype Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement the concrete prototype class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Apply the Prototype Pattern</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
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

const CDPrototypePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXPrototypePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Prototype Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
              Consider a company that requires generating tailored reports for
              various departments. While these reports share a common structure,
              the data they contain and certain specific settings differ based
              on the department. By employing the Prototype pattern, we can
              establish a report prototype and produce department-specific
              reports by cloning and customizing these prototypes. In this
              scenario, the <code>IReportPrototype</code> interface encapsulates
              a Clone method, defining the capability to create a copy of the
              report prototype. The <code>ReportPrototype</code> class, an
              implementation of this interface, serves as the concrete
              prototype. Clients can obtain customized reports by invoking the
              Clone method on this prototype and then modifying the resulting
              clone to suit their departmental needs. The Prototype pattern
              offers an efficient solution in such cases, enabling the creation
              of new objects through cloning rather than instantiating them from
              scratch. This is especially beneficial when constructing complex
              objects, as it reduces the overhead associated with repeated
              object creation.
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Create the report prototype interface.</h3>
            <h5>
            Initially, we establish a report prototype interface to specify a Clone method for the purpose of creating copies of report objects.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement the Concrete Report Prototype Class</h3>
            <h5>Next, create a concrete report prototype class that implements the report prototype interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Customize the Report Using the Prototype Pattern</h3>
            <h5>
            Create and customize a new report copy by calling the `Clone` method on the concrete report prototype object.
            </h5>
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

export { CDPrototypePattern, EXPrototypePattern, HTPrototypePattern };
