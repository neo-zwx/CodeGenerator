import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="Home">
      <div class="card1">
        <div class="card1-inner">
          <div class="card1-front">
            <Link to={`/`} style={{ color: "inherit", textDecoration: "none" }}>
              <div class="content1">Home </div>
            </Link>
          </div>
          <div class="card1-back">
            <div>Welcome To Code Generator</div>
          </div>
        </div>
      </div>
      <div class="card2">
        <div class="card2-inner">
          <div class="card2-front">
            <Link
              to={`/Feedback`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div class="content2">Feedback </div>
            </Link>
          </div>
          <div class="card2-back">
            <div>Please leave your comments ~~</div>
          </div>
        </div>
      </div>
      <div class="card3">
        <div class="card3-inner">
          <div class="card3-front">
            <Link
              to={`/designselect`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div class="content3">Design Pattern</div>
            </Link>
          </div>
          <div class="card3-back">
            <div>
              Design patterns are standardized solutions to common problems
              encountered in software design. They provide a reusable blueprint
              for solving specific design problems. It's important to note that
              design patterns don't provide direct code implementations but
              rather offer a general approach to address various design
              challenges. Based on their purpose, complexity, and architectural
              role, design patterns can be categorized into three main types (as
              defined by the Gang of Four): Creational patterns abstract the
              instantiation process. Structural patterns deal with the
              composition of classes or objects. Behavioral patterns concern the
              assignment of responsibilities between objects.
            </div>
          </div>
        </div>
      </div>
      <div class="card4">
        <div class="card4-inner">
          <div class="card4-front">
            <Link
              to={`/SQLconnection`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div class="content4">SQL Connection</div>
            </Link>
          </div>
          <div class="card4-back">
            <div>SQL Connection Template</div>
          </div>
        </div>
      </div>
      <div class="card5">
        <div class="card5-inner">
          <div class="card5-front">
            <Link
              to={`/CSS`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div class="content5">CSS</div>
            </Link>
          </div>
          <div class="card5-back">
            <div>CSS Template</div>
          </div>
        </div>
      </div>
      <div class="card6">
        <div class="card6-inner">
          <div class="card6-front">
            <Link
              to={`/Jquery`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div class="content6">JQuery</div>
            </Link>
          </div>
          <div class="card6-back">
            <div>JQuery Template</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
