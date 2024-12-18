import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public class Product {
    public List<string> Parts { get; private set; } = new List<string>();

    public void Add(string part) {
        Parts.Add(part);
    }

    public void Show() {
        Console.WriteLine("Product parts ---");
        foreach (var part in Parts) {
            Console.WriteLine(part);
        }
    }
  }    `,
  step2: `
  public abstract class Builder {
    public abstract void BuildPartA();
    public abstract void BuildPartB();
    public abstract Product GetResult();
  }`,
  step3: `
  public class ConcreteBuilder1 : Builder {
    private Product _product = new Product();

    public override void BuildPartA() {
        _product.Add("PartA");
    }

    public override void BuildPartB() {
        _product.Add("PartB");
    }

    public override Product GetResult() {
        return _product;
    }
  }

public class ConcreteBuilder2 : Builder {
    private Product _product = new Product();

    public override void BuildPartA() {
        _product.Add("PartX");
    }

    public override void BuildPartB() {
        _product.Add("PartY");
    }

    public override Product GetResult() {
        return _product;
    }
  }`,
  step4: `
  public class Director {
    public void Construct(Builder builder) {
        builder.BuildPartA();
        builder.BuildPartB();
    }
  }  `,
  step5: `
  class Program {
    static void Main(string[] args) {
        Director director = new Director();

        Builder b1 = new ConcreteBuilder1();
        Builder b2 = new ConcreteBuilder2();

        director.Construct(b1);
        Product p1 = b1.GetResult();
        p1.Show();

        director.Construct(b2);
        Product p2 = b2.GetResult();
        p2.Show();
    }
  }  `,
};
const cdcodes = {
  step1: `
  public class Computer {
    public string CPU { get; set; }
    public string Memory { get; set; }
    public string Storage { get; set; }
    public string Monitor { get; set; }

    public void ShowConfiguration() {
        Console.WriteLine($"CPU: {CPU}");
        Console.WriteLine($"Memory: {Memory}");
        Console.WriteLine($"Storage: {Storage}");
        Console.WriteLine($"Monitor: {Monitor}");
    }
  } `,
  step2: `
  public abstract class ComputerBuilder {
    protected Computer computer = new Computer();

    public abstract void BuildCPU();
    public abstract void BuildMemory();
    public abstract void BuildStorage();
    public abstract void BuildMonitor();
    public Computer GetComputer() => computer;
  }`,
  step3: `
  public class GamingComputerBuilder : ComputerBuilder {
    public override void BuildCPU() {
        computer.CPU = ""High-performance CPU"";
    }

    public override void BuildMemory() {
        computer.Memory = "16GB";
    }

    public override void BuildStorage() {
        computer.Storage = "1TB SSD";
    }

    public override void BuildMonitor() {
        computer.Monitor = ""4K Monitor"";
    }
  }

  public class OfficeComputerBuilder : ComputerBuilder {
    public override void BuildCPU() {
        computer.CPU = ""Standard Performance CPU"";
    }

    public override void BuildMemory() {
        computer.Memory = "8GB";
    }

    public override void BuildStorage() {
        computer.Storage = "256GB SSD";
    }

    public override void BuildMonitor() {
        computer.Monitor = ""1080p Monitor"";
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        ComputerBuilder gamingBuilder = new GamingComputerBuilder();
        gamingBuilder.BuildCPU();
        gamingBuilder.BuildMemory();
        gamingBuilder.BuildStorage();
        gamingBuilder.BuildMonitor();
        Computer gamingPC = gamingBuilder.GetComputer();
        gamingPC.ShowConfiguration();

        ComputerBuilder officeBuilder = new OfficeComputerBuilder();
        officeBuilder.BuildCPU();
        officeBuilder.BuildMemory();
        officeBuilder.BuildStorage();
        officeBuilder.BuildMonitor();
        Computer officePC = officeBuilder.GetComputer();
        officePC.ShowConfiguration();
    }
  }  `,
};

const HTBuilderPattern = ({ onHide, show, state }) => {
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
        <h4>Builder Pattern</h4>
        <p>
          Definition: Separate the construction of a complex object from its
          appearance, so that the same construction process can create different
          representations of the object.{" "}
        </p>
        <p>
          The Builder Pattern is a creational design pattern that separates the
          construction of a complex object from its representation, allowing the
          same construction process to create different representations. This
          pattern is typically used when creating complex objects with multiple
          parts, especially when the object’s creation process involves several
          steps and each step must be performed in a specific order.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/BuilderIma/BuilderClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Builder</code>: This is the builder interface that
              defines methods for the builder, such as{" "}
              <code>setPartA(value: string)</code>,{" "}
              <code>setPartB(value: number)</code>,{" "}
              <code>setPartC(value: boolean)</code>, etc.
            </li>
            <li>
              2. <code>ConcreteBuilder</code>: This is the concrete builder
              class that implements the <code>Builder</code> interface methods
              and provides specific implementation details. It contains a{" "}
              <code>Product</code> object and sets the parts of the{" "}
              <code>Product</code> based on different method calls.
            </li>
            <li>
              3. <code>Product</code>: This is the product class that represents
              the complex object to be built. It includes a list of parts, which
              can be added using the <code>add(part: string)</code> method and
              listed using the <code>listParts()</code> method.
            </li>
            <li>
              4. <code>Director</code>: This is the director class responsible
              for executing the builder's methods in a specific order. It holds
              a builder object and can set the builder using the{" "}
              <code>setBuilder(builder: Builder)</code> method, and use{" "}
              <code>buildMinimalViableProduct()</code> and{" "}
              <code>buildFullFeaturedProduct()</code> methods to construct
              products with different features.
            </li>
            <li>
              5. Use the concrete builder class to call the{" "}
              <code>factoryMethod()</code> to create the desired concrete
              product object.
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
const EXBuilderPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXBuilderPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Builder Pattern implement steps</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Product Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Define the Builder Abstract Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement Concrete Builder Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Define the Director Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 5: Use the Builder Pattern</h3>
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

const CDBuilderPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXBuilderPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Builder Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Computer Product Class</h3>
            <h5>First, we define a computer product class that represents the complex object to be built.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Define the Computer Builder Abstract Class</h3>
            <h5>
            Then, we define an abstract class or interface for the computer builder that declares methods for building various components of the computer.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement Concrete Computer Builder Classes</h3>
            <h5>
            Create concrete computer builder classes for different configurations of computers, which implement the computer builder abstract class.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Use the Builder Pattern</h3>
            <h5>
            Create specific computer builder objects as needed, guide the construction process, and then obtain the final built computer product.            </h5>
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

export { CDBuilderPattern, EXBuilderPattern, HTBuilderPattern };
