import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IStrategy {
    void Algorithm();
  }   `,
  step2: `
  public class ConcreteStrategyA : IStrategy {
    public void Algorithm() {
        Console.WriteLine("Perform the algorithm for strategy A.");
    }
  }

  public class ConcreteStrategyB : IStrategy {
    public void Algorithm() {
        Console.WriteLine("Perform the algorithm for strategy B.");
    }
  }`,
  step3: `
  public class Context {
    private IStrategy strategy;

    public Context(IStrategy strategy) {
        this.strategy = strategy;
    }

    public void SetStrategy(IStrategy strategy) {
        this.strategy = strategy;
    }

    public void ExecuteStrategy() {
        strategy.Algorithm();
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        Context context;

        context = new Context(new ConcreteStrategyA());
        context.ExecuteStrategy();

        context.SetStrategy(new ConcreteStrategyB());
        context.ExecuteStrategy();
    }
  }  `,
};
const cdcodes = {
  step1: `
  public interface IDiscountStrategy {
    double CalculateDiscount(double saleAmount);
  } `,
  step2: `
  public class NoDiscountStrategy : IDiscountStrategy {
    public double CalculateDiscount(double saleAmount) {
        return saleAmount;  
    }
  }

  public class SeasonalDiscountStrategy : IDiscountStrategy {
    public double CalculateDiscount(double saleAmount) {
        return saleAmount * 0.9;  
    }
  }

  public class VIPDiscountStrategy : IDiscountStrategy {
    public double CalculateDiscount(double saleAmount) {
        return saleAmount * 0.8;  
    }
  }`,
  step3: `
  public class DiscountContext {
    private IDiscountStrategy discountStrategy;

    public DiscountContext(IDiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public void SetDiscountStrategy(IDiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double CalculateDiscountedPrice(double saleAmount) {
        return discountStrategy.CalculateDiscount(saleAmount);
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        DiscountContext discountContext;

        double originalPrice = 100.0;

        discountContext = new DiscountContext(new NoDiscountStrategy());
        Console.WriteLine($"Price without discount: {discountContext.CalculateDiscountedPrice(originalPrice)}");

        discountContext.SetDiscountStrategy(new SeasonalDiscountStrategy());
        Console.WriteLine($"Seasonal discounted price: {discountContext.CalculateDiscountedPrice(originalPrice)}");

        discountContext.SetDiscountStrategy(new VIPDiscountStrategy());
        Console.WriteLine($"VIP member discount price: {discountContext.CalculateDiscountedPrice(originalPrice)}");
    }
  }   `,
};

const HTStrategyPattern = ({ onHide, show, state }) => {
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
        <h4>Strategy Pattern</h4>
        <p>
          Definition: Define a family of algorithms, encapsulate each one, and
          make them interchangeable. The change of algorithm does not affect the
          client using it.
        </p>
        <p>
          The Strategy pattern is a behavioral design pattern used to define a
          family of algorithms, encapsulate each one, and make them
          interchangeable. The Strategy pattern allows the algorithms to vary
          independently from the clients that use them.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/StrategyIma/StrategyClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Context</code>: This is a class that contains a reference
              to a strategy interface (represented by a property named
              `strategy` in this diagram). It provides a method
              <code>setStrategy(strategy)</code> that allows changing the
              strategy at runtime. It also has a method
              <code>doSomething()</code>, which calls the <code>execute()</code>
              method of the strategy object at some point.
            </li>
            <li>
              2. <code>Strategy</code>: This is an interface that defines a
              method named <code>execute(data)</code>. All concrete strategy
              classes will implement this method.
            </li>
            <li>
              3. <code>ConcreteStrategyA</code> and
              <code>ConcreteStrategyB</code>: These are concrete classes that
              implement the strategy interface. Each implements the
              <code>execute(data)</code> method, with the specific
              implementation varying depending on the strategy.
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
const EXStrategyPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXStrategyPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Strategy Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Strategy Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Strategy Classes</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the Context Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Strategy Pattern</h3>
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

const CDStrategyPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXStrategyPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Strategy Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Assume a retail store has various discount strategies, such as "No Discount," "Seasonal Discount," and "VIP Member Discount." Depending on different customers or purchasing situations, the store might need to apply different discount strategies. Using the Strategy pattern, we can select the appropriate discount strategy based on the specific situation, thereby handling sales discounts flexibly.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Discount Strategy Interface</h3>
            <h5>First, we define a discount strategy interface that declares a method for calculating discounts.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Discount Strategy Classes</h3>
            <h5>Next, create different discount strategy classes that implement the discount strategy interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the Context Class</h3>
            <h5>
            Then, define a context class that holds a reference to a discount strategy object. The context class provides a method for setting the discount strategy object and calculates the discount based on the strategy object.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Strategy Pattern for Discount Calculation</h3>
            <h5>Utilize the context class to apply different discount strategies for calculating discounts.</h5>
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

export { CDStrategyPattern, EXStrategyPattern, HTStrategyPattern };
