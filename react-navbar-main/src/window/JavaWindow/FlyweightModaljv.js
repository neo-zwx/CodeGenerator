import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Character {
    void display(int x, int y); // 显示字符的方法，参数表示字符的显示位置
  }
  `,
  step2: `
  public class ConcreteCharacter implements Character {
    private char character; // 享元对象的内部状态

    public ConcreteCharacter(char character) {
        this.character = character;
    }

    @Override
    public void display(int x, int y) {
        System.out.println("Character: " + character + " at position (" + x + ", " + y + ")");
    }
  }

`,
  step3: `
  import java.util.HashMap;
  import java.util.Map;

  public class CharacterFactory {
    private Map<Character, ConcreteCharacter> characterMap = new HashMap<>();

    public ConcreteCharacter getCharacter(char character) {
        if (!characterMap.containsKey(character)) {
            characterMap.put(character, new ConcreteCharacter(character));
        }
        return characterMap.get(character);
    }
}

`,
  step4: `
  public class FlyweightPatternDemo {
    public static void main(String[] args) {
        CharacterFactory characterFactory = new CharacterFactory();

        Character charA = characterFactory.getCharacter('A');
        charA.display(0, 0);

        Character charB = characterFactory.getCharacter('B');
        charB.display(1, 1);

        Character charA2 = characterFactory.getCharacter('A');
        charA2.display(2, 2);

    }
  }

  `,
};
const cdcodes = {
  step1: `
  public interface Tree {
    void draw(int x, int y); // 绘制树木的方法，参数表示树木的位置
  }
 `,
  step2: `
  public class ConcreteTree implements Tree {
    private String type; // 享元对象的内部状态：树木的类型

    public ConcreteTree(String type) {
        this.type = type;
    }

    @Override
    public void draw(int x, int y) {
        System.out.println("Drawing a " + type + " tree at position (" + x + ", " + y + ")");
    }
  }
`,
  step3: `
  import java.util.HashMap;
  import java.util.Map;

  public class TreeFactory {
    private Map<String, ConcreteTree> treeMap = new HashMap<>();

    public ConcreteTree getTree(String type) {
        // 如果对象已存在，返回共享对象；否则，创建新的对象并保存
        if (!treeMap.containsKey(type)) {
            treeMap.put(type, new ConcreteTree(type));
        }
        return treeMap.get(type);
    }
  }
`,
  step4: `
  public class FlyweightPatternDemo {
    public static void main(String[] args) {
        TreeFactory treeFactory = new TreeFactory();

        Tree oakTree = treeFactory.getTree("Oak");
        oakTree.draw(10, 20);

        Tree pineTree = treeFactory.getTree("Pine");
        pineTree.draw(30, 40);

        Tree oakTree2 = treeFactory.getTree("Oak");
        oakTree2.draw(50, 60);

    }
}
 `,
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
            <h2>Steps to implements Flyweight Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the flyweight interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete flyweight classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the flyweight factory class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Flyweight Pattern.</h3>
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
            <h3>Scenario:</h3>
            <p>Suppose we are developing a forest simulation application that contains a large number of trees. Each tree has the same shape and color, but they are located at different positions in the forest. We want to reduce memory usage by sharing the same type of tree objects.</p>
          </div>
          <div className="step">
            <h3>Step 1: Define the flyweight interface.</h3>
            <h5> Firstly, we define a flyweight interface, declaring the methods that all tree objects must implement.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete flyweight classes.</h3>
            <h5>Implement concrete flyweight classes representing specific tree objects. These classes implement the Tree interface and hold the object's intrinsic state (i.e., the tree's shape and color).</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the flyweight factory class</h3>
            <h5>The flyweight factory class is responsible for creating and managing flyweight objects. It ensures the sharing of flyweight objects and provides a method to retrieve them.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Flyweight Pattern.</h3>
            <h5>
            In the client code, use the TreeFactory to obtain shared tree objects and draw these trees.            </h5>
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

export { CDFlyWeightPattern, EXFlyWeightPattern, HTFlyWeightPattern };
