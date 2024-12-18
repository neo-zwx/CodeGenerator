import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IHandler {
    void SetNext(IHandler handler);
    void HandleRequest(string request);
  }    `,
  step2: `
  public class ConcreteHandlerA : IHandler {
    private IHandler nextHandler;

    public void SetNext(IHandler handler) {
        nextHandler = handler;
    }

    public void HandleRequest(string request) {
        if (request == "A") {
            Console.WriteLine("ConcreteHandlerA handled the request.");
        } else if (nextHandler != null) {
            nextHandler.HandleRequest(request);
        }
    }
  }

  public class ConcreteHandlerB : IHandler {
    private IHandler nextHandler;

    public void SetNext(IHandler handler) {
        nextHandler = handler;
    }

    public void HandleRequest(string request) {
        if (request == "B") {
            Console.WriteLine("ConcreteHandlerB handled the request.");
        } else if (nextHandler != null) {
            nextHandler.HandleRequest(request);
        }
    }
  }`,
  step3: `
  class Program {
    static void Main(string[] args) {
        IHandler handlerA = new ConcreteHandlerA();
        IHandler handlerB = new ConcreteHandlerB();

        handlerA.SetNext(handlerB);

        string[] requests = { "A", "B", "C" };

        foreach (var request in requests) {
            handlerA.HandleRequest(request);
        }
    }
  }`,
};
const cdcodes = {
  step1: `
  public interface IApprover {
    void SetNext(IApprover approver);
    void ProcessRequest(LeaveRequest request);
  } `,
  step2: `
  public class Supervisor : IApprover {
    private IApprover nextApprover;

    public void SetNext(IApprover approver) {
        nextApprover = approver;
    }

    public void ProcessRequest(LeaveRequest request) {
        if (request.Days <= 3) {
            Console.WriteLine($"Leave request approved by the direct supervisor");
        } else if (nextApprover != null) {
            nextApprover.ProcessRequest(request);
        }
    }
  }

  public class DepartmentManager : IApprover {
    private IApprover nextApprover;

    public void SetNext(IApprover approver) {
        nextApprover = approver;
    }

    public void ProcessRequest(LeaveRequest request) {
        if (request.Days <= 7) {
            Console.WriteLine($"Leave request approved by the department manager");
        } else if (nextApprover != null) {
            nextApprover.ProcessRequest(request);
        }
    }
  }

  public class HR : IApprover {
    public void SetNext(IApprover approver) {
    }

    public void ProcessRequest(LeaveRequest request) {
        Console.WriteLine($"Leave request approved by the Human Resources department");
    }
  }`,
  step3: `
  public class LeaveRequest {
    public string Employee { get; set; }
    public int Days { get; set; }

    public LeaveRequest(string employee, int days) {
        Employee = employee;
        Days = days;
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        IApprover supervisor = new Supervisor();
        IApprover departmentManager = new DepartmentManager();
        IApprover hr = new HR();

        supervisor.SetNext(departmentManager);
        departmentManager.SetNext(hr);

        LeaveRequest request = new LeaveRequest("Amy", 2);
        supervisor.ProcessRequest(request); 

        LeaveRequest request2 = new LeaveRequest("Charlie", 5);
        supervisor.ProcessRequest(request2); 

        LeaveRequest request3 = new LeaveRequest("Sally", 10);
        supervisor.ProcessRequest(request3); 
    }
  } `,
};

const HTChainOfResponsibilityPattern = ({ onHide, show, state }) => {
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
        <h4>Chain Of Responsibility Pattern</h4>
        <p>
          Definition: Chain multiple objects together in a chain and pass a
          request along this chain, with each object processing the request.{" "}
        </p>
        <p>
          The Chain of Responsibility Pattern is a behavioral design pattern
          used to decouple the sender of a request from its receiver, allowing
          multiple objects to have the opportunity to handle the request. The
          request is passed along a chain of objects until one of them handles
          it.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/ChainOfResponsibilityIma/ChainOfResponsibilityClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Handler</code>: This is an interface or abstract class
              that defines the method{" "}
              <code>handle(request: string): string</code> for handling requests
              and the method <code>setNext(handler: Handler): Handler</code> for
              setting the next handler in the chain. This allows handlers in the
              chain to dynamically decide who the next handler will be.
            </li>
            <li>
              2. <code>AbstractHandler</code>: This is an abstract class that
              implements the <code>Handler</code> interface. It contains a
              reference to the next handler in the chain,{" "}
              <code>nextHandler</code>. Its <code>setNext()</code> method allows
              linking handlers, and its <code>handle()</code> method may pass
              the request to the next handler in the chain.
            </li>
            <li>
              3. <code>ConcreteHandler1</code> and <code>ConcreteHandler2</code>
              : These are concrete handler classes that implement the request
              handling method. If a handler cannot process a request, it can
              pass the request to the next handler in the chain.
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
const EXChainOfResponsibilityPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXChainOfResponsibilityPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Implementation steps for the Chain of Responsibility pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Handler Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Handler Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Build the Chain of Responsibility</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
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

const CDChainOfResponsibilityPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXChainOfResponsibilityPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Chain Of Responsibility Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Assume a company has a leave approval process where, depending on the number of leave days, the request needs to be approved by either a direct supervisor, department manager, or the human resources department. Using the Chain of Responsibility pattern, we can establish a chain of approval so that the request is passed along the chain until it is handled.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Approval Request Interface</h3>
            <h5>First, we define an approval request interface that declares the method for handling approval requests.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Define Concrete Approver Classes</h3>
            <h5>Next, we create different levels of approver classes that implement the approval request interface. These classes will handle specific types of requests or pass them along the chain if they are unable to process them.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Define the Leave Request Class</h3>
            <h5>Define a leave request class that includes details about the leave.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Build the Approval Chain and Handle Requests</h3>
            <h5>The client constructs the approval chain and passes the leave request to the first handler in the chain.</h5>
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

export {
  CDChainOfResponsibilityPattern,
  EXChainOfResponsibilityPattern,
  HTChainOfResponsibilityPattern,
};
