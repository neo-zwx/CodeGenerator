import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/image-container.css";

const excodes = {
  step1: `
  // 子系统 1：电视
public class Television {
    public void on() {
        System.out.println("Television is ON");
    }

    public void off() {
        System.out.println("Television is OFF");
    }

    public void setInputChannel(String channel) {
        System.out.println("Television channel is set to " + channel);
    }
}

// 子系统 2：音响
public class SoundSystem {
    public void on() {
        System.out.println("SoundSystem is ON");
    }

    public void off() {
        System.out.println("SoundSystem is OFF");
    }

    public void setVolume(int level) {
        System.out.println("SoundSystem volume is set to " + level);
    }
}

// 子系统 3：DVD 播放器
public class DVDPlayer {
    public void on() {
        System.out.println("DVDPlayer is ON");
    }

    public void off() {
        System.out.println("DVDPlayer is OFF");
    }

    public void play(String movie) {
        System.out.println("Playing movie: " + movie);
    }
}

// 子系统 4：灯光控制
public class LightSystem {
    public void dim(int level) {
        System.out.println("Lights are dimmed to " + level + "%");
    }

    public void on() {
        System.out.println("Lights are ON");
    }

    public void off() {
        System.out.println("Lights are OFF");
    }
}
     `,
  step2: `
  // 外观类：HomeTheaterFacade
public class HomeTheaterFacade {
    private Television tv;
    private SoundSystem soundSystem;
    private DVDPlayer dvdPlayer;
    private LightSystem lightSystem;

    public HomeTheaterFacade(Television tv, SoundSystem soundSystem, DVDPlayer dvdPlayer, LightSystem lightSystem) {
        this.tv = tv;
        this.soundSystem = soundSystem;
        this.dvdPlayer = dvdPlayer;
        this.lightSystem = lightSystem;
    }

    // 统一的操作接口：观看电影
    public void watchMovie(String movie) {
        System.out.println("Get ready to watch a movie...");
        lightSystem.dim(10);
        tv.on();
        tv.setInputChannel("DVD");
        soundSystem.on();
        soundSystem.setVolume(20);
        dvdPlayer.on();
        dvdPlayer.play(movie);
    }

    // 统一的操作接口：结束观看
    public void endMovie() {
        System.out.println("Shutting movie theater down...");
        lightSystem.on();
        dvdPlayer.off();
        soundSystem.off();
        tv.off();
    }
}
 `,
  step3: `
  // 客户端代码
public class FacadePatternDemo {
    public static void main(String[] args) {
        // 创建子系统实例
        Television tv = new Television();
        SoundSystem soundSystem = new SoundSystem();
        DVDPlayer dvdPlayer = new DVDPlayer();
        LightSystem lightSystem = new LightSystem();

        // 创建外观类实例
        HomeTheaterFacade homeTheater = new HomeTheaterFacade(tv, soundSystem, dvdPlayer, lightSystem);

        // 使用外观类接口来控制整个系统
        homeTheater.watchMovie("Inception");
        System.out.println("\nMovie is playing...\n");

        homeTheater.endMovie();
    }
}
`,
};
const cdcodes = {
  step1: `
  public class AccountAuthentication {
    private String accountNumber;
    private int pin;

    public AccountAuthentication(String accountNumber, int pin) {
        this.accountNumber = accountNumber;
        this.pin = pin;
    }

    public boolean authenticate(String accountNumber, int pin) {
        return this.accountNumber.equals(accountNumber) && this.pin == pin;
    }
  }

  public class AccountManager {
    private double balance;

    public AccountManager(double initialBalance) {
        this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            return true;
        } else {
            return false;
        }
    }
  }

  public class TransactionManager {
    public void logTransaction(String transactionType, double amount) {
        System.out.println("Logging transaction: " + transactionType + " of $" + amount);
    }
  }
`,
  step2: `
  public class BankAccountFacade {
    private String accountNumber;
    private int pin;

    private AccountAuthentication authentication;
    private AccountManager accountManager;
    private TransactionManager transactionManager;

    public BankAccountFacade(String accountNumber, int pin, double initialBalance) {
        this.accountNumber = accountNumber;
        this.pin = pin;
        this.authentication = new AccountAuthentication(accountNumber, pin);
        this.accountManager = new AccountManager(initialBalance);
        this.transactionManager = new TransactionManager();
    }

    public void checkBalance(String accountNumber, int pin) {
        if (authentication.authenticate(accountNumber, pin)) {
            System.out.println("Current balance: $" + accountManager.getBalance());
        } else {
            System.out.println("Authentication failed.");
        }
    }

    public void deposit(String accountNumber, int pin, double amount) {
        if (authentication.authenticate(accountNumber, pin)) {
            accountManager.deposit(amount);
            transactionManager.logTransaction("Deposit", amount);
            System.out.println("Deposit of $" + amount + " successful.");
        } else {
            System.out.println("Authentication failed.");
        }
    }

    public void withdraw(String accountNumber, int pin, double amount) {
        if (authentication.authenticate(accountNumber, pin)) {
            if (accountManager.withdraw(amount)) {
                transactionManager.logTransaction("Withdrawal", amount);
                System.out.println("Withdrawal of $" + amount + " successful.");
            } else {
                System.out.println("Insufficient balance.");
            }
        } else {
            System.out.println("Authentication failed.");
        }
    }
  }
`,
  step3: `
  public class FacadePatternDemo {
    public static void main(String[] args) {
        BankAccountFacade bankAccount = new BankAccountFacade("12345678", 1234, 500.0);

        bankAccount.checkBalance("12345678", 1234);
        bankAccount.deposit("12345678", 1234, 150.0);
        bankAccount.withdraw("12345678", 1234, 100.0);
        bankAccount.checkBalance("12345678", 1234);
        bankAccount.withdraw("12345678", 1234, 600.0); // 余额不足
    }
  }
`,
};

