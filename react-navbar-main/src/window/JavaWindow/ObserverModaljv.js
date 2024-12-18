import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Observer {
    void update(float temperature, float humidity, float pressure);
  }
   `,
  step2: `
  public interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
  }
 `,
  step3: `
  import java.util.ArrayList;
  import java.util.List;

  public class WeatherStation implements Subject {
    private List<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherStation() {
        observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    public void measurementsChanged() {
        notifyObservers();
    }
  }
`,
  step4: `
  public class CurrentConditionsDisplay implements Observer {
    private float temperature;
    private float humidity;
    private Subject weatherStation;

    public CurrentConditionsDisplay(Subject weatherStation) {
        this.weatherStation = weatherStation;
        weatherStation.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "F degrees and " + humidity + "% humidity");
    }
  }

  public class ForecastDisplay implements Observer {
    private float currentPressure = 29.92f;
    private float lastPressure;
    private Subject weatherStation;

    public ForecastDisplay(Subject weatherStation) {
        this.weatherStation = weatherStation;
        weatherStation.registerObserver(this);
    }

    @Override
    public void update(float temperature, float humidity, float pressure) {
        lastPressure = currentPressure;
        currentPressure = pressure;
        display();
    }

    public void display() {
        System.out.print("Forecast: ");
        if (currentPressure > lastPressure) {
            System.out.println("Improving weather on the way!");
        } else if (currentPressure == lastPressure) {
            System.out.println("More o
  `,
  step5: `
  public class ObserverPatternDemo {
    public static void main(String[] args) {
        WeatherStation weatherStation = new WeatherStation();

        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay(weatherStation);
        ForecastDisplay forecastDisplay = new ForecastDisplay(weatherStation);

        weatherStation.setMeasurements(80, 65, 30.4f);
        weatherStation.setMeasurements(82, 70, 29.2f);
        weatherStation.setMeasurements(78, 90, 29.2f);
    }
  }
  `,
};
const cdcodes = {
  step1: `
  public interface Investor {
    void update(String stockSymbol, float price);
  }
 `,
  step2: `
  public interface StockSubject {
    void registerInvestor(Investor investor);
    void removeInvestor(Investor investor);
    void notifyInvestors();
  }
`,
  step3: `
  import java.util.ArrayList;
  import java.util.List;

  public class Stock implements StockSubject {
    private String symbol;
    private float price;
    private List<Investor> investors;

    public Stock(String symbol, float price) {
        this.symbol = symbol;
        this.price = price;
        this.investors = new ArrayList<>();
    }

    @Override
    public void registerInvestor(Investor investor) {
        investors.add(investor);
    }

    @Override
    public void removeInvestor(Investor investor) {
        investors.remove(investor);
    }

    @Override
    public void notifyInvestors() {
        for (Investor investor : investors) {
            investor.update(symbol, price);
        }
    }

    public void setPrice(float newPrice) {
        this.price = newPrice;
        priceChanged();
    }

    public void priceChanged() {
        notifyInvestors();
    }
  }
`,
  step4: `
  public class ConcreteInvestor implements Investor {
    private String name;

    public ConcreteInvestor(String name) {
        this.name = name;
    }

    @Override
    public void update(String stockSymbol, float price) {
        System.out.println("Investor " + name + " notified: Stock " + stockSymbol + " price changed to " + price);
    }
  }
 `,
  step5: `
  public class ObserverPatternStockMarketDemo {
    public static void main(String[] args) {
        Stock googleStock = new Stock("GOOGL", 1500.0f);

        Investor investor1 = new ConcreteInvestor("Alice");
        Investor investor2 = new ConcreteInvestor("Bob");

        googleStock.registerInvestor(investor1);
        googleStock.registerInvestor(investor2);

        googleStock.setPrice(1510.0f);
        googleStock.setPrice(1520.0f);

        googleStock.removeInvestor(investor2);

        googleStock.setPrice(1530.0f);
    }
  }

  `,
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
              1. The <code>Observer</code> interface defines a method update
              that observers must implement. It is called by the Observable to
              notify the observer of any changes. The method takes two
              parameters:
              <code>Observable observable</code>: The object that is sending the
              notification.
              <code>Object arg</code>: An optional argument that can be used to
              pass additional data about the change.
            </li>
            <li>
              2. <code>Observable</code> Classmaintains a list of Observer
              objects. It provides methods to add and remove observers, check if
              a change has occurred, and notify all registered observers when a
              change happens. The <code>notifyObservers</code> method can be
              called with or without an additional argument.
            </li>
            <li>
              3. The <code>ConcreteObserver</code>
              class is an implementation of the Observer interface. When
              notified of a change, it prints the argument it received.
            </li>
            <li>
              3. The <code>ObserverPattern</code> class creates an Observable
              and two Observer instances. It sets the observable’s state as
              changed and then notifies all observers with the argument "New
              State". Both observers will react to this change.{" "}
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
            <h2>Steps to implements Observer Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Create an Observer interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Create a Subject interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement a concrete Subject.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement concrete Observers.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Observer Pattern for notifications.</h3>
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
            <h3>Scenario：</h3>
            <p>Suppose we are developing a stock market system. There is a Stock class in the system to represent the price changes of a stock, and multiple investors (observers) have subscribed to notifications of price changes. When the stock price changes, all subscribed investors will automatically receive updates.</p>
          </div>
          <div className="step">
            <h3>Step 1: Create an Observer interface.</h3>
            <h5>Firstly, define an Observer interface, declaring the methods that observer objects need to implement.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Create a Subject interface.</h3>
            <h5>Define a Subject interface, declaring methods for registering, removing, and notifying observers.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement a concrete Subject class.</h3>
            <h5>Implement a concrete Subject class, Stock, which holds a list of observers and notifies all observers when the stock price changes.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement concrete Observer classes.</h3>
            <h5>
            Implement concrete Observer classes, where each observer updates its own state when notified.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Observer Pattern for stock price notifications.</h3>
            <h5>Create a Stock subject object and multiple observer objects, simulate stock price changes, and observe the reactions of each observer.</h5>
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

export { CDObserverPattern, EXObserverPattern, HTObserverPattern };
