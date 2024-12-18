import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface State {
    void pressPowerButton();
    void pressStandbyButton();
  }
     `,
  step2: `
  // Concrete State: On
  public class OnState implements State {
    private TV tv;

    public OnState(TV tv) {
        this.tv = tv;
    }

    @Override
    public void pressPowerButton() {
        System.out.println("TV is now Off.");
        tv.setState(tv.getOffState());
    }

    @Override
    public void pressStandbyButton() {
        System.out.println("TV is now in Standby mode.");
        tv.setState(tv.getStandbyState());
    }
  }

  // Concrete State: Off
  public class OffState implements State {
    private TV tv;

    public OffState(TV tv) {
        this.tv = tv;
    }

    @Override
    public void pressPowerButton() {
        System.out.println("TV is now On.");
        tv.setState(tv.getOnState());
    }

    @Override
    public void pressStandbyButton() {
        System.out.println("TV is Off. Cannot put TV in Standby mode.");
    }
  }

  // Concrete State: Standby
  public class StandbyState implements State {
    private TV tv;

    public StandbyState(TV tv) {
        this.tv = tv;
    }

    @Override
    public void pressPowerButton() {
        System.out.println("TV is now Off.");
        tv.setState(tv.getOffState());
    }

    @Override
    public void pressStandbyButton() {
        System.out.println("TV is already in Standby mode.");
    }
  }
`,
  step3: `
  // Context: TV
  public class TV {
    private State onState;
    private State offState;
    private State standbyState;

    private State currentState;

    public TV() {
        onState = new OnState(this);
        offState = new OffState(this);
        standbyState = new StandbyState(this);

        // Start with the TV in the Off state
        currentState = offState;
    }

    public void setState(State state) {
        currentState = state;
    }

    public State getOnState() {
        return onState;
    }

    public State getOffState() {
        return offState;
    }

    public State getStandbyState() {
        return standbyState;
    }

    public void pressPowerButton() {
        currentState.pressPowerButton();
    }

    public void pressStandbyButton() {
        currentState.pressStandbyButton();
    }
  }
`,
  step4: `
  public class StatePatternDemo {
    public static void main(String[] args) {
        TV tv = new TV();

        // Test TV functionality in different states
        tv.pressPowerButton(); // Turns TV On
        tv.pressStandbyButton(); // Puts TV in Standby mode
        tv.pressPowerButton(); // Turns TV Off
        tv.pressStandbyButton(); // Cannot put TV in Standby mode because TV is Off
        tv.pressPowerButton(); // Turns TV On
        tv.pressPowerButton(); // Turns TV Off
    }
  }
  `,
};
const cdcodes = {
  step1: `
  // State Interface
  public interface TrafficLightState {
    void changeLight(TrafficLightContext context);
    String getLight();
  }
 `,
  step2: `
  // Concrete State: Red
  public class RedLight implements TrafficLightState {
    @Override
    public void changeLight(TrafficLightContext context) {
        System.out.println("Changing light from Red to Green.");
        context.setState(new GreenLight());
    }

    @Override
    public String getLight() {
        return "Red";
    }
  }

  // Concrete State: Yellow
  public class YellowLight implements TrafficLightState {
    @Override
    public void changeLight(TrafficLightContext context) {
        System.out.println("Changing light from Yellow to Red.");
        context.setState(new RedLight());
    }

    @Override
    public String getLight() {
        return "Yellow";
    }
  }

  // Concrete State: Green
  public class GreenLight implements TrafficLightState {
    @Override
    public void changeLight(TrafficLightContext context) {
        System.out.println("Changing light from Green to Yellow.");
        context.setState(new YellowLight());
    }

    @Override
    public String getLight() {
        return "Green";
    }
  }
`,
  step3: `
  // Context: TrafficLightContext
  public class TrafficLightContext {
    private TrafficLightState currentState;

    public TrafficLightContext() {
        currentState = new RedLight();
    }

    public void setState(TrafficLightState state) {
        this.currentState = state;
    }

    public void changeLight() {
        currentState.changeLight(this);
    }

    public void showCurrentLight() {
        System.out.println("Current light is: " + currentState.getLight());
    }
  }
`,
  step4: `
  public class StatePatternDemo {
    public static void main(String[] args) {
        TrafficLightContext trafficLight = new TrafficLightContext();

        trafficLight.showCurrentLight();

        trafficLight.changeLight();
        trafficLight.showCurrentLight();

        trafficLight.changeLight();
        trafficLight.showCurrentLight();

        trafficLight.changeLight();
        trafficLight.showCurrentLight();
    }
  }
  `,
};

const HTStatePattern = ({ onHide, show, state }) => {
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
        <h4>State Pattern</h4>
        <p>
          Definition: The State Pattern is a behavioral design pattern that
          allows an object to change its behavior when its internal state
          changes. The object will appear to change its class. This pattern is
          useful for managing state-specific behaviors and transitions between
          states.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/StateIma/StateClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>State</code> interface represents a state and defines
              a <code>handle()</code> method for handling state-related
              operations.
            </li>
            <li>
              2. The <code>ConcreteStateA</code> and <code>ConcreteStateB</code>
              classes are concrete states that implement the <code>State</code>
              interface. Each concrete state class implements the
              <code>handle()</code> method and performs the appropriate
              operations based on its specific state.
            </li>
            <li>
              3. The <code>Context</code> class represents the context and
              contains a reference to a <code>State</code>. The
              <code>Context</code> class's <code>transitionTo()</code> method is
              used to switch to a different state and update the state
              reference. The <code>Context</code> class's <code>request()</code>
              method is used to invoke the <code>handle()</code> method of the
              current state.
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
const EXStatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXStatePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Step to implements State Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the State Interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete States</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the Context</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the State Pattern</h3>
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

const CDStatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXStatePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>State Pattern Example</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the State interface</h3>
            <h5>First, define a State interface, declaring the methods for each state's behavior.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete state classes</h3>
            <h5>We'll implement three concrete state classes, each implementing the TrafficLightState interface and defining the behavior for that state.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the context class</h3>
            <h5>The context class, TrafficLightContext, uses the current state object to invoke state-specific behavior and maintains a reference to the current state.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the State Pattern</h3>
            <h5>
            In the client code, demonstrate how to use TrafficLightContext to change the traffic light's state.            </h5>
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
export { CDStatePattern, EXStatePattern, HTStatePattern };
