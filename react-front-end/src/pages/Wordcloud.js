import React from "react";
import ReactWordcloud from "react-wordcloud";
// import words from "./Words";
import { Resizable } from "re-resizable";

function Wordcloud() {
  const callbacks = {
    // getWordColor: (word) => (word.value > 50 ? "blue" : "red"),
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: (word) =>
      `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  };
  const options = {
    fontFamily: "impact",
    fontSizes: [5, 60],
    rotations: 2,
    rotationAngles: [-90, 0],
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  };

  const resizeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 3px #ddd",
    background: "white",
  };
  //   const size = [800, 400];

  const words = [
    {
      text: "happy",
      value: 94,
    },
    {
      text: "cheerfull",
      value: 94,
    },
    {
      text: "Ecstatic",
      value: 54,
    },
    {
      text: "merry",
      value: 74,
    },
    {
      text: "thankful",
      value: 54,
    },
    {
      text: "joyous",
      value: 54,
    },
    {
      text: "joyful",
      value: 34,
    },
    {
      text: "blissful",
      value: 59,
    },
    {
      text: "delighted",
      value: 64,
    },
    {
      text: "glad",
      value: 71,
    },
    {
      text: "pleased",
      value: 46,
    },
    {
      text: "satisfied",
      value: 87,
    },
  ];

  return (
    <div className="root-container">
      <div
        style={{
          position: "relative",
          margin: "5vh 0px 0px 3vw",
          width: "80vw",
          height: "80vh",
          background: "#E4C5AF",
        }}
      >
        <Resizable
          defaultSize={{
            width: 600,
            height: 300,
          }}
          style={resizeStyle}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <ReactWordcloud
              callbacks={callbacks}
              options={options}
              //   size={size}
              words={words}
            />
          </div>
        </Resizable>
      </div>
    </div>
  );
}

export default Wordcloud;
