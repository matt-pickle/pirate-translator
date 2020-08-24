import React, {useState} from 'react';
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

function App() {

  const [text, setText] = useState("");
  const [pirateText, setPirateText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  //calls Pirate Translator API with text input and saves translation to state
  function handleSubmit(event) {
    fetch("https://api.funtranslations.com/translate/pirate.json?text=" + text)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API Request Failed!");
      }
    })
    .then(data => {
      setPirateText(data.contents.translated);
    });    
    event.preventDefault();
  }

  return (
    <div className="app-container">
      <InputBox text={text}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
      />
      <OutputBox pirateText={pirateText}/>
      <a className="attribution-link"
         href='https://www.freepik.com/vectors/tree'>
         Tree vector created by upklyak - www.freepik.com
      </a>
    </div>
  )
}

export default App;
