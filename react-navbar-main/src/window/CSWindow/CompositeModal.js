import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IComponent {
    void Operation();
    void Add(IComponent component);
    void Remove(IComponent component);
    IComponent GetChild(int index);
  }   `,
  step2: `
  public class Leaf : IComponent {
    public void Operation() {
        Console.WriteLine("Leaf operation.");
    }

    public void Add(IComponent component) { }
    public void Remove(IComponent component) { }
    public IComponent GetChild(int index) {
        return null;
    }
  }`,
  step3: `
  public class Composite : IComponent {
    private List<IComponent> children = new List<IComponent>();

    public void Operation() {
        Console.WriteLine("Composite operation. Number of children: " + children.Count);
        foreach (var child in children) {
            child.Operation();
        }
    }

    public void Add(IComponent component) {
        children.Add(component);
    }

    public void Remove(IComponent component) {
        children.Remove(component);
    }

    public IComponent GetChild(int index) {
        return children[index];
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        Composite root = new Composite();
        root.Add(new Leaf());
        root.Add(new Leaf());

        Composite branch = new Composite();
        branch.Add(new Leaf());
        root.Add(branch);

        root.Operation();
    }
  }  `,
};
const cdcodes = {
  step1: `
  public interface IProductComponent {
    void DisplayInfo();
  }`,
  step2: `
  public class SingleProduct : IProductComponent {
    private string name;
    private decimal price;

    public SingleProduct(string name, decimal price) {
        this.name = name;
        this.price = price;
    }

    public void DisplayInfo() {
        Console.WriteLine($"Product: {name}, Price: {price}");
    }
  }`,
  step3: `
  public class ProductComposite : IProductComponent {
    private string name;
    private List<IProductComponent> children = new List<IProductComponent>();

    public ProductComposite(string name) {
        this.name = name;
    }

    public void Add(IProductComponent component) {
        children.Add(component);
    }

    public void DisplayInfo() {
        Console.WriteLine($"ProductComponent: {name}");
        foreach (var child in children) {
            child.DisplayInfo();
        }
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        SingleProduct product1 = new SingleProduct("產品1", 100m);
        SingleProduct product2 = new SingleProduct("產品2", 200m);
        ProductComposite combo1 = new ProductComposite("套裝A");
        combo1.Add(product1);
        combo1.Add(product2);

        SingleProduct product3 = new SingleProduct("產品3", 300m);
        ProductComposite combo2 = new ProductComposite("超值套裝");
        combo2.Add(combo1);
        combo2.Add(product3);

        combo2.DisplayInfo();
    }
  }   `,
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
            <h2>Steps for Implementing the Composite Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the component interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement the leaf component class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement the composite component class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>
              Step 4: Use the Composite pattern to create and operate a tree
              structure.
            </h3>
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

const CDCompositePattern = ({ onHide, show, state }) => {
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
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Composite Pattern Example </h2>
            <br></br>
            <h3>Scenario:</h3>
            <p>
              Consider an e-commerce company that requires managing a product
              catalog comprising individual products and product bundles. The
              Composite pattern allows us to treat both single products and
              product bundles as composite objects, enabling unified management
              and presentation of the entire catalog.{" "}
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Create the product component interface.</h3>
            <h5>
              First, we define a product component interface that declares the
              common operations for both products and product bundles.{" "}
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
            <h3>
              Step 2: Create the leaf node class to represent individual
              products.
            </h3>
            <h5>
              Subsequently, create a leaf node class representing individual
              products. This class implements the product component interface
              and does not contain any child nodes.{" "}
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
            <h3>
              Step 3: Create the composite node class to represent product
              bundles.
            </h3>
            <h5>
              Following that, implement a composite node class for product
              bundles. As a composite node, it can have child nodes, which can
              be either individual products or other product bundles.{" "}
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
            <h3>Step 4: Create and render the product catalog by applying the Composite pattern.</h3>
            <h5>Construct the hierarchical structure of the product catalog and present its specific details.</h5>
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

export { CDCompositePattern, EXCompositePattern, HTCompositePattern };
