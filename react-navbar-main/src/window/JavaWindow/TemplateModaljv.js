import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  // Abstract Base Class
  public abstract class Meal {
    
    // Template Method
    public final void prepareMeal() {
        gatherIngredients();
        cook();
        serve();
        cleanUp();
    }

    protected abstract void gatherIngredients();
    protected abstract void cook();
    
    private void serve() {
        System.out.println("Serving the meal.");
    }

    private void cleanUp() {
        System.out.println("Cleaning up after the meal.");
    }
  }
     `,
  step2: `
  // Concrete Subclass: Vegetarian Meal
  public class VegetarianMeal extends Meal {
    @Override
    protected void gatherIngredients() {
        System.out.println("Gathering ingredients for a vegetarian meal.");
    }

    @Override
    protected void cook() {
        System.out.println("Cooking vegetarian meal.");
    }
  }

  // Concrete Subclass: Non-Vegetarian Meal
  public class NonVegetarianMeal extends Meal {
    @Override
    protected void gatherIngredients() {
        System.out.println("Gathering ingredients for a non-vegetarian meal.");
    }

    @Override
    protected void cook() {
        System.out.println("Cooking non-vegetarian meal.");
    }
  }
 `,
  step3: `
  public class TemplateMethodPatternDemo {
    public static void main(String[] args) {
        Meal vegetarianMeal = new VegetarianMeal();
        Meal nonVegetarianMeal = new NonVegetarianMeal();

        System.out.println("Preparing vegetarian meal:");
        vegetarianMeal.prepareMeal();
        
        System.out.println("\nPreparing non-vegetarian meal:");
        nonVegetarianMeal.prepareMeal();
    }
  }
`,
};
const cdcodes = {
  step1: `
  // Abstract Base Class
  public abstract class Task {

    // Template Method
    public final void processTask() {
        loadFile();
        processContent();
        saveResult();
    }

    // Steps to be implemented by subclasses
    protected abstract void loadFile();
    protected abstract void processContent();

    // Common steps
    private void saveResult() {
        System.out.println("Saving the processed result.");
    }
  }
`,
  step2: `
  // Concrete Subclass: Text File Task
  public class TextFileTask extends Task {
    @Override
    protected void loadFile() {
        System.out.println("Loading text file.");
    }

    @Override
    protected void processContent() {
        System.out.println("Processing text file content.");
    }
  }

  // Concrete Subclass: Image File Task
  public class ImageFileTask extends Task {
    @Override
    protected void loadFile() {
        System.out.println("Loading image file.");
    }

    @Override
    protected void processContent() {
        System.out.println("Processing image file content.");
    }
  }
`,
  step3: `
  public class TemplateMethodPatternDemo {
    public static void main(String[] args) {
        Task textFileTask = new TextFileTask();
        Task imageFileTask = new ImageFileTask();

        System.out.println("Processing text file task:");
        textFileTask.processTask();
        
        System.out.println("\nProcessing image file task:");
        imageFileTask.processTask();
    }
  }
`,
};

const HTTemplatePattern = ({ onHide, show, state }) => {
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
        <h4>Template Pattern</h4>
        <p>
          Definition: Decompose a function into multiple small steps, where each
          step is a method, and then use a template method to combine these
          steps into a cohesive function.
        </p>
        <p>
          The Template pattern is a behavioral design pattern that defines the
          framework of an algorithm in a base class, allowing subclasses to
          redefine certain steps of the algorithm without changing its
          structure.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/TemplateIma/TemplateClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>AbstractClass</code>: It defines a method named
              <code>templateMethod()</code>. This method is typically a
              framework for an algorithm, providing the sequence of steps in the
              algorithm. This method should not be altered by subclasses and is
              often marked as `final` in Java.
            </li>
            <li>
              2. <code>ConcreteClassA</code> and <code>ConcreteClassB</code>:
              These are concrete subclasses of <code>AbstractClass</code> that
              implement the algorithm steps defined in the parent class.
              <code>ConcreteClassA</code> implements the <code>step1()</code>,
              <code>step2()</code>, and <code>step3()</code> methods,
              representing individual steps in the algorithm.
              <code>ConcreteClassB</code> implements the <code>step1()</code>
              and <code>step2()</code> methods. Note that it does not implement
              <code>step3()</code>, which suggests that <code>step3()</code>
              might be an optional step, or <code>ConcreteClassB</code> does not
              require the implementation of this step.
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
const EXTemplatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXTemplatePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Template Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the Abstract Base Class</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement Concrete Subclasses</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Template Method Pattern</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
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

const CDTemplatePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXTemplatePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Template Pattern Example</h2>
            <h3>Scenario：</h3>
            <p>
              Suppose we need to process different types of documents: text
              files (TextFileTask) and image files (ImageFileTask). Although the
              processing steps for each type of document differ, the overall
              processing flow is similar, such as loading the file, processing
              the content, and saving the result.
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define an abstract base class.</h3>
            <h5>First, define a Task class, which includes a template method for processing tasks and some abstract methods that need to be implemented by subclasses.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Implement concrete subclasses.</h3>
            <h5>Implement two concrete task processing subclasses, one for text files and the other for image files.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Template Method pattern.</h3>
            <h5>In the client code, use different task processing subclasses.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
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

export { CDTemplatePattern, EXTemplatePattern, HTTemplatePattern };
