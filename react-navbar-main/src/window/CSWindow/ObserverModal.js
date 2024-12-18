import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Observer {
    void update(Observable observable, Object arg);
  }     `,
  step2: `
  import java.util.ArrayList;
  import java.util.List;

  public class Observable {
    private List<Observer> observers = new ArrayList<>();
    private boolean changed = false;

    public void addObserver(Observer o) {
        observers.add(o);
    }

    public void deleteObserver(Observer o) {
        observers.remove(o);
    }

    public void setChanged() {
        changed = true;
    }

    public void clearChanged() {
        changed = false;
    }

    public boolean hasChanged() {
        return changed;
    }

    public void notifyObservers() {
        notifyObservers(null);
    }

    public void notifyObservers(Object arg) {
        if (hasChanged()) {
            for (Observer observer : observers) {
                observer.update(this, arg);
            }
            clearChanged();
        }
    }
  } `,
  step3: `
  public class ConcreteObserver implements Observer {
    public void update(Observable observable, Object arg) {
        System.out.println("Updated with argument: " + arg);
    }
  }`,
  step4: `
  public class ObserverPatternDemo {
    public static void main(String[] args) {
        Observable observable = new Observable();
        Observer observer1 = new ConcreteObserver();
        Observer observer2 = new ConcreteObserver();

        observable.addObserver(observer1);
        observable.addObserver(observer2);

        observable.setChanged();
        observable.notifyObservers("New State");
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface StockObserver {
    void update(String stockSymbol, float stockValue, int stockVolume);
  }`,
  step2: `
  import java.util.ArrayList;
  import java.util.List;

  public class StockTicker {
    private List<StockObserver> observers = new ArrayList<>();
    private String stockSymbol;
    private float stockValue;
    private int stockVolume;

    public void addObserver(StockObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(StockObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (StockObserver observer : observers) {
            observer.update(stockSymbol, stockValue, stockVolume);
        }
    }

    public void setStockInfo(String stockSymbol, float stockValue, int stockVolume) {
        this.stockSymbol = stockSymbol;
        this.stockValue = stockValue;
        this.stockVolume = stockVolume;
        notifyObservers();
    }`,
  step3: `
  public class StockDisplay implements StockObserver {
    public void update(String stockSymbol, float stockValue, int stockVolume) {
        System.out.println("StockDisplay: " + stockSymbol + " Current Value: " + stockValue + " Volume: " + stockVolume);
    }
  }

  public class StockAnalysisTool implements StockObserver {
    public void update(String stockSymbol, float stockValue, int stockVolume) {
        System.out.println("Analyzing stock: " + stockSymbol);
    }
  }`,
  step4: `
  public class StockMarketApp {
    public static void main(String[] args) {
        StockTicker stockTicker = new StockTicker();

        StockObserver display = new StockDisplay();
        StockObserver analysisTool = new StockAnalysisTool();

        stockTicker.addObserver(display);
        stockTicker.addObserver(analysisTool);

        stockTicker.setStockInfo("AAPL", 150.5f, 5000);
        stockTicker.setStockInfo("GOOGL", 100.78f, 3000);
    }
  }  `,
};

const HTObserverPattern = ({ onHide, show, state }) => {
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
        <h4>Observer Pattern</h4>
        <p>
          Definition: The Observer pattern defines a one-to-many dependency
          between objects so that when one object changes state, all its
          dependents are notified and updated automatically.{" "}
        </p>
        <p>
          The Observer pattern is a behavioral design pattern that defines a
          one-to-many dependency between objects so that when one object changes
          state, all its dependents are notified and updated automatically.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/ObserverIma/ObserverClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Observer</code> interface is the foundation for
              observers, defining an
              <code>update()</code> method to update the observer's state.
            </li>
            <li>
              2. <code>ConcreteObserver1</code> and
              <code>ConcreteObserver2</code>
              are concrete observers that implement the <code>Observer</code>
              interface. Each concrete observer class implements the
              <code>update()</code>
              method and performs corresponding operations based on specific
              conditions.
            </li>
            <li>
              3. The <code>Subject</code>
              class is the subject or observable, maintaining a list of
              observers and managing its state. The <code>Subject</code>
              class provides methods to get and set its state, as well as to
              attach observers and notify all observers.
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
const EXObserverPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXObserverPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implement the Observer Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Observer interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create the Observable class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement concrete observer classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the Observer pattern.</h3>
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

const CDObserverPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXObserverPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Observer Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            The Observer pattern is versatile and can be used in many contexts, such as stock market data systems. In these systems, multiple components may need to be updated when the underlying data changes, such as stock prices or trading volumes. The Observer pattern provides a mechanism to decouple these components, allowing the stock market data to notify all interested parties of changes without requiring them to actively poll for updates.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Observer interface to specify the update method.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Create the Observable class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement specific observer classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Apply the Observer pattern.</h3>
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

export { CDObserverPattern, EXObserverPattern, HTObserverPattern };
