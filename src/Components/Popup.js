import React, {useEffect} from 'react'
import { checkWin } from '../Helpers/Helper';

function Popup({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) {
  let finalMessage = "";
  let finalRevealWord = ""
  let playable = true

  if (checkWin(correctLetters, wrongLetters, selectedWord) === "win"){
    finalMessage = "Congratulations! You won! 😃"
    playable = false
  }
  else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose"){
    finalMessage = "Sorry loser.. 😕"
    finalRevealWord = `The word was ${selectedWord}`
    playable = false
  }

  useEffect(() => setPlayable(playable))

  return (
  <div class="popup-container" style = {finalMessage !== "" ? {display: "flex"}: {}}>
      <div class="popup">
        <h2 >{finalMessage}</h2>
        <h3 >{finalRevealWord}</h3>
        <button onClick = {playAgain} >Play Again</button>
      </div>
  </div>
  )
}

export default Popup
