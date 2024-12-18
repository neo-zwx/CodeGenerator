import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Command {
    void execute();
  }
     `,
  step2: `
  public class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOn();
    }
  }

  public class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.turnOff();
    }
  }
`,
  step3: `
  public class Light {
    public void turnOn() {
        System.out.println("The light is on.");
    }

    public void turnOff() {
        System.out.println("The light is off.");
    }
  }
`,
  step4: `
  public class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
  }
  `,
  step5: `
  public class CommandPatternDemo {
    public static void main(String[] args) {
        Light light = new Light();

        Command lightOn = new LightOnCommand(light);
        Command lightOff = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();

        remote.setCommand(lightOff);
        remote.pressButton();
    }
  }

  `,
};
const cdcodes = {
  step1: `
  public interface Command {
    void execute();
    void undo();
  }
 `,
  step2: `
  public class InsertTextCommand implements Command {
    private TextEditor textEditor;
    private String text;

    public InsertTextCommand(TextEditor textEditor, String text) {
        this.textEditor = textEditor;
        this.text = text;
    }

    @Override
    public void execute() {
        textEditor.insertText(text);
    }

    @Override
    public void undo() {
        textEditor.deleteText(text);
    }
  }

  public class DeleteTextCommand implements Command {
    private TextEditor textEditor;
    private String text;

    public DeleteTextCommand(TextEditor textEditor, String text) {
        this.textEditor = textEditor;
        this.text = text;
    }

    @Override
    public void execute() {
        textEditor.deleteText(text);
    }

    @Override
    public void undo() {
        textEditor.insertText(text);
    }
  }
`,
  step3: `
  public class TextEditor {
    private StringBuilder text = new StringBuilder();

    public void insertText(String text) {
        this.text.append(text);
        System.out.println("Text after insertion: " + this.text.toString());
    }

    public void deleteText(String text) {
        int start = this.text.lastIndexOf(text);
        if (start != -1) {
            this.text.delete(start, start + text.length());
            System.out.println("Text after deletion: " + this.text.toString());
        }
    }
  }
`,
  step4: `
  public class EditorActions {
    private Command lastCommand;

    public void executeCommand(Command command) {
        command.execute();
        lastCommand = command;
    }

    public void undoLastCommand() {
        if (lastCommand != null) {
            lastCommand.undo();
        }
    }
  }
`,
step5: `
  public class CommandPatternDemo {
    public static void main(String[] args) {
        TextEditor textEditor = new TextEditor();

        Command insertHello = new InsertTextCommand(textEditor, "Hello");
        Command deleteHello = new DeleteTextCommand(textEditor, "Hello");

        EditorActions editorActions = new EditorActions();

        editorActions.executeCommand(insertHello);
        editorActions.executeCommand(deleteHello);

        editorActions.undoLastCommand();
        editorActions.undoLastCommand();
    }
  }

`,
};

const HTCommandPattern = ({ onHide, show, state }) => {
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
        <h4>Command Pattern</h4>
        <p>
          Definition: A design pattern that encapsulates a request as an object,
          promoting flexibility in parameterizing clients, queuing or logging
          requests, and enabling undo operations.{" "}
        </p>
        <p>
          The Command pattern is an object-oriented design pattern that
          encapsulates a request within an object, thereby promoting flexibility
          in parameterizing clients, queuing or logging requests, and enabling
          undo operations.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/CommandIma/CommandClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Command</code> interface defines a contract for executing an
              operation.
            </li>
            <li>
              2. <code>ConcreteCommand</code> classes encapsulate a request as an object,
              knowing how to carry out the request. They delegate the actual
              execution to a `Receiver` object.
            </li>
            <li>
              3. The <code>Receiver</code> object knows how to perform the operations
              associated with carrying out a request.
            </li>
            <li>
              4. The <code>Invoker</code> object is responsible for calling the `execute()`
              method of a command. It can store multiple commands and execute
              them at appropriate times.
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
const EXCommandPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXCommandPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps  to implements Command Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the command interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete commands.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the receiver class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Define the invoker class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Command pattern.</h3>
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

const CDCommandPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXCommandPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Command Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the command interface.</h3>
            <h5>Create an interface that specifies methods to execute and undo commands.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete commands. </h3>
            <h5>Create specific command classes to encapsulate operations like inserting or deleting text.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the receiver class.</h3>
            <h5>The receiver class actually performs the operations (such as inserting and deleting text).</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Define the invoker class.   </h3>
            <h5>
            The invoker class holds the command object and invokes it when needed.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Command pattern.</h3>
            <h5>Create a receiver, command, and invoker in the client code, then execute and undo commands.</h5>
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

export { CDCommandPattern, EXCommandPattern, HTCommandPattern };
