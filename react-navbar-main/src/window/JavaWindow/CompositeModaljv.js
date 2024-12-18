import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Employee {
    void showEmployeeDetails();
  }
    `,
  step2: `
  public class Developer implements Employee {
    private String name;
    private String position;

    public Developer(String name, String position) {
        this.name = name;
        this.position = position;
    }

    @Override
    public void showEmployeeDetails() {
        System.out.println(name + " is a " + position);
    }
  }

  public class Designer implements Employee {
    private String name;
    private String position;

    public Designer(String name, String position) {
        this.name = name;
        this.position = position;
    }

    @Override
    public void showEmployeeDetails() {
        System.out.println(name + " is a " + position);
    }
  }
`,
  step3: `
  import java.util.ArrayList;
  import java.util.List;

  public class Manager implements Employee {
    private String name;
    private String position;
    private List<Employee> subordinates;

    public Manager(String name, String position) {
        this.name = name;
        this.position = position;
        this.subordinates = new ArrayList<>();
    }

    public void add(Employee employee) {
        subordinates.add(employee);
    }

    public void remove(Employee employee) {
        subordinates.remove(employee);
    }

    @Override
    public void showEmployeeDetails() {
        System.out.println(name + " is a " + position);
        for (Employee employee : subordinates) {
            employee.showEmployeeDetails();
        }
    }
  }
`,
  step4: `
  public class CompositePatternDemo {
    public static void main(String[] args) {
        Employee dev1 = new Developer("John", "Frontend Developer");
        Employee dev2 = new Developer("Alice", "Backend Developer");
        Employee designer = new Designer("Daisy", "Graphic Designer");

        Manager engManager = new Manager("Mike", "Engineering Manager");
        Manager designManager = new Manager("Linda", "Design Manager");

        engManager.add(dev1);
        engManager.add(dev2);

        designManager.add(designer);

        Manager generalManager = new Manager("James", "General Manager");
        generalManager.add(engManager);
        generalManager.add(designManager);

        generalManager.showEmployeeDetails();
    }
  }
  `,
};
const cdcodes = {
  step1: `
  public interface Graphic {
    void draw();
  }
 `,
  step2: `
  public class Circle implements Graphic {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
  }

  public class Rectangle implements Graphic {
    @Override
    public void draw() {
        System.out.println("Drawing a Rectangle");
    }
  }
`,
  step3: `
  import java.util.ArrayList;
  import java.util.List;

  public class CompositeGraphic implements Graphic {
    private List<Graphic> childGraphics = new ArrayList<>();

    public void add(Graphic graphic) {
        childGraphics.add(graphic);
    }

    public void remove(Graphic graphic) {
        childGraphics.remove(graphic);
    }

    @Override
    public void draw() {
        for (Graphic graphic : childGraphics) {
            graphic.draw();
        }
    }
  }
`,
  step4: `
  public class CompositePatternDemo {
    public static void main(String[] args) {
        Graphic circle1 = new Circle();
        Graphic circle2 = new Circle();
        Graphic rectangle1 = new Rectangle();

        CompositeGraphic composite1 = new CompositeGraphic();
        CompositeGraphic composite2 = new CompositeGraphic();

        composite1.add(circle1);
        composite1.add(rectangle1);

        composite2.add(circle2);
        composite2.add(composite1); // composite2 conclude composite1

        System.out.println("Drawing composite1:");
        composite1.draw();

        System.out.println("Drawing composite2:");
        composite2.draw();
    }
  }
  `,
};

const HTCompositePattern = ({ onHide, show, state }) => {
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
        <h4>Composite Pattern</h4>
        <p>
          Definition: Objects are combined in a tree structure to represent a
          whole-part hierarchy.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/CompositeIma/CompositeClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. **Component** * The base interface for all components, both
              leaf and composite. * Declares the common interface for all
              objects in the composition. * Defines methods such as
              `operation()`, which represents the interface's primary operation,
              and methods for managing child components, like `add()`,
              `remove()`, and `getChild()`.
            </li>
            <li>
              2. **Leaf** * Represents leaf objects in the composition; it has
              no children. * Implements the `Component` interface and defines
              behavior for primitive objects in the composition. * In the
              diagram, the `Leaf` class has an `operation()` method.
            </li>
            <li>
              3. **Composite** * Defines behavior for components having
              children. * Implements the `Component` interface and stores child
              components. * Defines methods for managing its child components,
              such as `add()`, `remove()`, and `getChild()`. * In the diagram,
              the `Composite` class has an `operation()` method and methods for
              managing its children.
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
const EXCompositePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXCompositePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Composite Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the component interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement leaf nodes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement composite nodes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Composite pattern.</h3>
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

const CDCompositePattern = ({ onHide, show, state }) => {
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="EXCompositePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Composite Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define a graphic component interface.</h3>
            <h5>Create an interface to specify a method for drawing.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement leaf nodes. </h3>
            <h5>Leaf nodes are basic elements with no children, like Circle and Rectangle.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement composite nodes.</h3>
            <h5>Composite nodes are nodes that can contain child nodes. In this example, CompositeGraphic is a composite node and can contain multiple Graphics.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Composite pattern. </h3>
            <h5>
            Create individual shapes and composite graphics in the client code, then operate on the composite objects.
            </h5>
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

export { CDCompositePattern, EXCompositePattern, HTCompositePattern };
