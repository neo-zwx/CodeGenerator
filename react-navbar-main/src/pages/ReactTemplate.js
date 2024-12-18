import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/select-contanier.css";
import "../css/CSSdesignpatern.css";

import DropdownMenu from "../component/ReactDesignPattern/DropdownMenu";
import Swiper from "../component/ReactDesignPattern/Swiper";
import Modal from "../component/ReactDesignPattern/Modal"
import Navbar from "../component/ReactDesignPattern/Navbar";

const ReactTemplate = () => {
  const [selectedButton, setSelectedButton] = useState("");

  const handleButton1Click = () => {
    setSelectedButton("button1");
  };

  const handleButton2Click = () => {
    setSelectedButton("button2");
  };
  const handleButton3Click = () => {
    setSelectedButton("button3");
  };
  const handleButton4Click = () => {
    setSelectedButton("button4");
  };

  const renderContent = () => {
    switch (selectedButton) {
      case "button1":
        return <DropdownMenu />;
      case "button2":
        return <Swiper />;
      case "button3":
        return <Modal />;
      case "button4":
        return <Navbar />;
      default:
        return null;
    }
  };

  return (
    <div className="cssselectbg">
      <div>
        <span className="selectspan">select Template :</span>
      </div>
      <div>
        <button className="cssselectbtn" onClick={handleButton1Click}>
          DropdownMenu
        </button>
        <button className="cssselectbtn" onClick={handleButton2Click}>
          Swiper
        </button>
        <button className="cssselectbtn" onClick={handleButton3Click}>
          Modal
        </button>
        <button className="cssselectbtn" onClick={handleButton4Click}>
          Navbar
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default ReactTemplate;
