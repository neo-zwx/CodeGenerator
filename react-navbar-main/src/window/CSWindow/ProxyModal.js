import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface ISubject {
    void Request();
  }    `,
  step2: `
  public class RealSubject : ISubject {
    public void Request() {
        Console.WriteLine("RealSubject Request");
    }
  } `,
  step3: `
  public class Proxy : ISubject {
    private RealSubject realSubject;

    public void Request() {
        if (realSubject == null) {
            realSubject = new RealSubject();
        }

        PreRequest();
        realSubject.Request();
        PostRequest();
    }

    private void PreRequest() {
        Console.WriteLine("PreRequest Operation");
    }

    private void PostRequest() {
        Console.WriteLine("PostRequest Opearation");
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        ISubject proxy = new Proxy();
        proxy.Request();
    }
  }  `,
};
const cdcodes = {
  step1: `
  public interface IInventory {
    int GetInventoryLevel(string productId);
  } `,
  step2: `
  public class RealInventory : IInventory {
    public int GetInventoryLevel(string productId) {
        Console.WriteLine($"Get the actual inventory level of {productId}");
        return new Random().Next(0, 100); 
    }
  }`,
  step3: `
  public class InventoryProxy : IInventory {
    private RealInventory realInventory;
    private Dictionary<string, int> inventoryCache = new Dictionary<string, int>();

    public int GetInventoryLevel(string productId) {
        if (inventoryCache.ContainsKey(productId)) {
            Console.WriteLine($"Retrieve the actual inventory level of {productId} from the cache");
            return inventoryCache[productId];
        } else {
            if (realInventory == null) {
                realInventory = new RealInventory();
            }
            int inventoryLevel = realInventory.GetInventoryLevel(productId);
            inventoryCache[productId] = inventoryLevel;
            return inventoryLevel;
        }
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        IInventory inventoryProxy = new InventoryProxy();

        int level1 = inventoryProxy.GetInventoryLevel("Product123");
        Console.WriteLine($"The inventory level of Product123 is: {level1}");

        int level2 = inventoryProxy.GetInventoryLevel("Product123");
        Console.WriteLine($"The inventory level of Product123 is: {level2}");
    }
  } `,
};

const HTProxyPattern = ({ onHide, show, state }) => {
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
        <h4>Proxy Pattern</h4>
        <p>
          Definition: Provide a proxy for other objects to control access to
          this object.
        </p>
        <p>
          The Proxy pattern is a structural design pattern used to provide a
          proxy for other objects to control access to the original object. This
          pattern creates an object with the same interface as the existing
          object, allowing for control over access to the original object.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/ProxyIma/ProxyClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Subject</code> interface represents the subject and
              defines a <code>request()</code> method.
            </li>
            <li>
              2. The <code>RealSubject</code> class is the real subject,
              implementing the <code>Subject</code> interface and providing the
              implementation for the <code>request()</code> method.
            </li>
            <li>
              3. The <code>Proxy</code> class is the proxy, implementing the
              <code>Subject</code> interface and containing a reference to the
              <code>RealSubject</code>. The <code>Proxy</code> class performs
              access control checks (<code>checkAccess()</code>) and logging (
              <code>logAccess()</code>) in its <code>request()</code> method
              before calling the <code>request()</code> method of the
              <code>RealSubject</code>.
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
const EXProxyPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXProxyPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implement the Proxy Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Subject Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement the Real Subject Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement the Proxy Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the Proxy Pattern</h3>
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

const CDProxyPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXProxyPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Proxy Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Assume a company sells a variety of products. To improve system performance and control access to actual inventory data, the Proxy Pattern can be used to implement inventory query functionality.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Create the inventory interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement the Real Inventory Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement the Inventory Proxy Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Use the Proxy Pattern to Perform Inventory Queries</h3>
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

export { CDProxyPattern, EXProxyPattern, HTProxyPattern };
