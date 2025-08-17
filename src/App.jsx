import { useState } from 'react'
import './App.css'

function App() {
  const [dieId, setDieId] = useState("")
  const [dieSides, setDieSides] = useState("4")
  function rollDice(dice){
    rolls = dice.sides
    return Math.floor(Math.random() * rolls) + 1
  }
const dices = [
    {
      "id": "d4",
      "sides": 4,
      "description": "Four-sided die, pyramid shape."
    },
    {
      "id": "d6",
      "sides": 6,
      "description": "Standard six-sided die."
    },
    {
      "id": "d8",
      "sides": 8,
      "description": "Eight-sided die, often used for damage rolls."
    },
    {
      "id": "d10",
      "sides": 10,
      "description": "Ten-sided die, percentile rolls use two of these."
    },
    {
      "id": "d12",
      "sides": 12,
      "description": "Twelve-sided die, less common but used for certain weapons."
    },
    {
      "id": "d20",
      "sides": 20,
      "description": "Twenty-sided die, used for attack rolls, saving throws, and checks."
    },
    {
      "id": "d100",
      "sides": 100,
      "description": "Percentile die (usually rolled with 2d10)."
    }
  ]



  return (
    <>
    <h1>"Damn"</h1>
      <select onChange={(e) => {setDieId(parseInt(e.target.key)), setDieSides(parseInt(e.target.value))} } value={dieSides}>
           {dices.map((el) => (
          <option key={el.id} value={el.sides}>
            {el.id}
          </option>
        ))}
      </select>
      <p>Selected die has {dieSides} sides.</p>
    </>
  )
}

export default App
