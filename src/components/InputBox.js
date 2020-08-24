import React, {useRef, useEffect} from "react";

function InputBox(props) {
  //checks for touchscreen for hover effect management
  const buttonClass = useRef("nonTouch");
  useEffect(() => {
    if ("ontouchstart" in window
       || navigator.maxTouchPoints > 0
       || navigator.msMaxTouchPoints > 0) {
      buttonClass.current = "touch";   
    }
  });

  return (
    <form className="form"
          onSubmit={props.handleSubmit}
    >
      <textarea name="input"
                className="input"
                value={props.text}
                placeholder="Type text to translate here"
                maxLength="500"
                onChange={props.handleChange}
      />
      <input type="submit"
             value="Translate"
             className={"button " + buttonClass.current}
      />
    </form>
  );
}

export default InputBox;