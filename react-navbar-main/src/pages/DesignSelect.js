import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/select-contanier.css";
import LearnDesignPattern from "./LearnDesignPattern";


import FlyweightPatternJV from "../component/DesignPatternJV/FlyweightPattern";
import FactoryPatternJV from "../component/DesignPatternJV/FactoryPattern";
import CommandPatternJV from "../component/DesignPatternJV/CommandPattern";
import MediatorPatternJV from "../component/DesignPatternJV/MediatorPattern";
import ObserverPatternJV from "../component/DesignPatternJV/ObserverPattern";
import AdapterPatternJV from "../component/DesignPatternJV/AdapterPattern";
import BridgePatternJV from "../component/DesignPatternJV/BridgePattern";
import BuilderPatternJV from "../component/DesignPatternJV/BuilderPattern";
import ChainOfResonsibilityPatternJV from "../component/DesignPatternJV/ChainOfResponsibilityPattern";
import CompositePatternJV from "../component/DesignPatternJV/CompositePattern";
import DecoratorPatternJV from "../component/DesignPatternJV/DecoratorPattern";
import FacadePatternJV from "../component/DesignPatternJV/FacadePattern";
import InterpreterJV from "../component/DesignPatternJV/InterpreterPattern";
import IteratorPatternJV from "../component/DesignPatternJV/IteratorPattern";
import MementoPatternJV from "../component/DesignPatternJV/MementoPattern";
import PrototypePatternJV from "../component/DesignPatternJV/PrototypePattern";
import ProxyPatternJV from "../component/DesignPatternJV/ProxyPattern";
import StatePatternJV from "../component/DesignPatternJV/StatePattern";
import StrategyPatternJV from "../component/DesignPatternJV/StrategyPattern";
import TemplatePatternJV from "../component/DesignPatternJV/TemplatePattern";
import VisitorPatternJV from "../component/DesignPatternJV/VisitorPattern";
import AbstractFactoryPatternJV from "../component/DesignPatternJV/AbstractFactoryPattern";

