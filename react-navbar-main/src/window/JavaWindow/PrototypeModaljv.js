import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Prototype {
    Prototype clone();
  }
     `,
  step2: `
  public class Circle implements Prototype {
    private int radius;
    private String color;

    public Circle(int radius, String color) {
        this.radius = radius;
        this.color = color;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public Prototype clone() {
        return new Circle(this.radius, this.color);
    }

    @Override
    public String toString() {
        return "Circle [radius=" + radius + ", color=" + color + "]";
    }
  }

  public class Square implements Prototype {
    private int side;
    private String color;

    public Square(int side, String color) {
        this.side = side;
        this.color = color;
    }

    public int getSide() {
        return side;
    }

    public void setSide(int side) {
        this.side = side;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public Prototype clone() {
        return new Square(this.side, this.color);
    }

    @Override
    public String toString() {
        return "Square [side=" + side + ", color=" + color + "]";
    }
  }
 `,
  step3: `
  public class PrototypePatternDemo {
    public static void main(String[] args) {
        // Create original objects
        Circle originalCircle = new Circle(10, "Red");
        Square originalSquare = new Square(5, "Blue");

        // Clone the original objects
        Circle clonedCircle = (Circle) originalCircle.clone();
        Square clonedSquare = (Square) originalSquare.clone();

        // Print original and cloned objects
        System.out.println("Original Circle: " + originalCircle);
        System.out.println("Cloned Circle: " + clonedCircle);
        
        System.out.println("Original Square: " + originalSquare);
        System.out.println("Cloned Square: " + clonedSquare);

        // Modify cloned objects
        clonedCircle.setRadius(20);
        clonedCircle.setColor("Green");
        clonedSquare.setSide(10);
        clonedSquare.setColor("Yellow");

        // Print modified cloned objects
        System.out.println("Modified Cloned Circle: " + clonedCircle);
        System.out.println("Modified Cloned Square: " + clonedSquare);
    }
  }
`,
};
const cdcodes = {
  step1: `
  public interface Prototype {
    Prototype clone();
  }
`,
  step2: `
  public class Warrior implements Prototype {
    private String name;
    private int level;
    private String weapon;

    public Warrior(String name, int level, String weapon) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getWeapon() {
        return weapon;
    }

    public void setWeapon(String weapon) {
        this.weapon = weapon;
    }

    @Override
    public Prototype clone() {
        return new Warrior(this.name, this.level, this.weapon);
    }

    @Override
    public String toString() {
        return "Warrior [name=" + name + ", level=" + level + ", weapon=" + weapon + "]";
    }
  }

  public class Mage implements Prototype {
    private String name;
    private int level;
    private String spell;

    public Mage(String name, int level, String spell) {
        this.name = name;
        this.level = level;
        this.spell = spell;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getSpell() {
        return spell;
    }

    public void setSpell(String spell) {
        this.spell = spell;
    }

    @Override
    public Prototype clone() {
        return new Mage(this.name, this.level, this.spell);
    }

    @Override
    public String toString() {
        return "Mage [name=" + name + ", level=" + level + ", spell=" + spell + "]";
    }
  }
`,
  step3: `
  public class PrototypePatternDemo {
    public static void main(String[] args) {
        Warrior originalWarrior = new Warrior("Conan", 10, "Sword");
        Mage originalMage = new Mage("Gandalf", 15, "Fireball");

        Warrior clonedWarrior = (Warrior) originalWarrior.clone();
        Mage clonedMage = (Mage) originalMage.clone();

        System.out.println("Original Warrior: " + originalWarrior);
        System.out.println("Cloned Warrior: " + clonedWarrior);

        System.out.println("Original Mage: " + originalMage);
        System.out.println("Cloned Mage: " + clonedMage);

        clonedWarrior.setName("Thor");
        clonedWarrior.setWeapon("Hammer");
        clonedMage.setName("Merlin");
        clonedMage.setSpell("Lightning");

        System.out.println("Modified Cloned Warrior: " + clonedWarrior);
        System.out.println("Modified Cloned Mage: " + clonedMage);
    }
}
`,
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
            <h2>Steps to implements Prototype Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Prototype Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Prototypes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Prototype Pattern</h3>
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
            <h3>Scenario：</h3>
            <p>Suppose we are developing a character creation system, where characters have various attributes such as name, level, and equipment. We want to be able to quickly generate new characters by cloning existing ones, rather than recreating all attributes.</p>
          </div>
          <div className="step">
            <h3>Step 1: Create a Prototype interface.</h3>
            <h5>Firstly, define a Prototype interface, declaring the clone method.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete prototype classes.</h3>
            <h5>We will implement several concrete character classes, such as Warrior and Mage, which implement the Prototype interface and provide specific cloning logic.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Prototype pattern.</h3>
            <h5>In the client code, we will create character objects, clone them, and display their attributes.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
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

export { CDPrototypePattern, EXPrototypePattern, HTPrototypePattern };
