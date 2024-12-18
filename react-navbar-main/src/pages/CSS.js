import React, { useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/select-contanier.css"
import "../css/CSSdesignpatern.css"

import BEM from "../component/CSSDesignPattern/BEM"
import OOCSS from "../component/CSSDesignPattern/OOCSS"
import SCSS from "../component/CSSDesignPattern/SCSS"

const CSS = () => {
  const [selectedButton, setSelectedButton] = useState('');

  const handleButton1Click = () => {
    setSelectedButton('button1');
  };

  const handleButton2Click = () => {
    setSelectedButton('button2');
  };
  const handleButton3Click = () => {
    setSelectedButton('button3');
  };

  const renderContent = () => {
    switch (selectedButton) {
      case 'button1':
        return <SCSS />;
      case 'button2':
        return <OOCSS />;
        case 'button3':
          return <BEM />;
        default:
        return null;
    }
  };

  return (
    
    <div className="cssselectbg">
      <div>
        <span className="selectspan">select CSS Design pattern :</span>
      </div>
      <div>
      <button className="cssselectbtn" onClick={handleButton1Click}>SCSS</button>
      <button className="cssselectbtn" onClick={handleButton2Click}>OOCSS</button>
      <button className="cssselectbtn" onClick={handleButton3Click}>BEM</button>
      {renderContent()}
      </div>
    </div>
  );
};

export default CSS;
