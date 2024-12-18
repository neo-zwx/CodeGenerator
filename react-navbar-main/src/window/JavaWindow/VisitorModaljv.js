import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  // Element Interface
  public interface Shape {
    void accept(Visitor visitor);
  }
    // Concrete Element: Circle
  public class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
  }

  // Concrete Element: Rectangle
  public class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
  }

     `,
  step2: `
  // Visitor Interface
  public interface Visitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
  }
  // Concrete Visitor: Area Calculator
  public class AreaCalculator implements Visitor {
    private double totalArea = 0;

    @Override
    public void visit(Circle circle) {
        double area = Math.PI * circle.getRadius() * circle.getRadius();
        System.out.println("Circle area: " + area);
        totalArea += area;
    }

    @Override
    public void visit(Rectangle rectangle) {
        double area = rectangle.getWidth() * rectangle.getHeight();
        System.out.println("Rectangle area: " + area);
        totalArea += area;
    }

    public double getTotalArea() {
        return totalArea;
    }
  }

  // Concrete Visitor: Draw Visitor
  public class DrawVisitor implements Visitor {
    @Override
    public void visit(Circle circle) {
        System.out.println("Drawing a circle with radius " + circle.getRadius());
    }

    @Override
    public void visit(Rectangle rectangle) {
        System.out.println("Drawing a rectangle with width " + rectangle.getWidth() + " and height " + rectangle.getHeight());
    }
  }

`,
  step3: `
  import java.util.ArrayList;
  import java.util.List;

  public class VisitorPatternDemo {
    public static void main(String[] args) {
        // Create shapes
        List<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle(5));
        shapes.add(new Rectangle(4, 6));

        // Create visitors
        Visitor areaCalculator = new AreaCalculator();
        Visitor drawVisitor = new DrawVisitor();

        // Calculate area
        System.out.println("Calculating areas:");
        for (Shape shape : shapes) {
            shape.accept(areaCalculator);
        }
        System.out.println("Total area: " + ((AreaCalculator) areaCalculator).getTotalArea());

        // Draw shapes
        System.out.println("\nDrawing shapes:");
        for (Shape shape : shapes) {
            shape.accept(drawVisitor);
        }
    }
  }
`,
};
const cdcodes = {
  step1: `
  // Element Interface
  public interface File {
    void accept(FileVisitor visitor);
  }

  // Concrete Element: Text File
  public class TextFile implements File {
    private String name;
    private int size; // Size in bytes

    public TextFile(String name, int size) {
        this.name = name;
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public int getSize() {
        return size;
    }

    @Override
    public void accept(FileVisitor visitor) {
        visitor.visit(this);
    }
  }

  // Concrete Element: Image File
  public class ImageFile implements File {
    private String name;
    private int width;
    private int height;

    public ImageFile(String name, int width, int height) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    public String getName() {
        return name;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    @Override
    public void accept(FileVisitor visitor) {
        visitor.visit(this);
    }
  }
 `,
  step2: `
  // Visitor Interface
  public interface FileVisitor {
    void visit(TextFile textFile);
    void visit(ImageFile imageFile);
  }

  // Concrete Visitor: Size Calculator
  public class SizeCalculator implements FileVisitor {
    private int totalSize = 0;

    @Override
    public void visit(TextFile textFile) {
        totalSize += textFile.getSize();
        System.out.println("TextFile " + textFile.getName() + " size: " + textFile.getSize() + " bytes");
    }

    @Override
    public void visit(ImageFile imageFile) {
        // Size for image file could be width * height * some constant, here we just print it
        int size = imageFile.getWidth() * imageFile.getHeight();
        System.out.println("ImageFile " + imageFile.getName() + " estimated size: " + size + " pixels");
    }

    public int getTotalSize() {
        return totalSize;
    }
  }

  // Concrete Visitor: Report Generator
  public class ReportGenerator implements FileVisitor {
    @Override
    public void visit(TextFile textFile) {
        System.out.println("Generating report for TextFile " + textFile.getName());
    }

    @Override
    public void visit(ImageFile imageFile) {
        System.out.println("Generating report for ImageFile " + imageFile.getName());
    }
  }
`,
  step3: `
  import java.util.ArrayList;
  import java.util.List;

  public class VisitorPatternDemo {
    public static void main(String[] args) {
        // Create files
        List<File> files = new ArrayList<>();
        files.add(new TextFile("document.txt", 1200));
        files.add(new ImageFile("picture.jpg", 1920, 1080));

        // Create visitors
        FileVisitor sizeCalculator = new SizeCalculator();
        FileVisitor reportGenerator = new ReportGenerator();

        // Calculate sizes
        System.out.println("Calculating file sizes:");
        for (File file : files) {
            file.accept(sizeCalculator);
        }
        System.out.println("Total size: " + ((SizeCalculator) sizeCalculator).getTotalSize() + " bytes");

        // Generate reports
        System.out.println("\nGenerating reports:");
        for (File file : files) {
            file.accept(reportGenerator);
        }
    }
  }
`,
};

const HTVisitorPattern = ({ onHide, show, state }) => {
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
        <h4>Visitor Pattern</h4>
        <p>
          Definition: Represents an operation that acts on elements within an
          object's structure. It allows you to define new operations on these
          elements without changing their classes.{" "}
        </p>
        <p>
          The Visitor pattern is a behavioral design pattern that allows you to
          add new operations to existing classes without modifying them. This is
          achieved by creating a visitor class that performs operations on a set
          of elements being visited.
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/VisitorIma/VisitorClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Element</code>: This is an interface or abstract class
              that defines an `Accept` method, which takes a visitor object as a
              parameter.
            </li>
            <li>
              2. <code>ConcreteElementA</code> and <code>ConcreteElementB</code>
              : These are concrete classes that implement the
              <code>Element</code> interface. Each class implements the `Accept`
              method, which typically passes itself (i.e., `this`) as a
              parameter to the visitor's `Visit` method.
            </li>
            <li>
              3. <code>Visitor</code>: This is an interface that defines a set
              of visit operations, each corresponding to a type of
              <code>ConcreteElement</code>. In this example, there are
              `VisitConcreteElementA` and `VisitConcreteElementB` methods.
            </li>
            <li>
              4. <code>ConcreteVisitorA</code> and <code>ConcreteVisitorB</code>
              : These classes implement the <code>Visitor</code> interface and
              provide concrete implementations of the visit operations. These
              operations typically act on the element objects to perform
              specific processing.
            </li>
            <li>
              5. <code>ObjectStructure</code>: This is a container that holds a
              collection of element objects and allows traversal of these
              elements to enable the visitor to access them.
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
const EXVisitorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXVisitorPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Visitor Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Create element and visitor interfaces.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Create concrete elements and visitors.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Visitor pattern for operations.</h3>
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
const CDVisitorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXVisitorPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Visitor Pattern Example</h2>
            <h3>Scenario：</h3>
            <p>
              Suppose we need to perform two operations on different types of
              files: calculating file size and generating file reports. We will
              use the Visitor Pattern to implement these operations.
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define the element interface and concrete element classes.</h3>
            <h5>Define a File interface, and implement concrete file classes such as TextFile and ImageFile.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Create FileVisitor interface and concrete visitor classes.</h3>
            <h5>Define a FileVisitor interface, and implement concrete visitor classes such as SizeCalculator and ReportGenerator.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Apply the Visitor pattern.</h3>
            <h5>In the client code, create files and visitors, and use visitors to access different files.</h5>
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

export { CDVisitorPattern, EXVisitorPattern, HTVisitorPattern };
