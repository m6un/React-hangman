import react, { useState, useEffect } from "react";
import "./App.css";
import Figure from "./Components/Figure";
import Header from "./Components/Header";
import Word from "./Components/Word";
import WrongLetters from "./Components/WrongLetters";
import { showNotification as show } from "./Helpers/Helper";
import Notification from "./Components/Notification";
import Popup from "./Components/Popup";

let randomWords = require("random-words")
let selectedWord = randomWords()

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setNotification] = useState(false)

  useEffect(() => {
    const handleKeydown = e => {
      const { key, keyCode } = e;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters( currentLetters => [...currentLetters, letter]);
          } else {
            show(setNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters([...wrongLetters, letter]);
          } else {
            show(setNotification)
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown)
    
  }, [ correctLetters, wrongLetters, playable]);
  function playAgain(){
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])
    selectedWord = randomWords()
  }

 

  return (
        <div className="App">
        <Header />
        <Figure wrongLetters = {wrongLetters}/>
        <WrongLetters wrongLetters = {wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <Notification showNotification = {showNotification}/>
        <Popup correctLetters = {correctLetters} wrongLetters = {wrongLetters} selectedWord = {selectedWord} setPlayable = {setPlayable} playAgain = {playAgain}/>
    </div>
  )
}

export default App;
