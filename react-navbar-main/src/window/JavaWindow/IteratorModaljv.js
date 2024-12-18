import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  public interface Iterator {
    boolean hasNext();   // 检查是否还有下一个元素
    Object next();       // 返回下一个元素
  }
     `,
  step2: `
  public interface Container {
    Iterator getIterator();   // 返回集合的迭代器
  }

 `,
  step3: `
  public class BookCollection implements Container {
    private String[] books = {"Book 1", "Book 2", "Book 3", "Book 4"};

    @Override
    public Iterator getIterator() {
        return new BookIterator();
    }

    private class BookIterator implements Iterator {
        int index = 0;

        @Override
        public boolean hasNext() {
            return index < books.length;
        }

        @Override
        public Object next() {
            if (this.hasNext()) {
                return books[index++];
            }
            return null;
        }
    }
  }
`,
  step4: `
  public class IteratorPatternDemo {
    public static void main(String[] args) {
        BookCollection bookCollection = new BookCollection();

        Iterator iterator = bookCollection.getIterator();

        while (iterator.hasNext()) {
            String book = (String) iterator.next();
            System.out.println("Book: " + book);
        }
    }
  }
  `,
};
const cdcodes = {
  step1: `
  public interface Iterator {
    boolean hasNext();   
    Object next();       
  }
 `,
  step2: `
  public interface Container {
    Iterator getIterator();   
  }
`,
  step3: `
  import java.util.List;
  import java.util.ArrayList;

  public class FriendCollection implements Container {
    private List<String> friends = new ArrayList<>();

    public void addFriend(String name) {
        friends.add(name);
    }

    @Override
    public Iterator getIterator() {
        return new FriendIterator();
    }

    private class FriendIterator implements Iterator {
        int index = 0;

        @Override
        public boolean hasNext() {
            return index < friends.size();
        }

        @Override
        public Object next() {
            if (this.hasNext()) {
                return friends.get(index++);
            }
            return null;
        }
    }
  }
`,
  step4: `
  public class IteratorPatternDemo {
    public static void main(String[] args) {
        FriendCollection friendCollection = new FriendCollection();
        friendCollection.addFriend("Alice");
        friendCollection.addFriend("Bob");
        friendCollection.addFriend("Charlie");

        Iterator iterator = friendCollection.getIterator();

        System.out.println("Friend List:");
        while (iterator.hasNext()) {
            String friend = (String) iterator.next();
            System.out.println("Friend: " + friend);
        }
    }
  }
 `,
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
            <h2>Steps to implements Iterator Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define the iterator interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the collection interface.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement concrete collection classes.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Iterator Pattern to traverse the collection.</h3>
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
            <h3>Scenario:</h3>
            <p>Suppose we are developing a social media application where users can have multiple friends. We want to be able to iterate over a user's friend list and get information about each friend. To achieve this functionality,</p>
          </div>
          <div className="step">
            <h3>Step 1: Define the iterator interface.</h3>
            <h5>Firstly, define an iterator interface, declaring the methods that all iterator classes must implement.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the collection interface</h3>
            <h5>Next, define a collection interface, declaring the methods that collection classes must implement, including a method to return an iterator.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Implement concrete collection classes.</h3>
            <h5>Implement concrete collection classes, which contain a friend list and implement the Container interface.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step3}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 4: Use the Iterator Pattern to traverse the friend list.</h3>
            <h5>
            In the client code, use the Iterator Pattern to traverse the friend list.
            </h5>
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

export { CDIteratorPattern, EXIteratorPattern, HTIteratorPattern };
