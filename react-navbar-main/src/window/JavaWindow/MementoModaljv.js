import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
  }
     `,
  step2: `
  public class TextEditor {
    private StringBuilder content = new StringBuilder();

    public void write(String text) {
        content.append(text);
    }

    public String getContent() {
        return content.toString();
    }

    public Memento save() {
        return new Memento(content.toString());
    }

    public void restore(Memento memento) {
        content = new StringBuilder(memento.getState());
    }
  }
`,
  step3: `
  import java.util.Stack;

  public class Caretaker {
    private Stack<Memento> mementos = new Stack<>();

    public void saveMemento(Memento memento) {
        mementos.push(memento);
    }

    public Memento getMemento() {
        if (!mementos.isEmpty()) {
            return mementos.pop();
        }
        return null;
    }
  }
`,
  step4: `
  public class MementoPatternDemo {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        Caretaker caretaker = new Caretaker();

        editor.write("Hello, ");
        caretaker.saveMemento(editor.save());  // 保存状态

        editor.write("world!");
        caretaker.saveMemento(editor.save());  // 保存状态

        editor.write(" This is a test.");
        caretaker.saveMemento(editor.save());  // 保存状态

        System.out.println("Current Content: " + editor.getContent());

        editor.restore(caretaker.getMemento());
        System.out.println("After undo: " + editor.getContent());

        editor.restore(caretaker.getMemento());
        System.out.println("After undo: " + editor.getContent());

        editor.restore(caretaker.getMemento());
        System.out.println("After undo: " + editor.getContent());
    }
  }
  `,
};
const cdcodes = {
  step1: `
  public class GameMemento {
    private int score;

    public GameMemento(int score) {
        this.score = score;
    }

    public int getScore() {
        return score;
    }
  }
 `,
  step2: `
  public class Game {
    private int score;

    public void play(int points) {
        score += points;
        System.out.println("Playing... Current score: " + score);
    }

    public int getScore() {
        return score;
    }

    public GameMemento save() {
        return new GameMemento(score);
    }

    public void restore(GameMemento memento) {
        this.score = memento.getScore();
        System.out.println("Restored to previous score: " + score);
    }
  }
`,
  step3: `
  import java.util.Stack;

  public class GameCaretaker {
    private Stack<GameMemento> mementos = new Stack<>();

    public void saveMemento(GameMemento memento) {
        mementos.push(memento);
    }

    public GameMemento getMemento() {
        if (!mementos.isEmpty()) {
            return mementos.pop();
        }
        return null;
    }
  }
`,
  step4: `
  public class MementoPatternGameDemo {
    public static void main(String[] args) {
        Game game = new Game();
        GameCaretaker caretaker = new GameCaretaker();

        game.play(10);
        caretaker.saveMemento(game.save());  // 保存状态（达到关卡1）

        game.play(20);
        caretaker.saveMemento(game.save());  // 保存状态（达到关卡2）

        game.play(15);
        System.out.println("Current Score: " + game.getScore());

        game.restore(caretaker.getMemento());
        System.out.println("Score after restoring: " + game.getScore());

        game.restore(caretaker.getMemento());
        System.out.println("Score after restoring: " + game.getScore());
    }
  }
  `,
};

const HTMementoPattern = ({ onHide, show, state }) => {
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
        <h4>Memento Pattern</h4>
        <p>
          Definition: A mechanism that captures and preserves a specific
          point-in-time state of an object, without exposing its internal
          representation, enabling the object to be reverted to this saved state
          at a later time.
        </p>
        <p>
          The Memento pattern provides a way to save and restore an object's
          internal state without violating encapsulation.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/MementoIma/MementoClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Memento</code>
              The Memento class is a memento, used to store the state of an
              originator. It has a private
              <code>state</code> attribute and provides a{" "}
              <code>getState()</code> method to get the value of the state.
            </li>
            <li>
              2. The <code>Originator</code> class is the originator, which has
              a<code>state</code> attribute to store the value of the state. The{" "}
              <code>Originator</code> class provides methods to set and get the
              state, as well as to save the state to a memento and restore the
              state from a memento.
            </li>
            <li>
              3. The <code>Caretaker</code> class is responsible for managing
              mementos. It has a<code>mementoList</code> attribute to store a
              list of memento objects. The
              <code>Caretaker</code> class provides methods to add mementos to
              the list and get mementos from the list.
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
const EXMementoPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXMementoPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Memento Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Create a Memento class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Create an Originator class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Create a Caretaker class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Memento Pattern to save and restore state.</h3>
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
const CDMementoPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXMementoPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Memento Pattern Example</h2>
            <h3>Scenario：</h3>
            <p>Suppose we are developing a simple game where players accumulate points as they play. When the player reaches a new level, the game saves the current score. If the player fails, the game can restore the score to the previously saved state.</p>
          </div>
          <div className="step">
            <h3>Step 1:</h3>
            <h5>Firstly, define a Memento class to store the game's state (score).</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the Originator class.</h3>
            <h5>Define an Originator class, which is the game object that needs to save its state (score), and provides methods for creating and restoring mementos.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the Caretaker class.</h3>
            <h5>Define a Caretaker class, responsible for managing the saving and restoring operations of memento objects.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Memento Pattern for state saving and restoration.</h3>
            <h5>
            In the client code, use the Memento Pattern to manage the game's state, supporting the restoration of previous scores when the player fails.            </h5>
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

export { CDMementoPattern, EXMementoPattern, HTMementoPattern };
