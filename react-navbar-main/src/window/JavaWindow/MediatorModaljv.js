import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface ChatMediator {
    void sendMessage(String message, User user);
    void addUser(User user);
}
     `,
  step2: `
  import java.util.ArrayList;
  import java.util.List;

  public class ChatRoom implements ChatMediator {
    private List<User> users;

    public ChatRoom() {
        this.users = new ArrayList<>();
    }

    @Override
    public void addUser(User user) {
        this.users.add(user);
    }

    @Override
    public void sendMessage(String message, User user) {
        for (User u : this.users) {
            if (u != user) {
                u.receive(message);
            }
        }
    }
  }
`,
  step3: `
  public abstract class User {
    protected ChatMediator mediator;
    protected String name;

    public User(ChatMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }

    public abstract void send(String message);
    public abstract void receive(String message);
  }
`,
  step4: `
  public class ConcreteUser extends User {

    public ConcreteUser(ChatMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void send(String message) {
        System.out.println(this.name + " Sending Message: " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void receive(String message) {
        System.out.println(this.name + " Received Message: " + message);
    }
  }
  `,
  step5: `
  public class MediatorPatternDemo {
    public static void main(String[] args) {
        ChatMediator chatRoom = new ChatRoom();

        User user1 = new ConcreteUser(chatRoom, "Alice");
        User user2 = new ConcreteUser(chatRoom, "Bob");
        User user3 = new ConcreteUser(chatRoom, "Charlie");
        User user4 = new ConcreteUser(chatRoom, "Diana");

        chatRoom.addUser(user1);
        chatRoom.addUser(user2);
        chatRoom.addUser(user3);
        chatRoom.addUser(user4);

        user1.send("Hello, everyone!");
    }
  }

  `,
};
const cdcodes = {
  step1: `
  public interface SmartHomeMediator {
    void notify(Device device, String event);
  }
 `,
  step2: `
  import java.util.ArrayList;
  import java.util.List;

  public class SmartHomeController implements SmartHomeMediator {
    private List<Device> devices;

    public SmartHomeController() {
        this.devices = new ArrayList<>();
    }

    public void addDevice(Device device) {
        devices.add(device);
    }

    @Override
    public void notify(Device device, String event) {
        if (event.equals("temperatureHigh")) {
            for (Device d : devices) {
                if (d instanceof AirConditioner) {
                    d.execute();
                }
            }
        } else if (event.equals("brightnessLow")) {
            for (Device d : devices) {
                if (d instanceof Light) {
                    d.execute();
                }
            }
        }
    }
  }
`,
  step3: `
  public abstract class Device {
    protected SmartHomeMediator mediator;

    public Device(SmartHomeMediator mediator) {
        this.mediator = mediator;
    }

    public abstract void trigger(String event);
    public abstract void execute();
  }
`,
  step4: `
  public class TemperatureSensor extends Device {

    public TemperatureSensor(SmartHomeMediator mediator) {
        super(mediator);
    }

    @Override
    public void trigger(String event) {
        System.out.println("Temperature Sensor: Detected high temperature!");
        mediator.notify(this, event);
    }

    @Override
    public void execute() {
    }
  }

  public class AirConditioner extends Device {

    public AirConditioner(SmartHomeMediator mediator) {
        super(mediator);
    }

    @Override
    public void trigger(String event) {
    }

    @Override
    public void execute() {
        System.out.println("Air Conditioner: Cooling down the room...");
    }
  }

  public class Light extends Device {

    public Light(SmartHomeMediator mediator) {
        super(mediator);
    }

    @Override
    public void trigger(String event) {
        System.out.println("Light: Detected low brightness!");
        mediator.notify(this, event);
    }

    @Override
    public void execute() {
        System.out.println("Light: Adjusting brightness...");
    }
  }
  `,
  step: ` 
  public class MediatorPatternSmartHomeDemo {
    public static void main(String[] args) {
        SmartHomeController controller = new SmartHomeController();

        TemperatureSensor tempSensor = new TemperatureSensor(controller);
        AirConditioner airConditioner = new AirConditioner(controller);
        Light light = new Light(controller);

        controller.addDevice(tempSensor);
        controller.addDevice(airConditioner);
        controller.addDevice(light);

        tempSensor.trigger("temperatureHigh");

        light.trigger("brightnessLow");
    }
  }

  `,
};

const HTMediatorPattern = ({ onHide, show, state }) => {
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
        <h4>Mediator Pattern</h4>
        <p>
          Definition: A Mediator defines an object that encapsulates how a set
          of objects interact. The mediator promotes loose coupling by
          preventing objects from referring to each other directly, and it
          allows for the independent variation of object interactions.  
        </p>
        <p>
          The Mediator pattern is a behavioral design pattern that defines an object to
          encapsulate how a set of objects interact. This pattern promotes loose
          coupling by preventing objects from referring to each other directly.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/MediatorIma/MediatorClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Mediator</code> interface represents a mediator and
              defines a <code>notify()</code> method for notifying the mediator
              of events.
            </li>
            <li>
              2. The <code>BaseComponent</code> class is a base component that
              provides basic functionality to store a mediator instance in a
              component object.
            </li>
            <li>
              3. The <code>Component1</code> and <code>Component2</code> classes
              are concrete components that implement various functionalities.
              They do not depend on other components or on the specific mediator
              class.
            </li>
            <li>
              4. The <code>ConcreteMediator</code> class is a concrete mediator
              that implements the <code>Mediator</code> interface. The
              <code>ConcreteMediator</code> class coordinates the behavior of
              several components. It contains references to
              <code>Component1</code> and <code>Component2</code> and triggers
              corresponding operations by calling their methods.
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
const EXMediatorPattern = ({ onHide, show, state }) => (
  <Modal size="lg" centered show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title id="EXMediatorPattern">
        {state === "editing" ? "How To Use ?" : "如何使用?"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="body">
        <div>
          <h2>Steps to implements Mediator Pattern</h2>
        </div>
        <div className="step">
          <h3>Step 1: Create a Mediator interface.</h3>
          <div class="showcode">
            <pre tabindex="0" class="chroma">
              <code class="language-html" data-lang="html">
                {excodes.step1}
              </code>
            </pre>
          </div>
        </div>
        <div className="step">
          <h3>Step 2: Implement a Mediator.</h3>
          <div class="showcode">
            <pre tabindex="0" class="chroma">
              <code class="language-html" data-lang="html">
                {excodes.step2}
              </code>
            </pre>
          </div>
        </div>
        <div className="step">
          <h3>Step 3: Create an abstract User.</h3>
          <div class="showcode">
            <pre tabindex="0" class="chroma">
              <code class="language-html" data-lang="html">
                {excodes.step3}
              </code>
            </pre>
          </div>
        </div>
        <div className="step">
          <h3>Step 4: Implement concrete Users.</h3>
          <div class="showcode">
            <pre tabindex="0" class="chroma">
              <code class="language-html" data-lang="html">
                {excodes.step4}
              </code>
            </pre>
          </div>
        </div>
        <div className="step">
          <h3>Step 5: Use the Mediator for communication.</h3>
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

const CDMediatorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXMediatorPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Mediator Pattern Example</h2>
            <h3>Scenario：</h3>
            <p>In a smart home system, devices need to coordinate. To avoid tight coupling between devices, we use the Mediator Pattern to centralize their interactions. For instance, when the temperature is high, the mediator can trigger the air conditioner and adjust the lights.</p>
          </div>
          <div className="step">
            <h3>Step 1: Create a Mediator interface.</h3>
            <h5>Firstly, define a mediator interface, declaring the methods required for interactions between devices.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Derive a concrete Mediator from the abstract class.</h3>
            <h5>Next, implement a concrete mediator class, which is responsible for coordinating interactions between all devices.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define an abstract device class. </h3>
            <h5>Define an abstract device class, through which all smart home devices must communicate via the mediator.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Implement concrete device classes.</h3>
            <h5>
            Implement concrete device classes that inherit from the abstract Device class and define the device's behavior.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step4}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 5: Use the Mediator Pattern for inter-device communication.</h3>
            <h5>In the client code, create a mediator and devices, and use the Mediator Pattern to manage interactions between devices.</h5>
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
export { CDMediatorPattern, EXMediatorPattern, HTMediatorPattern };
