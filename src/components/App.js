import React, {useState} from 'react';
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

function App() {

  const [text, setText] = useState("");
  const [pirateText, setPirateText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  //calls Pirate Monkeyness API with text input and saves translation to state
  //(the API sends no CORS headers, so the request goes through a same-origin proxy)
  function handleSubmit(event) {
    if (text.trim() === "") {
      return;
    }
    fetch("/api/translate?english=" + encodeURIComponent(text))
    .then(res => {
      //a host without the proxy rule answers with the app's own HTML page
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.startsWith("text/plain")) {
        return res.text();
      } else {
        throw new Error("API Request Failed!");
      }
    })
    .then(translation => {
      setPirateText(translation);
    })
    .catch(err => {
      console.error(err);
      setPirateText("Error: Request Failed!");
    });
  }

  return (
    <div className="app-container">
      <InputBox text={text}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
      />
      <OutputBox pirateText={pirateText}/>
      <div className="attribution-links-container">
        <a href="https://pirate.monkeyness.com">
          translations by Pirate Monkeyness (Tim Moses), CC BY 4.0 - pirate.monkeyness.com
        </a>
        <a href="http://www.freepik.com">
          parchment created by Brgfx - www.freepik.com
        </a>  
        <a href='https://www.freepik.com/vectors/tree'>
          background image created by upklyak - www.freepik.com
        </a>
      </div>
      
    </div>
  )
}

export default App;
