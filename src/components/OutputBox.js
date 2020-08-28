import React from "react";

function OutputBox(props) {
  return (
    <div className="output-box-container">
      <p className="output-text">{props.pirateText}</p>
    </div>
  )
}

export default OutputBox;