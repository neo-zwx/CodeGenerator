import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Button {
    void paint();
  }

  public interface Checkbox {
    void paint();
  }     `,
  step2: `
  public class DarkButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering a button in dark theme.");
    }
  }

  public class DarkCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering a checkbox in dark theme.");
    }
  } `,
  step3: `
  public class LightButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering a button in light theme.");
    }
  }

  public class LightCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering a checkbox in light theme.");
    }
  }`,
  step4: `
  public interface ThemeFactory {
    Button createButton();
    Checkbox createCheckbox();
  }  `,
};
const cdcodes = {
  step1: `
  public interface ICharacter {
    void Display(int pointSize);
  } `,
  step2: `
  
  public class DarkButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering a button in dark theme.");
    }
  }

  public class DarkCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering a checkbox in dark theme.");
    }
  }


  public class LightButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering a button in light theme.");
    }
  }

  public class LightCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering a checkbox in light theme.");
    }
  }`,
  step3: `
  public interface ThemeFactory {
    Button createButton();
    Checkbox createCheckbox();
  }`,
  step4: `
  public class DarkThemeFactory implements ThemeFactory {
    @Override
    public Button createButton() {
        return new DarkButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new DarkCheckbox();
    }
  }


  public class LightThemeFactory implements ThemeFactory {
    @Override
    public Button createButton() {
        return new LightButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new LightCheckbox();
    }
  }`,
  step5: `
  public class ThemeApplication {
    private Button button;
    private Checkbox checkbox;

    public ThemeApplication(ThemeFactory factory) {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }

    public void render() {
        button.paint();
        checkbox.paint();
    }

    public static void main(String[] args) {
        ThemeFactory factory;
        String theme = "dark";  

        if (theme.equals("dark")) {
            factory = new DarkThemeFactory();
        } else {
            factory = new LightThemeFactory();
        }

        ThemeApplication app = new ThemeApplication(factory);
        app.render();
    }
  } `,
};

const HTAbstractFactoryPattern = ({ onHide, show, state }) => {
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
        <h4>AbstractFactory Pattern</h4>
        <p>
          Definition: Utilize sharing technology to efficiently support a large
          number of fine-grained objects.
        </p>
        <p>
          The Abstract Factory pattern is a structural design pattern used to
          efficiently support the reuse of a large number of fine-grained
          objects through sharing. This pattern is typically used to optimize
          performance and memory usage, especially when an application uses a
          large number of objects, many of which can have shareable states.{" "}
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
              1. The <code>AbstractFactory</code> interface represents the
              flyweight, defining an <code>operation()</code> method that takes
              an <code>extrinsicState</code> parameter. Both
              <code>ConcreteAbstractFactory</code> and
              <code>UnsharedConcreteAbstractFactory</code> classes implement the
              <code>AbstractFactory</code> interface.
            </li>
            <li>
              2. The <code>ConcreteAbstractFactory</code> class is a concrete
              flyweight, having a private <code>intrinsicState</code> property
              that represents the intrinsic state of the flyweight. The
              <code>ConcreteAbstractFactory</code> class implements the
              <code>operation()</code> method, which displays the intrinsic
              state (<code>intrinsicState</code>) and the extrinsic state (
              <code>extrinsicState</code>) on the console.
            </li>
            <li>
              3. The <code>UnsharedConcreteAbstractFactory</code> class is a
              non-shared concrete flyweight, having a private
              <code>allState</code> property that represents the entire state of
              the non-shared flyweight. The
              <code>UnsharedConcreteAbstractFactory</code> class implements the
              <code>operation()</code> method, which only displays the entire
              state (<code>allState</code>) on the console.
            </li>
            <li>
              4. The <code>AbstractFactoryFactory</code> class is the flyweight
              factory responsible for creating and managing flyweight objects.
              The <code>AbstractFactoryFactory</code> class has a private
              <code>AbstractFactorys</code> property, which is a map used to
              store flyweight objects. The <code>AbstractFactoryFactory</code>
              class also implements the <code>getAbstractFactory()</code>
              method, which takes a <code>key</code> parameter and returns the
              corresponding <code>ConcreteAbstractFactory</code> object from the
              map based on the value of <code>key</code>. If the corresponding
              <code>ConcreteAbstractFactory</code> object does not exist, a new
              object will be created and stored in the map.
            </li>
            <li>
              5. Client code can use specific creator classes to call the
              <code>factoryMethod()</code> method to create the required
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
};
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
            <h2>Steps to implements AbstractFactory Pattern 實現步驟</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the AbstractFactory Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete AbstractFactory Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the AbstractFactory Factory Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the AbstractFactory Pattern</h3>
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
            <h2>AbstractFactory Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Product Interfaces</h3>
            <h5>First, we define the interfaces for the button and the dialog box.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Product Classes</h3>
            <h5>Next, we implement the button and dialog box for both Light and Dark themes.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the Abstract Factory</h3>
            <h5>Next, define an abstract interface that declares methods for creating buttons and dialog boxes.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement Concrete Factories</h3>
            <h5>Then, implement concrete factories for the Light and Dark themes.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the AbstractFactory Pattern</h3>
            <h5>Select the appropriate factory based on the desired theme and use the factory to create the components.</h5>
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

export {
  CDAbstractFactoryPattern,
  EXAbstractFactoryPattern,
  HTAbstractFactoryPattern,
};
