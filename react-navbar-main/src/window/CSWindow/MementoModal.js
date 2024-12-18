import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public class Memento {
    public string State { get; private set; }

    public Memento(string state) {
        State = state;
    }
  }     `,
  step2: `
  public class Originator {
    public string State { get; set; }

    public Memento SaveStateToMemento() {
        return new Memento(State);
    }

    public void GetStateFromMemento(Memento memento) {
        State = memento.State;
    }
  } `,
  step3: `
  public class Caretaker {
    private List<Memento> mementoList = new List<Memento>();

    public void Add(Memento state) {
        mementoList.Add(state);
    }

    public Memento Get(int index) {
        return mementoList[index];
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();

        originator.State = "State #1";
        originator.State = "State #2";
        caretaker.Add(originator.SaveStateToMemento());

        originator.State = "State #3";
        caretaker.Add(originator.SaveStateToMemento());

        originator.State = "State #4";
        Console.WriteLine("Present state: " + originator.State);

        originator.GetStateFromMemento(caretaker.Get(0));
        Console.WriteLine("First saved state: " + originator.State);

        originator.GetStateFromMemento(caretaker.Get(1));
        Console.WriteLine("The state after the second save: " + originator.State);
    }
  }   `,
};
const cdcodes = {
  step1: `
  public class CodeSnapshot {
    public string Code { get; private set; }
    public string Version { get; private set; }

    public CodeSnapshot(string code, string version) {
        Code = code;
        Version = version;
    }
  } `,
  step2: `
  public class CodeRepository {
    public string Code { get; set; }

    public CodeSnapshot SaveState(string version) {
        return new CodeSnapshot(Code, version);
    }

    public void RestoreState(CodeSnapshot snapshot) {
        Code = snapshot.Code;
    }
  }`,
  step3: `
  public class VersionControlSystem {
    private List<CodeSnapshot> snapshots = new List<CodeSnapshot>();

    public void Commit(CodeSnapshot snapshot) {
        snapshots.Add(snapshot);
    }

    public CodeSnapshot GetSnapshot(int index) {
        return snapshots[index];
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        CodeRepository repository = new CodeRepository();
        VersionControlSystem vcs = new VersionControlSystem();

        repository.Code = "Initial code";
        vcs.Commit(repository.SaveState("v1.0"));

        repository.Code = "Added feature";
        vcs.Commit(repository.SaveState("v1.1"));

        repository.RestoreState(vcs.GetSnapshot(0));
        Console.WriteLine($"The code for version 1.0: {repository.Code}");

        repository.RestoreState(vcs.GetSnapshot(1));
        Console.WriteLine($"The code for version 1.1: {repository.Code}");
    }
  }  `,
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
            <h2>Steps to implement the Memento Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Create the Memento class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create the Originator class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Create the Caretaker class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the Memento pattern</h3>
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
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Suppose a software development company needs to manage the source code versions of its products to track historical changes and be able to restore to a specific version when necessary. By using the Memento pattern, we can create a snapshot for each commit, thus achieving version saving and restoration functionality.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Code Snapshot Memento class</h3>
            <h5>
            Initially, we create a Memento class to capture and store the state of the code at a particular version.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement the Code Repository Originator class</h3>
            <h5>
            Subsequently, we construct a Code Repository Originator class, designed to represent the code repository that requires state preservation.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Create the Caretaker class for version control</h3>
            <h5>
            Subsequently, we create a Caretaker class for version control to manage CodeSnapshot objects.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the Memento pattern to achieve version control</h3>
            <h5>Employ the Memento pattern to capture and restore various states of the code repository.</h5>
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

export { CDMementoPattern, EXMementoPattern, HTMementoPattern };
