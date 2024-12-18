import React from "react";
import "../css/learndesignpattern.css";

const LearnDesignPattern = () => {
  return (
    <div class="learndesignpattern">
      <section>
        <div class="sc-hKMtZM ieMgyQ">
          <div class="sc-eCYdqJ egkmXM">
            <div class="sc-jSMfEi igjKPP">
              <h2 class="sc-gsnTZi gaeLuF">Design Pattern</h2>
              <p class="sc-gKXOVf dtfjvS">
                In software engineering, a design pattern is a general
                repeatable solution to a commonly occurring problem in software
                design. The term was introduced to computer science from
                architecture in the 1990s by Erich Gamma and others. Design
                patterns do not provide a direct implementation but rather
                describe how to solve a problem in various situations.
                Object-oriented design patterns typically describe relationships
                and interactions between classes or objects, without specifying
                the particular classes or objects used to implement an
                application. Design patterns can make unstable dependencies rely
                on stable ones, and concrete dependencies on abstractions, thus
                reducing coupling and improving a software design's ability to
                cope with change. The book "Design Patterns" categorizes design
                patterns into creational, structural, and behavioral patterns,
                describing them through concepts such as encapsulation,
                aggregation, and polymorphism.
              </p>
            </div>
            <h3 class="gfdc">Creational patterns</h3>
            <p class="sc-gKXOVf dtfjvS">
              Creational patterns are design patterns that deal with object
              creation. They aim to provide ways to create objects in a flexible
              and suitable manner, as basic object creation can sometimes lead
              to design problems or increased complexity. The focus of
              creational patterns is on how objects are created, and their core
              idea is to separate the creation of an object from its usage.{" "}
            </p>

            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/FactoryIma/FactoryClass0.png")}
                    alt="Exfw"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Factory Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Factory Method is a creational design pattern that
                    provides an interface for creating objects in a superclass,
                    but allows subclasses to alter the type of objects that will
                    be created. This pattern defers the instantiation of an
                    object to its subclasses.
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/AbstractFactroyIma/AbstractFactoryClass0.png")}
                    alt="Exfw"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Abstract Factory Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Abstract Factory pattern is a creational design pattern
                    that provides an interface for creating families of related
                    or dependent objects without specifying their concrete
                    classes. This pattern is a generalization of the Factory
                    Method pattern and is used to handle families of products.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/BuilderIma/BuilderClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Builder Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Builder pattern is a creational design pattern that
                    separates the construction of a complex object from its
                    representation, so that the same construction process can
                    create different representations. This pattern is often used
                    to create complex objects that have many parts, especially
                    when the creation process involves multiple steps, and each
                    step needs to be performed in a specific sequence.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/PrototypeIma/PrototypeClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Prototype Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Prototype pattern is a creational design pattern that
                    allows you to create new objects by copying an existing
                    object, without relying on its specific class. Using the
                    Prototype pattern can improve system flexibility and
                    efficiency, especially when creating complex objects is
                    expensive.{" "}
                  </p>
                </div>
              </div>
            </div>
            <h3 class="gfdc">Structural patterns</h3>
            <p class="sc-gKXOVf dtfjvS">
              Structural patterns are design patterns that deal with the
              composition of classes and objects into larger structures, while
              keeping these structures flexible and efficient. They help to
              simplify designs by identifying ways to compose simpler objects
              into more complex ones.{" "}
            </p>

            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/FlyweightIma/flyweighjtclass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Flyweight Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Flyweight pattern is a structural design pattern that
                    supports reuse of objects by sharing common parts of state,
                    thus supporting large numbers of fine-grained objects
                    efficiently. This pattern is commonly used to optimize
                    performance and memory usage, especially when an application
                    uses a large number of objects and many of these objects can
                    share the same state.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/AdapterIma/AdapterClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Adapter Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Adapter pattern is a structural design pattern that
                    allows classes with incompatible interfaces to work
                    together. By using the Adapter pattern, we can make classes
                    that could not work together due to incompatible interfaces
                    collaborate.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/BridgeIma/BridgeClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Bridge Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Bridge pattern is a structural design pattern that
                    decouples an abstraction from its implementation so that the
                    two can vary independently. The pattern provides a bridge
                    structure that connects an abstraction to its
                    implementation, thereby reducing coupling between them.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/CompositeIma/CompositeClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Composite Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Composite pattern is a structural design pattern that
                    composes objects into tree structures to represent
                    part-whole hierarchies. Composite makes it easy for clients
                    to treat individual objects and compositions of objects
                    uniformly.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/DecoratorIma/DecoratorClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Decorator Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Decorator pattern is a structural design pattern that
                    allows you to attach additional responsibilities to an
                    object dynamically. This pattern provides a flexible
                    alternative to subclassing for extending functionality.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/FacadeIma/FacadeClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Facade Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Facade pattern is a structural design pattern that
                    provides a unified interface to a set of interfaces in a
                    subsystem. Facade defines a higher-level interface that
                    makes the subsystem easier to use. By using the Facade
                    pattern, we can provide a simple interface to a complex
                    subsystem, making it easier for client code to use. This
                    pattern is particularly useful in scenarios where there are
                    many complex subsystems that need to interact, such as
                    graphical systems and financial systems.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/ProxyIma/ProxyClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Proxy Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Proxy pattern is a structural design pattern that
                    provides a surrogate or placeholder for another object to
                    control access to it. This pattern creates an object that
                    serves as an interface to a real object, allowing you to
                    control access to the original object. By using the Proxy
                    pattern, we can extend the behavior of a real subject object
                    through a proxy class without modifying the real subject
                    itself. This pattern is particularly useful in scenarios
                    where you need to control or extend access to a real
                    subject, such as lazy initialization, access control,
                    logging, and monitoring.{" "}
                  </p>
                </div>
              </div>
            </div>
            <h3 class="gfdc">Behavioral patterns</h3>
            <p class="sc-gKXOVf dtfjvS">
              Behavioral patterns are design patterns that identify common
              communication patterns among objects and encapsulate these
              patterns into reusable designs. This promotes flexibility in
              object interactions.{" "}
            </p>

            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/CommandIma/CommandClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Command Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Command pattern is a behavioral design pattern that
                    encapsulates a request as an object, thereby allowing you to
                    parameterize clients with different requests, queue or log
                    requests, and support undoable operations.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/MediatorIma/MediatorClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Mediator Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Mediator pattern is a behavioral design pattern that
                    allows a set of objects to communicate with each other in a
                    loosely coupled fashion without explicit, hardwired
                    references between them. This is achieved by introducing a
                    mediator object that encapsulates how a set of objects
                    interact. The Mediator pattern is commonly used to design
                    event handling systems or to facilitate communication
                    between multiple components in a system while avoiding
                    direct coupling between components, reducing their
                    dependencies.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/ObserverIma/ObserverClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Observer Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Observer pattern is a behavioral design pattern that
                    allows an object, known as a subject or observable, to
                    maintain a list of its dependents, called observers, and
                    notify them automatically when the subject's state changes.
                    This pattern is commonly used to implement distributed event
                    handling systems, such as in news agencies and stock
                    markets. The Observer pattern promotes loose coupling and
                    high cohesion in software design.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/TemplateIma/TemplateClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Template Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Template Method pattern is a behavioral design pattern
                    that defines the skeleton of an algorithm in a superclass,
                    allowing subclasses to redefine certain steps of the
                    algorithm without changing the algorithm's structure. This
                    pattern is based on the inheritance principle and implements
                    an inversion of control structure, sometimes referred to as
                    the "Hollywood Principle" - "Don't call us, we'll call you".{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/ChainOfResponsibilityIma/ChainOfResponsibilityClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">
                    Chain of Responsibility Pattern
                  </h4>
                  <p class="sc-crXcEl eixnNp">
                    The Chain of Responsibility pattern is a behavioral design
                    pattern that decouples the sender of a request from its
                    receiver, giving multiple objects a chance to handle the
                    request. The request is passed along a chain of handling
                    objects until one of them handles it. By using the Chain of
                    Responsibility pattern, we can decouple the sender and
                    receiver of a request, allowing multiple objects to have a
                    chance to handle it. This pattern is particularly useful in
                    scenarios where a request can be handled by multiple objects
                    and the specific handler is determined at runtime, such as
                    in event handling systems and GUI event propagation.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/IteratorIma/IteratorClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Iterator Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Iterator pattern is a behavioral design pattern that
                    provides a way to access the elements of an aggregate object
                    sequentially without exposing its underlying representation.
                    By using the Iterator pattern, we can provide a uniform way
                    to traverse different collections while maintaining the
                    encapsulation of the collection and hiding its internal
                    structure. This pattern is particularly useful when the
                    representation of a collection varies, providing a clean way
                    to access elements of a collection without needing to know
                    its underlying implementation.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/StateIma/StateClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">State Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The State pattern is a behavioral design pattern that allows
                    an object to alter its behavior when its internal state
                    changes. This pattern is often used when an object's
                    behavior depends on its current state, and the behavior
                    needs to change at runtime based on state transitions. By
                    using the State pattern, we can make an object appear to
                    change its class as its state changes.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/StrategyIma/StrategyClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Strategy Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Strategy pattern is a behavioral design pattern that
                    defines a family of algorithms, encapsulates each one, and
                    makes them interchangeable. The Strategy pattern lets the
                    algorithm vary independently of clients that use it. By
                    using the Strategy pattern, we can define a set of
                    algorithms, encapsulate each one, and make them
                    interchangeable. This pattern makes it possible to vary
                    algorithms independently of clients that use it, and to
                    dynamically switch algorithms at runtime. This pattern is
                    particularly useful in scenarios where the algorithm or
                    behavior might need to be changed at runtime.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/VisitorIma/VisitorClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Visitor Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Visitor pattern is a behavioral design pattern that
                    allows you to add new operations to an existing class
                    hierarchy without modifying the existing classes. This is
                    achieved by creating a visitor class that performs an
                    operation upon each element in an object structure. By using
                    the Visitor pattern, you can add new operations to a system
                    without modifying the existing element classes. This pattern
                    is particularly useful when you need to perform operations
                    on a set of elements whose structure is likely to change,
                    such as parsing XML or rendering a set of graphical objects.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="sc-iBkjds dIKqPn">
              <div class="sc-ftvSup PcoOL">
                <div class="sc-papXJ dUcQDW">
                  <img
                    src={require("../image/InterpreterIma/InterpreterClass0.png")}
                    alt="Exfw"
                  />
                </div>
                <div class="sc-jqUVSM fYOWDa">
                  <h4 class="sc-iqcoie sMRUc">Interpreter Pattern</h4>
                  <p class="sc-crXcEl eixnNp">
                    The Interpreter pattern is a behavioral design pattern that
                    defines a grammar for a language and provides an interpreter
                    to interpret sentences in that language. This pattern is
                    commonly used in language-oriented systems where frequent
                    parsing is required. By using the Interpreter pattern, we
                    can define a grammar for a language and construct an
                    interpreter to interpret sentences in that language. This
                    pattern is particularly suitable for scenarios involving
                    frequent operations on specific types of problems, such as
                    compilers for programming languages and complex grammar
                    parsing.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnDesignPattern;