const HTFacadePattern = ({ onHide, show, state }) => {
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
        <h4>Facade Pattern</h4>
        <p>
          Definition: Defines a high-level interface to a subsystem that makes
          the subsystem easier to use by providing a unified interface for a set
          of interfaces.
        </p>
        <p>
          The Facade pattern is a structural design pattern that simplifies the
          interface to a subsystem by defining a higher-level interface that
          provides a unified access point to a set of interfaces.{" "}
        </p>
        <div className="item">
          <h4>Class Diagram</h4>
          <img
            src={require("../../image/FacadeIma/FacadeClass0.png")}
            alt="Exfw"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="item">
          <h4>Components：</h4>
          <ul>
            <li>
              1. **Component:** This is an interface or abstract class that
              defines the operations that an object can execute. In this
              example, Component defines a method called `operation()` that
              returns a string.
            </li>
            <li>
              2. **ConcreteComponent:** This is a concrete class that implements
              the Component interface. It is the basic object that can have
              responsibilities dynamically added to it by decorators.
            </li>
            <li>
              3. **Decorator:** This is an abstract class that also implements
              the Component interface, but it holds a reference to a Component
              object. It can be a concrete Component or another Decorator.
              Decorator redefines the `operation()` method of Component and adds
              additional behavior before or after calling the `operation()`
              method of the Component object it holds.
            </li>
            <li>
              4. **ConcreteDecoratorA** and **ConcreteDecoratorB:** These are
              concrete implementations of Decorator that extend the
              functionality of the Decorator class. They override the
              `operation()` method and add additional behavior when calling the
              `operation()` method of the underlying Component.
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
const EXFacadePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFacadePattern">
          {state === "editing" ? "How To Use ?" : "如何使用?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Steps to implements Facade Pattern</h2>
          </div>
          <div className="step">
            <h3>Step 1: Define each subsystem.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the Facade class.</h3>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {excodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Facade pattern.</h3>
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
const CDFacadePattern = ({ onHide, show, state }) => {
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
        <Modal.Title id="EXFacadePattern">
          {state === "editing" ? "Example" : "範例介紹"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body">
          <div>
            <h2>Facade Pattern Example</h2>
            <h3>Scenario：</h3>
            <p>Customers need to use the banking system for tasks like checking balances, deposits, and withdrawals. The system has multiple subsystems internally. To simplify customer interaction, we can use a Facade Pattern.</p>
          </div>
          <div className="step">
            <h3>Step 1: Define the subsystems</h3>
            <h5>Firstly, define each subsystem in the banking system, such as authentication, account management, and transaction management.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step1}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 2: Define the Facade class</h3>
            <h5>The Facade class will encapsulate the complex operations in the subsystems, providing a simple interface for clients.</h5>
            <div class="showcode">
              <pre tabindex="0" class="chroma">
                <code class="language-html" data-lang="html">
                  {cdcodes.step2}
                </code>
              </pre>
            </div>
          </div>
          <div className="step">
            <h3>Step 3: Use the Facade Pattern</h3>
            <h5>In the client code, use the BankAccountFacade's provided interface to handle bank account operations.</h5>
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

export { CDFacadePattern, EXFacadePattern, HTFacadePattern };
