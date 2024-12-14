import React from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
const [dice, setDice] = React.useState(allNewDice())
const [tenzies, setTenzies] =React.useState(false)
const [backgroundAudio, setBackgroundAudio] = React.useState(null);

   // Preload sounds
   const clickSound = new Audio("/sounds/click2.mp3");
   const rollSound = new Audio("/sounds/roll.mp3");
   const winSound = new Audio("/sounds/win.mp3");
   const bgMusic = new Audio("/sounds/background.mp3");
   

   // background music 
 React.useEffect(() => {
    if (!tenzies) {
      bgMusic.loop = true;
      bgMusic.volume = 0.5;
      bgMusic.play().catch((err) => console.log("Background music error:", err));
      setBackgroundAudio(bgMusic);
    }

    return () => {
      if (backgroundAudio) backgroundAudio.pause();
    };
  }, [tenzies]);
   
  
  function generateNewDice(){
    return {value:Math.ceil(Math.random()*6),
       isHeld:false,
       id:nanoid()}
   }

function allNewDice(){
  const newDice = []
  for (let i = 0; i < 10 ; i++) {
    newDice.push(
      generateNewDice()
    )
  }
  
  return newDice
}

function jubilate(){
  if (backgroundAudio) backgroundAudio.pause();
      winSound.play();
}

React.useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die =>die.value === firstValue)
  if (allHeld && allSameValue) {
    setTenzies(true)
    jubilate()
  }
 
},[dice])

const rollDice = ()=>{
  rollSound.play();
 return setDice((prevDice)=>{
    return prevDice.map((die)=>{
    return die.isHeld ?
    die : generateNewDice()
  })})
}

const resetGame = ()=>{
  winSound.pause();
  setTenzies(false)
  setDice(allNewDice)
}
const holdDice =(id)=>{
  clickSound.play();
  setDice((prevDice)=>{
    return prevDice.map((die)=>{
    return die.id===id ?
    {...die, isHeld:!die.isHeld} : die
  })})
}

const diceElement = dice.map((die)=>{
  return <Die 
  value={die.value} 
  key={die.id}
  isHeld={die.isHeld}
  holdDice={()=>{return holdDice(die.id)}}/>
})

  return (
    <main>
      {tenzies && <Confetti/> }
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dies'>
       {diceElement}
      </div>
      <button onClick={tenzies ? resetGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      
    </main>
  )
}

export default App
