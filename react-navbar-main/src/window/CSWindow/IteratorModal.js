import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface IIterator<T> {
    bool HasNext();
    T Next();
  }     `,
  step2: `
  public interface IAggregate<T> {
    IIterator<T> CreateIterator();
  }`,
  step3: `
  public class ConcreteAggregate<T> : IAggregate<T> {
    private List<T> items = new List<T>();

    public IIterator<T> CreateIterator() {
        return new ConcreteIterator<T>(this);
    }

    public int Count {
        get { return items.Count; }
    }

    public T this[int index] {
        get { return items[index]; }
        set { items.Insert(index, value); }
    }
  }`,
  step4: `
  public class ConcreteIterator<T> : IIterator<T> {
    private ConcreteAggregate<T> aggregate;
    private int currentIndex = 0;

    public ConcreteIterator(ConcreteAggregate<T> aggregate) {
        this.aggregate = aggregate;
    }

    public bool HasNext() {
        return currentIndex < aggregate.Count;
    }

    public T Next() {
        return aggregate[currentIndex++];
    }
  }  `,
  step5: `
  class Program {
    static void Main(string[] args) {
        ConcreteAggregate<string> aggregate = new ConcreteAggregate<string>();
        aggregate[0] = "itemA";
        aggregate[1] = "itemB";
        aggregate[2] = "itemC";

        IIterator<string> iterator = aggregate.CreateIterator();

        while (iterator.HasNext()) {
            string item = iterator.Next();
            Console.WriteLine(item);
        }
    }
  } `,
};
const cdcodes = {
  step1: `
  public class Product {
    public string Name { get; set; }
    public decimal Price { get; set; }

    public Product(string name, decimal price) {
        Name = name;
        Price = price;
    }
  } `,
  step2: `
  public class ProductCatalog : IAggregate<Product> {
    private List<Product> products = new List<Product>();

    public IIterator<Product> CreateIterator() {
        return new ProductIterator(this);
    }

    public int Count {
        get { return products.Count; }
    }

    public Product this[int index] {
        get { return products[index]; }
        set { products.Insert(index, value); }
    }
  }`,
  step3: `
  public class ProductIterator : IIterator<Product> {
    private ProductCatalog catalog;
    private int currentIndex = 0;

    public ProductIterator(ProductCatalog catalog) {
        this.catalog = catalog;
    }

    public bool HasNext() {
        return currentIndex < catalog.Count;
    }

    public Product Next() {
        return catalog[currentIndex++];
    }
  }`,
  step4: `
  class Program {
    static void Main(string[] args) {
        ProductCatalog catalog = new ProductCatalog();
        catalog[0] = new Product("ProductA", 99.99m);
        catalog[1] = new Product("ProductB", 199.99m);
        catalog[2] = new Product("ProductC", 299.99m);

        IIterator<Product> iterator = catalog.CreateIterator();

        Console.WriteLine("Product Menu：");
        while (iterator.HasNext()) {
            Product product = iterator.Next();
            Console.WriteLine($"Product Name：{product.Name}, Price：{product.Price}");
        }
    }
  }    `,
};

const HTIteratorPattern = ({ onHide, show, state }) => {
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
        <h4>Iterator Pattern</h4>
        <p>
        Offers a mechanism for traversing the elements of a collection sequentially, while keeping the underlying implementation details hidden.        </p>
        <p>
        The Iterator pattern is a behavioral design pattern that offers a mechanism for traversing the elements of a collection sequentially, while keeping the underlying implementation details hidden.        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/IteratorIma/IteratorClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. <code>Aggregate</code>: This is an interface that defines a method for creating the associated iterator, <code>createIterator()</code>. In this example, it creates an iterator object that is used to traverse the string elements in the aggregate.
            </li>
            <li>
              2. <code>ConcreteAggregate</code>: This is a concrete class that implements the Aggregate interface. It contains a collection of strings, <code>collection</code>. This class also implements the <code>createIterator()</code> method, returning a concrete iterator, ConcreteIterator, for traversing its collection.
            </li>
            <li>
              3. <code>Iterator</code>: This is an interface that defines methods for accessing and traversing elements, such as <code>next()</code>, which returns the next element in the collection, and <code>hasNext()</code>, which checks if there are more elements in the collection.
            </li>
            <li>
              4. <code>ConcreteIterator</code>: This is a concrete iterator class that implements the Iterator interface. It holds a reference to a collection of strings, <code>collection</code>, and tracks the current traversal position using the <code>position</code> attribute. The <code>next()</code> method allows it to return the next element in the collection, while the <code>hasNext()</code> method checks if the end of the collection has been reached.
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
const EXIteratorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXIteratorPattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to Implement the Iterator Pattern</h2>
          </div>
          <div className="step">
            <h3> Step 1: Define an interface for the iterator.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Define an interface for the collection.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 3: Implement a concrete class for the collection.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 4: Implement a concrete class for the iterator.</h3>
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

const CDIteratorPattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXIteratorPattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Iterator Pattern Example</h2>
            <br></br>
            <h3>Scenario：</h3>
            <p>
            Consider an e-commerce platform with an extensive product inventory. The Iterator pattern provides a flexible and efficient way to traverse this inventory, allowing for consistent access to products without revealing the underlying data structure.            </p>
          </div>
          <div className="step">
            <h3>Step 1: Define a class to represent a product.</h3>
            <h5>Initially, we create a product class to encapsulate product details.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3>Step 2: Implement a concrete class to represent the product catalog.</h3>
            <h5>
            Subsequently, we implement a concrete class representing a product catalog, which conforms to the collection interface, to hold product data.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3> Step 3: Implement a concrete class for the iterator to traverse the product catalog.</h3>
            <h5>
            Subsequently, create a concrete iterator class to traverse the elements of the product catalog collection.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>{" "}
          </div>
          <div className="step">
            <h3> Step 4: Iterate over the product catalog using the iterator.</h3>
            <h5> Iterate over the product catalog through the iterator interface, abstracting away the underlying implementation details.</h5>
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

export { CDIteratorPattern, EXIteratorPattern, HTIteratorPattern };
