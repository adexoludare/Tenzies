# Tenzies

This is dice roll game containing ten different dices. Roll until all dice are the same. Click each die to freeze it at its current value between rolls.

![Tenzies](/public/tenzies.PNG)


## Learning Outcome
this project expose you to core react features;
- function component
- Event listeners
- using props
- useState
- useEffect
- conditional rendering

### props
 The App send the following properties; "value,key isHeld, holdDice" to Die component which is relieved as props.

  Sending properties of dice to Die Component.
```jsx
const diceElement = dice.map((die)=>{
  return <Die 
  value={die.value} 
  key={die.id}
  isHeld={die.isHeld}
  holdDice={()=>{return holdDice(die.id)}}/>
})
```

Receiving props from App
```jsx
function Die(props) {
  const styles = {
    backgroundColor :
     props.isHeld ? "#59E391" : "#FFFFFF"}
  return (
    <div className="die"  
    style={styles}
    onClick={props.holdDice}
    >{props.value}</div>
  )
}
```

### State
two state was declare in the project one to tract the state of each die and the other to track when the game is won
```jsx
const [dice, setDice] = React.useState(allNewDice())
const [tenzies, setTenzies] =React.useState(false)
```
the page load with the call to allNewDice function which initialized dice state with object return from allNewDice function

when the dice is roll, setDice update the value of isHeld properties of the held dice
```jsx
const rollDice = ()=>{
 return setDice((prevDice)=>{
    return prevDice.map((die)=>{
    return die.isHeld ?
    die : generateNewDice()
  })})
}
```
when all dices where held and have thesame value 
```jsx
 if (allHeld && allSameValue) {
    setTenzies(true)
  }
  ```
  ### useEffect
```jsx
React.useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die =>die.value === firstValue)
  if (allHeld && allSameValue) {
    setTenzies(true)
  }
 
},[dice])
```
useEffect watches on all the dices for held die and check if all dice are held and have the same value if so it will setTenzies to true.

[gitHub]() 