import React from "react";
import Button from "./Button";

function InputBox(props) {
  return (
    <div className="input-box-container">
      <textarea name="input"
                className="input"
                value={props.text}
                placeholder="Type text to translate here"
                maxLength="500"
                onChange={props.handleChange}
      />
      <Button text="Translate"
              onClick={props.handleSubmit}
      />
    </div>
  );
}

export default InputBox;