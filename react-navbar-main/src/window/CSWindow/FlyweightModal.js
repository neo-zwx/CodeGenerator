import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IShapeFlyweight {
    void Draw(string color);
  }      `,
  step2: `
  public class CircleFlyweight : IShapeFlyweight {
    private readonly string shapeType;  

    public CircleFlyweight() {
        shapeType = "Circle";
    }

    public void Draw(string color) {  
        Console.WriteLine($"Drawing {shapeType} in {color}.");
    }
  }

  public class SquareFlyweight : IShapeFlyweight {
    private readonly string shapeType;  

    public SquareFlyweight() {
        shapeType = "Square";
    }

    public void Draw(string color) {  
        Console.WriteLine($"Drawing {shapeType} in {color}.");
    }
  } `,
  step3: `
  public class ShapeFlyweightFactory {
    private Dictionary<string, IShapeFlyweight> flyweights = new Dictionary<string, IShapeFlyweight>();

    public IShapeFlyweight GetFlyweight(string key) {
        if (!flyweights.ContainsKey(key)) {
            switch (key) {
                case "Circle":
                    flyweights[key] = new CircleFlyweight();
                    break;
                case "Square":
                    flyweights[key] = new SquareFlyweight();
                    break;
                default:
                    throw new ArgumentException("Invalid shape key.");
            }
        }
        return flyweights[key];
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        ShapeFlyweightFactory factory = new ShapeFlyweightFactory();

        IShapeFlyweight circle = factory.GetFlyweight("Circle");
        circle.Draw("Red");

        IShapeFlyweight anotherCircle = factory.GetFlyweight("Circle");
        anotherCircle.Draw("Blue");

        IShapeFlyweight square = factory.GetFlyweight("Square");
        square.Draw("Green");

        Console.WriteLine(circle == anotherCircle);  // True，因為它們是共享的
        Console.WriteLine(circle == square);  // False，因為它們是不同的享元對象
    }
  }   `,
};
const cdcodes = {
  step1: `
  public interface ICharacter {
    void Display(int pointSize);
  } `,
  step2: `
  public class Character : ICharacter {
    private char symbol;
    private string fontFamily;

    public Character(char symbol, string fontFamily) {
        this.symbol = symbol;
        this.fontFamily = fontFamily;
    }

    public void Display(int pointSize) {
        Console.WriteLine($"{symbol} (字體: {fontFamily}, 大小: {pointSize})");
    }
  }`,
  step3: `public class CharacterFactory {
    private Dictionary<string, ICharacter> characters = new Dictionary<string, ICharacter>();

    public ICharacter GetCharacter(char symbol, string fontFamily) {
        string key = symbol + fontFamily;

        if (!characters.ContainsKey(key)) {
            characters[key] = new Character(symbol, fontFamily);
            Console.WriteLine($"創建字元 '{symbol}' 使用字體 '{fontFamily}'。");
        }
        return characters[key];
    }
  }`,
  step4: `class Program {
    static void Main(string[] args) {
        CharacterFactory factory = new CharacterFactory();

        string document = "Hello World!";
        string fontFamily = "Arial";
        int pointSize = 12;

        foreach (char symbol in document) {
            ICharacter character = factory.GetCharacter(symbol, fontFamily);
            character.Display(pointSize);
        }
    }
  }   `,
};

const HTFlyWeightPattern = ({ onHide, show, state }) => {
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
        <h4>Flyweight Pattern</h4>
        <p>
          Definition: Employ shared techniques to efficiently manage a vast
          quantity of small-grained objects.
        </p>
        <p>
          The Flyweight pattern is a structural design pattern that effectively
          supports the reuse of a large number of fine-grained objects through
          sharing. This pattern is commonly used to optimize performance and
          memory usage, especially in applications with a vast number of objects
          where a significant portion of the object's state can be shared.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/FlyweightIma/flyweighjtclass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Flyweight</code> interface represents a flyweight,
              which defines an
              <code>operation()</code> method that takes an{" "}
              <code>extrinsicState</code> parameter. Both
              <code>ConcreteFlyweight</code> and{" "}
              <code>UnsharedConcreteFlyweight</code> classes implement the
              <code>Flyweight</code> interface.
            </li>
            <li>
              2. The <code>ConcreteFlyweight</code> class is a concrete
              flyweight, which has a private
              <code>intrinsicState</code> attribute representing the intrinsic
              state of the flyweight. The <code>ConcreteFlyweight</code> class
              implements the <code>operation()</code>
              method, which displays both the intrinsic state (
              <code>intrinsicState</code>) and the extrinsic state (
              <code>extrinsicState</code>) on the console.
            </li>
            <li>
              3. The <code>UnsharedConcreteFlyweight</code> class is an unshared
              concrete flyweight, which has a private <code>allState</code>
              attribute representing the entire state of the unshared flyweight.
              The <code>UnsharedConcreteFlyweight</code> class implements the{" "}
              <code>operation()</code>
              method, which only displays the entire state (
              <code>allState</code>) on the console.
            </li>
            <li>
              4. The <code>FlyweightFactory</code> class is a flyweight factory,
              which is responsible for creating and managing flyweight objects.
              The <code>FlyweightFactory</code> class has a private
              <code>flyweights</code>
              attribute, which is a map used to store flyweight objects. The{" "}
              <code>FlyweightFactory</code> class also implements the
              <code>getFlyweight()</code>
              method, which takes a <code>key</code> parameter and returns the
              corresponding <code>ConcreteFlyweight</code>
              object from the map based on the value of the <code>key</code>. If
              the corresponding
              <code>ConcreteFlyweight</code>
              object does not exist, a new object is created and stored in the
              map.
            </li>
            <li>
              5. Client code can use the concrete creator class to call the{" "}
              <code>factoryMethod()</code> method to create the required
              concrete product object.
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
const EXFlyWeightPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFlyWeightPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implement the Flyweight Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define Flyweight interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement the specific Flyweight class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define Flyweight factory class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Use Flyweight mode</h3>
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

const CDFlyWeightPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFlyWeightPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Flyweight Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
              The Flyweight pattern finds a common use case in the font
              management systems of word processing applications. In this
              context, each character, be it a letter, numeral, or symbol, is
              treated as an intrinsic object. Given that a typical document may
              contain countless characters, creating a new instance for every
              character would place an excessive burden on system memory. The
              Flyweight pattern offers an elegant solution by enabling the
              sharing of character objects that possess identical font and style
              attributes. This shared approach results in a substantial decrease
              in memory consumption.{" "}
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the character interface</h3>
            <h5>First, we define a character interface, which declares operations for displaying characters.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete character classes</h3>
            <h5>Next, create a specific character class that implements the character interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the character factory class 3: 定義字元工廠類</h3>
            <h5>
            Next, we define a character factory class that is responsible for creating and managing the Flyweight objects for characters.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Display the document using the Flyweight pattern</h3>
            <h5>Obtain the shared character Flyweight objects through the character factory and display them.</h5>
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

export { CDFlyWeightPattern, EXFlyWeightPattern, HTFlyWeightPattern };
