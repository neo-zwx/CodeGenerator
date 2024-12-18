import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface MediaPlayer {
    void play(String audioType, String fileName);
  }     `,
  step2: `
  public class VlcPlayer {
    public void playVlc(String fileName) {
        System.out.println("Playing vlc file. Name: " + fileName);
    }
  }

  public class Mp4Player {
    public void playMp4(String fileName) {
        System.out.println("Playing mp4 file. Name: " + fileName);
    }
  } `,
  step3: `
  public class MediaAdapter implements MediaPlayer {
    VlcPlayer vlcPlayer;
    Mp4Player mp4Player;

    public MediaAdapter(String audioType){
        if(audioType.equalsIgnoreCase("vlc") ){
            vlcPlayer = new VlcPlayer();
        } else if (audioType.equalsIgnoreCase("mp4")){
            mp4Player = new Mp4Player();
        }
    }

    @Override
    public void play(String audioType, String fileName) {
        if(audioType.equalsIgnoreCase("vlc")){
            vlcPlayer.playVlc(fileName);
        } else if(audioType.equalsIgnoreCase("mp4")){
            mp4Player.playMp4(fileName);
        }
    }
  }`,
  step4: `
  public class AudioPlayer implements MediaPlayer {
    MediaAdapter mediaAdapter; 

    @Override
    public void play(String audioType, String fileName) {

        
        if(audioType.equalsIgnoreCase("mp3")){
            System.out.println("Playing mp3 file. Name: " + fileName);            
        } 
        
        else if(audioType.equalsIgnoreCase("vlc") || audioType.equalsIgnoreCase("mp4")){
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        }
        else{
            System.out.println("Invalid media. " + audioType + " format not supported");
        }
    }
  } `,
};
const cdcodes = {
  step1: `
  public interface AdvancedLogger {
    void logMessage(String level, String message);
  } `,
  step2: `
  public class LegacyLogger {
    public void log(String message) {
        System.out.println("Legacy Logger: " + message);
    }
  }`,
  step3: `
  public class LoggerAdapter implements LegacyLogger {
    private AdvancedLogger advancedLogger;

    public LoggerAdapter(AdvancedLogger advancedLogger) {
        this.advancedLogger = advancedLogger;
    }

    @Override
    public void log(String message) {
        // The default setting is to log the old system at the INFO level.
        advancedLogger.logMessage("INFO", message);
    }
  }`,
  step4: `
  public class NewAdvancedLogger implements AdvancedLogger {
    @Override
    public void logMessage(String level, String message) {
        System.out.println(level + " Log: " + message);
    }
  }
  public class LoggingClient {
    public static void main(String[] args) {
        // Use the new logging system.
        AdvancedLogger advancedLogger = new NewAdvancedLogger();
        
        // Use an adapter to adapt the old logging system interface.
        LegacyLogger logger = new LoggerAdapter(advancedLogger);

        // Log through the old interface, but the actual call is made to the new logging system.
        logger.log("This is a log message.");
    }
  }
    `,
};

const HTAdapterPattern = ({ onHide, show, state }) => {
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
        <h4>Adapter Pattern</h4>
        <p>
          Definition: Utilize shared technology to effectively support a large
          number of fine-grained objects.
        </p>
        <p>
          The Adapter pattern is a structural design pattern used to effectively
          support the reuse of a large number of fine-grained objects through
          sharing. This pattern is commonly applied to optimize performance and
          memory usage, especially when an application uses a significant number
          of objects, most of which can share their state.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/AdapterIma/AdapterClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. The <code>Adapter</code> interface represents the flyweight,
              defining an <code>operation()</code> method that takes an
              <code>extrinsicState</code> parameter. Both
              <code>ConcreteAdapter</code> and
              <code>UnsharedConcreteAdapter</code> classes implement the
              <code>Adapter</code> interface.
            </li>
            <li>
              2. The <code>ConcreteAdapter</code> class is a concrete flyweight
              with a private <code>intrinsicState</code> property, representing
              the intrinsic state of the flyweight. The
              <code>ConcreteAdapter</code> class implements the
              <code>operation()</code> method, which displays both the intrinsic
              state (<code>intrinsicState</code>) and the extrinsic state (
              <code>extrinsicState</code>) on the console.
            </li>
            <li>
              3. The <code>UnsharedConcreteAdapter</code> class is a non-shared
              concrete flyweight with a private <code>allState</code> property,
              representing the complete state of the non-shared flyweight. The{" "}
              <code>UnsharedConcreteAdapter</code> class implements the
              <code>operation()</code> method, which displays only the complete
              state (<code>allState</code>) on the console.
            </li>
            <li>
              4. The <code>AdapterFactory</code> class is the flyweight factory
              responsible for creating and managing flyweight objects. The
              <code>AdapterFactory</code> class has a private
              <code>Adapters</code> property, which is a map used to store
              flyweight objects. The <code>AdapterFactory</code> class also
              implements the <code>getAdapter()</code> method, which takes a
              <code>key</code> parameter and returns the corresponding
              <code>ConcreteAdapter</code> object from the map based on the
              <code>key</code>. If the corresponding
              <code>ConcreteAdapter</code> object does not exist, a new object
              is created and stored in the map.
            </li>
            <li>
              5. Client code can use the concrete creator class to call the
              <code>factoryMethod()</code> method to create the required
              concrete product object.
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
const EXAdapterPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXAdapterPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Adapter Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Adapter interface</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement the Adaptee class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Create the Adapter class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Adapter</h3>
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
const CDAdapterPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXAdapterPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Adapter Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Suppose you are developing an enterprise-level application that uses an old logging system, `LegacyLogger`. Now the company has decided to upgrade to a new logging system, `AdvancedLogger`. However, since a significant amount of code in the system depends on the old logging system's interface, a direct replacement would require extensive code changes. To achieve a smooth transition without modifying existing code, you can use the Adapter Pattern.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the Adapter interface</h3>
            <h5>
            The new logging system, AdvancedLogger, provides a more flexible and powerful logging interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement the Adaptee class</h3>
            <h5>
            The old logging system, LegacyLogger, has simple logging functionality but an incompatible interface.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Create the Adapter class</h3>
            <h5>
            The adapter will translate the new logging interface into the old logging interface, allowing existing code to continue using the old interface while leveraging the features of the new logging system.            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Adapter</h3>
            <h5>
            In the client code, you can continue to use the old logging system interface, but in reality, the new logging system is used for logging.            </h5>
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

export { CDAdapterPattern, EXAdapterPattern, HTAdapterPattern };
