import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  // Strategy Interface
  public interface DiscountStrategy {
    double applyDiscount(double price);
  }
   `,
  step2: `
  // Concrete Strategy: No Discount
  public class NoDiscountStrategy implements DiscountStrategy {
    @Override
    public double applyDiscount(double price) {
        return price; // No discount applied
    }
  }

  // Concrete Strategy: Percentage Discount
  public class PercentageDiscountStrategy implements DiscountStrategy {
    private double percentage;

    public PercentageDiscountStrategy(double percentage) {
        this.percentage = percentage;
    }

    @Override
    public double applyDiscount(double price) {
        return price - (price * percentage / 100);
    }
  }

  // Concrete Strategy: Fixed Discount
  public class FixedDiscountStrategy implements DiscountStrategy {
    private double discountAmount;

    public FixedDiscountStrategy(double discountAmount) {
        this.discountAmount = discountAmount;
    }

    @Override
    public double applyDiscount(double price) {
        return price - discountAmount;
    }
  }
 `,
  step3: `
  // Context
  public class ShoppingCart {
    private DiscountStrategy discountStrategy;

    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double calculateFinalPrice(double price) {
        return discountStrategy.applyDiscount(price);
    }
  }
`,
  step4: `
  public class StrategyPatternDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        double originalPrice = 100.0;

        // No discount strategy
        cart.setDiscountStrategy(new NoDiscountStrategy());
        System.out.println("Final price with no discount: $" + cart.calculateFinalPrice(originalPrice));

        // Percentage discount strategy
        cart.setDiscountStrategy(new PercentageDiscountStrategy(10)); // 10% discount
        System.out.println("Final price with 10% discount: $" + cart.calculateFinalPrice(originalPrice));

        // Fixed discount strategy
        cart.setDiscountStrategy(new FixedDiscountStrategy(15)); // $15 discount
        System.out.println("Final price with $15 discount: $" + cart.calculateFinalPrice(originalPrice));
    }
  }
  `,
};
const cdcodes = {
  step1: `
  // Strategy Interface
  public interface SortingStrategy {
    void sort(int[] array);
  }
 `,
  step2: `
  // Concrete Strategy: Bubble Sort
  public class BubbleSortStrategy implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap array[j] and array[j + 1]
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        System.out.println("Array sorted using Bubble Sort.");
    }
  }

  // Concrete Strategy: Quick Sort
  public class QuickSortStrategy implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        quickSort(array, 0, array.length - 1);
        System.out.println("Array sorted using Quick Sort.");
    }

    private void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pi = partition(array, low, high);
            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
    }

    private int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        return i + 1;
    }
  }

  // Concrete Strategy: Merge Sort
  public class MergeSortStrategy implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        mergeSort(array, 0, array.length - 1);
        System.out.println("Array sorted using Merge Sort.");
    }

    private void mergeSort(int[] array, int left, int right) {
        if (left < right) {
            int middle = (left + right) / 2;
            mergeSort(array, left, middle);
            mergeSort(array, middle + 1, right);
            merge(array, left, middle, right);
        }
    }

    private void merge(int[] array, int left, int middle, int right) {
        int n1 = middle - left + 1;
        int n2 = right - middle;

        int[] L = new int[n1];
        int[] R = new int[n2];

        System.arraycopy(array, left, L, 0, n1);
        System.arraycopy(array, middle + 1, R, 0, n2);

        int i = 0, j = 0;
        int k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                array[k++] = L[i++];
            } else {
                array[k++] = R[j++];
            }
        }

        while (i < n1) {
            array[k++] = L[i++];
        }

        while (j < n2) {
            array[k++] = R[j++];
        }
    }
  }
`,
  step3: `
  // Context
  public class Sorter {
    private SortingStrategy sortingStrategy;

    public void setSortingStrategy(SortingStrategy sortingStrategy) {
        this.sortingStrategy = sortingStrategy;
    }

    public void sort(int[] array) {
        sortingStrategy.sort(array);
    }
  }
`,
  step4: `
  public class StrategyPatternDemo {
    public static void main(String[] args) {
        Sorter sorter = new Sorter();

        int[] array = {34, 7, 23, 32, 5, 62, 32, 8};

        // Use bubble sort.
        sorter.setSortingStrategy(new BubbleSortStrategy());
        sorter.sort(array);
        printArray(array);

        //  Use quick sort.
        array = new int[]{34, 7, 23, 32, 5, 62, 32, 8}; // 重置数组
        sorter.setSortingStrategy(new QuickSortStrategy());
        sorter.sort(array);
        printArray(array);

        // Use merge sort.
        array = new int[]{34, 7, 23, 32, 5, 62, 32, 8}; // 重置数组
        sorter.setSortingStrategy(new MergeSortStrategy());
        sorter.sort(array);
        printArray(array);
    }

    private static void printArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
  }
  `,
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
            <h3>Step 2: Implement Concrete Strategies</h3>
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
            <h3>Scenario：</h3>
            <p>
              Suppose we have a program that needs to sort data. We will define
              different sorting strategies (such as bubble sort, quick sort, and
              merge sort) and select the appropriate sorting algorithm at
              runtime.
            </p>
          </div>
          <div className="step">
            <h3>Step 1: Create a SortingStrategy interface.</h3>
            <h5>
              First, we define a SortingStrategy interface to declare the method
              for the sorting algorithm.
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
            <h3>Step 2: Implement concrete strategies.</h3>
            <h5>
              We will implement several concrete sorting strategies, each of
              which implements the SortingStrategy interface and provides a
              specific sorting algorithm.
            </h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Define the context class.</h3>
            <h5>
              The context class, Sorter, uses a SortingStrategy object to
              perform the sorting.
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
            <h3>Step 4: Use the strategy pattern.</h3>
            <h5>
              In the client code, use the Sorter class to demonstrate how to use
              different sorting strategies.
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

export { CDStrategyPattern, EXStrategyPattern, HTStrategyPattern };
