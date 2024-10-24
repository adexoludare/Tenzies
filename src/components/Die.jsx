import React from 'react'

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

export default Die