import FlyweightPatternCS from "../component/DesignPatternCS/FlyweightPattern";
import FactoryPatternCS from "../component/DesignPatternCS/FactoryPattern";
import CommandPatternCS from "../component/DesignPatternCS/CommandPattern";
import MediatorPatternCS from "../component/DesignPatternCS/MediatorPattern";
import ObserverPatternCS from "../component/DesignPatternCS/ObserverPattern";
import AdapterPatternCS from "../component/DesignPatternCS/AdapterPattern";
import BridgePatternCS from "../component/DesignPatternCS/BridgePattern";
import BuilderPatternCS from "../component/DesignPatternCS/BuilderPattern";
import ChainOfResonsibilityPatternCS from "../component/DesignPatternCS/ChainOfResponsibilityPattern";
import CompositePatternCS from "../component/DesignPatternCS/CompositePattern";
import DecoratorPatternCS from "../component/DesignPatternCS/DecoratorPattern";
import FacadePatternCS from "../component/DesignPatternCS/FacadePattern";
import InterpreterCS from "../component/DesignPatternCS/InterpreterPattern";
import IteratorPatternCS from "../component/DesignPatternCS/IteratorPattern";
import MementoPatternCS from "../component/DesignPatternCS/MementoPattern";
import PrototypePatternCS from "../component/DesignPatternCS/PrototypePattern";
import ProxyPatternCS from "../component/DesignPatternCS/ProxyPattern";
import StatePatternCS from "../component/DesignPatternCS/StatePattern";
import StrategyPatternCS from "../component/DesignPatternCS/StrategyPattern";
import TemplatePatternCS from "../component/DesignPatternCS/TemplatePattern";
import VisitorPatternCS from "../component/DesignPatternCS/VisitorPattern";
import AbstractFactoryPatternCS from "../component/DesignPatternCS/AbstractFactoryPattern";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MySelectComponent = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setSelectedPattern(null);
  };

  const javaPatterns = [
    { value: "Flyweight Pattern", label: "Flyweight Pattern" },
    { value: "Factory Pattern", label: "Factory Pattern" },
    { value: "Command Pattern", label: "Command Pattern" },
    { value: "Mediator Pattern", label: "Mediator Pattern" },
    { value: "Observer Pattern", label: "Observer Pattern" },
    { value: "Bridge Pattern", label: "Bridge Pattern" },
    { value: "Adapter Pattern", label: "Adapter Pattern" },
    { value: "Builder Pattern", label: "Builder Pattern" },
    {
      value: "Chain Of Responsibility Pattern",
      label: "Chain Of Responsibility Pattern",
    },
    { value: "Composite Pattern", label: "Composite Pattern" },
    { value: "Decorator Pattern", label: "Decorator Pattern" },
    { value: "Facade Pattern", label: "Facade Pattern" },
    { value: "Interpreter Pattern", label: "Interpreter Pattern" },
    { value: "Iterator Pattern", label: "Iterator Pattern" },
    { value: "Memento Pattern", label: "Memento Pattern" },
    { value: "Prototype Pattern", label: "Prototype Pattern" },
    { value: "Proxy Pattern", label: "Proxy Pattern" },
    { value: "State Pattern", label: "State Pattern" },
    { value: "Strategy Pattern", label: "Strategy Pattern" },
    { value: "Template Pattern", label: "Tempalte Pattern" },
    { value: "Visitor Pattern", label: "Visitor Pattern" },
    { value: "Abstract Factory Pattern", label: "Abstract Factory Pattern" },
  ];

  const csharpPatterns = [
    { value: "Flyweight Pattern", label: "Flyweight Pattern" },
    { value: "Factory Pattern", label: "Factory Pattern" },
    { value: "Command Pattern", label: "Command Pattern" },
    { value: "Mediator Pattern", label: "Mediator Pattern" },
    { value: "Observer Pattern", label: "Observer Pattern" },
    { value: "Adapter Pattern", label: "Adapter Pattern" },
    { value: "Bridge Pattern", label: "Bridge Pattern" },
    { value: "Builder Pattern", label: "Builder Pattern" },
    {
      value: "Chain Of Responsibility Pattern",
      label: "Chain Of Responsibility Pattern",
    },
    { value: "Composite Pattern", label: "Composite Pattern" },
    { value: "Decorator Pattern", label: "Decorator Pattern" },
    { value: "Facade Pattern", label: "Facade Pattern" },
    { value: "Interpreter Pattern", label: "Interpreter Pattern" },
    { value: "Iterator Pattern", label: "Iterator Pattern" },
    { value: "Memento Pattern", label: "Memento Pattern" },
    { value: "Prototype Pattern", label: "Prototype Pattern" },
    { value: "Proxy Pattern", label: "Proxy Pattern" },
    { value: "State Pattern", label: "State Pattern" },
    { value: "Strategy Pattern", label: "Strategy Pattern" },
    { value: "Template Pattern", label: "Tempalte Pattern" },
    { value: "Visitor Pattern", label: "Visitor Pattern" },
    { value: "Abstract Factory Pattern", label: "Abstract Factory Pattern" },
  ];

  const getPatternOptions = () => {
    if (selectedLanguage) {
      return selectedLanguage.value === "java" ? javaPatterns : csharpPatterns;
    }
    return [];
  };

  const renderSelectedComponent = () => {
    switch (selectedPattern?.value) {
      case "Flyweight Pattern":
        return selectedLanguage.value === "java" ? (
          <FlyweightPatternJV />
        ) : (
          <FlyweightPatternCS />
        );
      case "Factory Pattern":
        return selectedLanguage.value === "java" ? (
          <FactoryPatternJV />
        ) : (
          <FactoryPatternCS />
        );
      case "Command Pattern":
        return selectedLanguage.value === "java" ? (
          <CommandPatternJV />
        ) : (
          <CommandPatternCS />
        );
      case "Mediator Pattern":
        return selectedLanguage.value === "java" ? (
          <MediatorPatternJV />
        ) : (
          <MediatorPatternCS />
        );
      case "Observer Pattern":
        return selectedLanguage.value === "java" ? (
          <ObserverPatternJV />
        ) : (
          <ObserverPatternCS />
        );
      case "Adapter Pattern":
        return selectedLanguage.value === "java" ? (
          <AdapterPatternJV />
        ) : (
          <AdapterPatternCS />
        );
      case "Bridge Pattern":
        return selectedLanguage.value === "java" ? (
          <BridgePatternJV />
        ) : (
          <BridgePatternCS />
        );
      case "Builder Pattern":
        return selectedLanguage.value === "java" ? (
          <BuilderPatternJV />
        ) : (
          <BuilderPatternCS />
        );
      case "Chain Of Responsibility Pattern":
        return selectedLanguage.value === "java" ? (
          <ChainOfResonsibilityPatternJV />
        ) : (
          <ChainOfResonsibilityPatternCS />
        );
      case "Composite Pattern":
        return selectedLanguage.value === "java" ? (
          <CompositePatternJV />
        ) : (
          <CompositePatternCS />
        );
      case "Decorator Pattern":
        return selectedLanguage.value === "java" ? (
          <DecoratorPatternJV />
        ) : (
          <DecoratorPatternCS />
        );
      case "Facade Pattern":
        return selectedLanguage.value === "java" ? (
          <FacadePatternJV />
        ) : (
          <FacadePatternCS />
        );
      case "Interpreter Pattern":
        return selectedLanguage.value === "java" ? (
          <InterpreterJV />
        ) : (
          <InterpreterCS />
        );
      case "Iterator Pattern":
        return selectedLanguage.value === "java" ? (
          <IteratorPatternJV />
        ) : (
          <IteratorPatternCS />
        );
      case "Memento Pattern":
        return selectedLanguage.value === "java" ? (
          <MementoPatternJV />
        ) : (
          <MementoPatternCS />
        );
      case "Prototype Pattern":
        return selectedLanguage.value === "java" ? (
          <PrototypePatternJV />
        ) : (
          <PrototypePatternCS />
        );
      case "State Pattern":
        return selectedLanguage.value === "java" ? (
          <StatePatternJV />
        ) : (
          <StatePatternCS />
        );
      case "Strategy Pattern":
        return selectedLanguage.value === "java" ? (
          <StrategyPatternJV />
        ) : (
          <StrategyPatternCS />
        );
      case "Template Pattern":
        return selectedLanguage.value === "java" ? (
          <TemplatePatternJV />
        ) : (
          <TemplatePatternCS />
        );
      case "Visitor Pattern":
        return selectedLanguage.value === "java" ? (
          <VisitorPatternJV />
        ) : (
          <VisitorPatternCS />
        );
      case "Abstract Factory Pattern":
        return selectedLanguage.value === "java" ? (
          <AbstractFactoryPatternJV />
        ) : (
          <AbstractFactoryPatternCS />
        );
      case "Proxy Pattern":
        return selectedLanguage.value === "java" ? (
          <ProxyPatternJV />
        ) : (
          <ProxyPatternCS />
        );
      default:
        return null;
    }
  };



  return (
    <div className="body-container">
      <div className="select-contanier">
        <div class="card" className="select-card">
          <div class="card-header" className="select-card-header">
            Design Pattern Selector
          </div>
          <div class="card-body" className="select-card-body">
            <div className="SelectLanguage">
              <p>Select Language：</p>
              <Select
                options={[
                  { value: "java", label: "java" },
                  { value: "C#", label: "C#" },
                ]}
                value={selectedLanguage}
                onChange={handleLanguageChange}
              />
            </div>
            <div className="SelectDesignPattern">
              <p>Select Design Pattern：</p>
              <Select
                options={getPatternOptions()}
                value={selectedPattern}
                onChange={(selectedOption) =>
                  setSelectedPattern(selectedOption)
                }
              />
            </div>
            {/* <button type="button" class="btn btn-success" className="addHome">
              <Link
                to="/LearnDesignPattern"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Go To Learn Design Pattern
              </Link>
            </button>{" "} */}
          </div>
        </div>
      </div>
      <div className="render">{renderSelectedComponent()}</div>
    </div>
  );
};

export default MySelectComponent;
