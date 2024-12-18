import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public abstract class Approver {
    protected Approver nextApprover;

    public void setNextApprover(Approver nextApprover) {
        this.nextApprover = nextApprover;
    }

    public abstract void handleRequest(Request request);
    }
  }      `,
  step2: `
  public class Request {
    private int amount;
    private String description;

    public Request(int amount, String description) {
        this.amount = amount;
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }
  }
 `,
  step3: `
  public class Manager extends Approver {
    @Override
    public void handleRequest(Request request) {
        if (request.getAmount() <= 1000) {
            System.out.println("Manager approves request: " + request.getDescription());
        } else if (nextApprover != null) {
            nextApprover.handleRequest(request);
        }
    }
  }

  public class Director extends Approver {
    @Override
    public void handleRequest(Request request) {
        if (request.getAmount() <= 5000) {
            System.out.println("Director approves request: " + request.getDescription());
        } else if (nextApprover != null) {
            nextApprover.handleRequest(request);
        }
    }
  }

  public class CEO extends Approver {
    @Override
    public void handleRequest(Request request) {
        if (request.getAmount() <= 10000) {
            System.out.println("CEO approves request: " + request.getDescription());
        } else {
            System.out.println("Request amount too high, cannot be approved.");
        }
    }
  }
`,
  step4: `
  public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        Approver manager = new Manager();
        Approver director = new Director();
        Approver ceo = new CEO();

        manager.setNextApprover(director);
        director.setNextApprover(ceo);

        Request request1 = new Request(500, "Purchase office supplies");
        Request request2 = new Request(3000, "Purchase new laptops");
        Request request3 = new Request(8000, "Build a new office wing");
        Request request4 = new Request(15000, "Expand company headquarters");

        manager.handleRequest(request1);
        manager.handleRequest(request2);
        manager.handleRequest(request3);
        manager.handleRequest(request4);
    }
  }
 `,
};
const cdcodes = {
  step1: `
  public abstract class AccessHandler {
    protected AccessHandler nextHandler;

    public void setNextHandler(AccessHandler nextHandler) {
        this.nextHandler = nextHandler;
    }

    public abstract void handleRequest(UserRequest request);
  }
 `,
  step2: `
  public class UserRequest {
    private String resource;
    private String userRole;

    public UserRequest(String resource, String userRole) {
        this.resource = resource;
        this.userRole = userRole;
    }

    public String getResource() {
        return resource;
    }

    public String getUserRole() {
        return userRole;
    }
  }
`,
  step3: `
  public class UserAccessHandler extends AccessHandler {
    @Override
    public void handleRequest(UserRequest request) {
        if ("user".equalsIgnoreCase(request.getUserRole())) {
            System.out.println("UserAccessHandler allows access to resource: " + request.getResource());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
  }

  public class ManagerAccessHandler extends AccessHandler {
    @Override
    public void handleRequest(UserRequest request) {
        if ("manager".equalsIgnoreCase(request.getUserRole())) {
            System.out.println("ManagerAccessHandler allows access to resource: " + request.getResource());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
  }

  public class AdminAccessHandler extends AccessHandler {
    @Override
    public void handleRequest(UserRequest request) {
        if ("admin".equalsIgnoreCase(request.getUserRole())) {
            System.out.println("AdminAccessHandler allows access to resource: " + request.getResource());
        } else {
            System.out.println("Access denied for resource: " + request.getResource());
        }
    }
  }
`,
  step4: `
  public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        AccessHandler userHandler = new UserAccessHandler();
        AccessHandler managerHandler = new ManagerAccessHandler();
        AccessHandler adminHandler = new AdminAccessHandler();

        userHandler.setNextHandler(managerHandler);
        managerHandler.setNextHandler(adminHandler);

        UserRequest request1 = new UserRequest("View Dashboard", "user");
        UserRequest request2 = new UserRequest("Edit Settings", "manager");
        UserRequest request3 = new UserRequest("Delete User", "admin");
        UserRequest request4 = new UserRequest("Access Restricted Area", "guest");

        userHandler.handleRequest(request1);
        userHandler.handleRequest(request2);
        userHandler.handleRequest(request3);
        userHandler.handleRequest(request4);
    }
  }
  `,
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
        <h4>ChainOfResponsibility Pattern</h4>
        <p>
          Definition: Chain multiple objects together in a chain and pass a
          request along this chain, with each object processing the request.
        </p>
        <p>
          The Chain of Responsibility Pattern is a behavioral design pattern
          used to decouple the sender of a request from its receiver, allowing
          multiple objects to have the opportunity to handle the request. The
          request is passed along a chain of objects until one of them handles
          it.
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
            <h2>Steps to implements ChainOfResponsibility Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the interface for handling requests.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the request class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement concrete handlers.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Chain of Responsibility pattern.</h3>
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
            <h2>ChainOfResponsibility Pattern範例</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define an interface for handling requests. </h3>
            <h5>
            Create an interface that specifies a method to handle authorization requests and a method to set the successor.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the request class. </h3>
            <h5>Define a class for requests that includes the user's permission level and the requested resource.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement concrete handlers.</h3>
            <h5>
            Create concrete handler classes, each of which handles specific levels of requests or passes the request on to the next handler.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Chain of Responsibility pattern.</h3>
            <h5>Create a handler chain in the client code and send the request.</h5>
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

export {
  CDChainOfResponsibilityPattern,
  EXChainOfResponsibilityPattern,
  HTChainOfResponsibilityPattern,
};
