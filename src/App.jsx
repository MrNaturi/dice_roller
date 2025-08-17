import { useState } from 'react'
import './App.css'

function App() {
  const [dieId, setDieId] = useState("d4")
  const [dieSides, setDieSides] = useState(4)
  const [rolled, setRolled] = useState(false)
  const [roll, setRoll] = useState(0)
  const [rolling, setRolling] = useState(false)
   const [history, setHistory] = useState([])
  
  function rollDice(sides) {
    setRolling(true)
    setRolled(true)
    let counter = 0
    const interval = setInterval(() => {
      setRoll(Math.floor(Math.random() * sides) + 1)
      counter++
    }, 100)
    setTimeout(() => {
      clearInterval(interval)
      const finalRoll = Math.floor(Math.random() * sides) + 1
      setRoll(finalRoll)
      setHistory(prev => [...prev, `You rolled a ${finalRoll} from a ${dieId}`])
      setRolling(false)
    }, 1000)
  }
  function restart(){
    setRolled(false)
    setRoll(0)
    setDieSides(4)
    setDieId('d4')
    setHistory([])
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
    <h1>"DnD Dice Roller"</h1>
    <label>
  Choose a die: 
      <select onChange={(e) => {
        const selectedDie = dices.find(d => d.sides === parseInt(e.target.value))
        setDieId((selectedDie.id))
        setDieSides(parseInt(e.target.value))} } 
        value={dieSides}>
           {dices.map((el) => (
          <option key={el.id} value={el.sides}>
            {el.id}
          </option>
        ))}
      </select>
      </label>
      <p>Selected die has {dieSides} sides.</p>
      <button disabled={rolling} onClick={() => rollDice(dieSides)}>
          {rolling ? "Rolling..." : "Roll"}
      </button>
      {
        rolled && 
        <div>
          <p>You rolled a {roll}</p>
          <div>
            <h3>History</h3>
            <ul>
                    {history.map((el, i) => (
                <li key={i}>
                  {el}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() =>{restart()}}>Restart</button>
        </div>
      }
       {rolled && dieId === "d4" && (
  <img
    src={`/${dieId}/${roll}.png`}
    alt={`d4 roll ${roll}`}
    style={{ width: "100px", height: "auto", marginTop: "10px" }}
  />
)}
      
    </>
  )
}

export default App
