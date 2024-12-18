import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public class House {
    private String foundation;
    private String walls;
    private String roof;

    public void setFoundation(String foundation) {
        this.foundation = foundation;
    }

    public void setWalls(String walls) {
        this.walls = walls;
    }

    public void setRoof(String roof) {
        this.roof = roof;
    }

    @Override
    public String toString() {
        return "House [foundation=" + foundation + ", walls=" + walls + ", roof=" + roof + "]";
    }
  }
    `,
  step2: `
  public interface HouseBuilder {
    void buildFoundation();
    void buildWalls();
    void buildRoof();
    House getResult();
  }
`,
  step3: `
  public class TraditionalHouseBuilder implements HouseBuilder {
    private House house;

    public TraditionalHouseBuilder() {
        this.house = new House();
    }

    @Override
    public void buildFoundation() {
        house.setFoundation("Traditional foundation");
    }

    @Override
    public void buildWalls() {
        house.setWalls("Traditional walls");
    }

    @Override
    public void buildRoof() {
        house.setRoof("Traditional roof");
    }

    @Override
    public House getResult() {
        return this.house;
    }
  }

  public class ModernHouseBuilder implements HouseBuilder {
    private House house;

    public ModernHouseBuilder() {
        this.house = new House();
    }

    @Override
    public void buildFoundation() {
        house.setFoundation("Modern foundation");
    }

    @Override
    public void buildWalls() {
        house.setWalls("Modern walls");
    }

    @Override
    public void buildRoof() {
        house.setRoof("Modern roof");
    }

    @Override
    public House getResult() {
        return this.house;
    }
  }
`,
  step4: `
  public class HouseDirector {
    private HouseBuilder builder;

    public HouseDirector(HouseBuilder builder) {
        this.builder = builder;
    }

    public void constructHouse() {
        builder.buildFoundation();
        builder.buildWalls();
        builder.buildRoof();
    }
  }
  `,
  step5: `
  public class BuilderPatternDemo {
    public static void main(String[] args) {
        HouseBuilder traditionalBuilder = new TraditionalHouseBuilder();
        HouseDirector director1 = new HouseDirector(traditionalBuilder);
        director1.constructHouse();
        House traditionalHouse = traditionalBuilder.getResult();
        System.out.println("Traditional House: " + traditionalHouse);

        HouseBuilder modernBuilder = new ModernHouseBuilder();
        HouseDirector director2 = new HouseDirector(modernBuilder);
        director2.constructHouse();
        House modernHouse = modernBuilder.getResult();
        System.out.println("Modern House: " + modernHouse);
    }
  }
  `,
};
const cdcodes = {
  step1: `
  public class Computer {
    private String CPU;
    private String memory;
    private String storage;

    public void setCPU(String CPU) {
        this.CPU = CPU;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    @Override
    public String toString() {
        return "Computer [CPU=" + CPU + ", memory=" + memory + ", storage=" + storage + "]";
    }
  }
  `,
  step2: `
  public interface ComputerBuilder {
    void buildCPU();
    void buildMemory();
    void buildStorage();
    Computer getResult();
  }
`,
  step3: `
  public class GamingComputerBuilder implements ComputerBuilder {
    private Computer computer;

    public GamingComputerBuilder() {
        this.computer = new Computer();
    }

    @Override
    public void buildCPU() {
        computer.setCPU("High-end Gaming CPU");
    }

    @Override
    public void buildMemory() {
        computer.setMemory("32GB DDR4 RAM");
    }

    @Override
    public void buildStorage() {
        computer.setStorage("1TB SSD");
    }

    @Override
    public Computer getResult() {
        return this.computer;
    }
  }

  public class OfficeComputerBuilder implements ComputerBuilder {
    private Computer computer;

    public OfficeComputerBuilder() {
        this.computer = new Computer();
    }

    @Override
    public void buildCPU() {
        computer.setCPU("Mid-range Office CPU");
    }

    @Override
    public void buildMemory() {
        computer.setMemory("16GB DDR4 RAM");
    }

    @Override
    public void buildStorage() {
        computer.setStorage("512GB SSD");
    }

    @Override
    public Computer getResult() {
        return this.computer;
    }
  }
`,
  step4: `
  public class ComputerDirector {
    private ComputerBuilder builder;

    public ComputerDirector(ComputerBuilder builder) {
        this.builder = builder;
    }

    public void constructComputer() {
        builder.buildCPU();
        builder.buildMemory();
        builder.buildStorage();
    }
  }
  `,
  step5: `
  public class BuilderPatternDemo {
    public static void main(String[] args) {
        ComputerBuilder gamingBuilder = new GamingComputerBuilder();
        ComputerDirector director1 = new ComputerDirector(gamingBuilder);
        director1.constructComputer();
        Computer gamingComputer = gamingBuilder.getResult();
        System.out.println("Gaming Computer: " + gamingComputer);

        ComputerBuilder officeBuilder = new OfficeComputerBuilder();
        ComputerDirector director2 = new ComputerDirector(officeBuilder);
        director2.constructComputer();
        Computer officeComputer = officeBuilder.getResult();
        System.out.println("Office Computer: " + officeComputer);
    }
  }

  `,
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
          Definition: Leverages shared objects to efficiently manage a large
          quantity of fine-grained objects.
        </p>
        <p>
          The Builder pattern is a structural design pattern optimized for
          performance and memory usage by reusing a large number of fine-grained
          objects through sharing.{" "}
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
              1. <code>Product class</code> represents the complex object being
              constructed and contains all necessary attributes.
            </li>
            <li>
              2. <code>Builder interface</code> declares the methods for
              constructing the parts of the product.
            </li>
            <li>
              3. <code>Concrete Builder class</code>
              Responsible for implementing the Builder interface and
              constructing the specific product.
            </li>
            <li>
              4. <code>Director class</code>
              Controls the construction process, ensuring that the product is
              built according to the specified steps.
            </li>
            <li>
              5. Client code uses a concrete Builder through the Director to
              construct different types of products and obtain the final product
              object.
            </li>
          </ul>{" "}
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
            <h2>Steps to implements Builder Pattern </h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the product class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the Builder interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement the concrete Builder.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Define the Director class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Builder pattern.</h3>
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
            <h3>Step 1:Define the product class.</h3>
            <h5>First, define the Computer class, which represents the final product we want to build.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the Builder interface.</h3>
            <h5>
            Create an interface, ComputerBuilder, to specify methods for building computer components.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3:Implement the concrete Builder.</h3>
            <h5>Create concrete builder classes to construct computers with various configurations.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4:Define the Director class.</h3>
            <h5>
            Create a ComputerDirector class to oversee the construction process using ComputerBuilder.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Apply the builder pattern.</h3>
            <h5>
            Utilize the ComputerDirector to create computers with different specifications in your client-side code.            </h5>
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

export { CDBuilderPattern, EXBuilderPattern, HTBuilderPattern };
