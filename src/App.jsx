import { useState } from 'react'
import "./App.css"

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
      setHistory(prev => [`You rolled a ${finalRoll} from a ${dieId}`, ...prev,])
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-amber-100 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-amber-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-500"></div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
            🎲 Arcane Dice Chamber 🎲
          </h1>
          <p className="text-xl text-purple-200 font-medium">Channel the power of the dice gods</p>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
        </div>

        {/* Main container */}
        <div className="bg-black/30 backdrop-blur-sm border-2 border-amber-400/50 rounded-2xl p-8 shadow-2xl shadow-purple-900/50">
          
          {/* Die selection */}
          <div className="mb-8">
            <label className="block text-2xl font-semibold text-amber-200 mb-4">
              🔮 Choose Your Mystical Die:
            </label>
            <select 
              onChange={(e) => {
                const selectedDie = dices.find(d => d.sides === parseInt(e.target.value))
                setDieId((selectedDie.id))
                setDieSides(parseInt(e.target.value))
              }} 
              value={dieSides}
              className="w-full p-4 text-xl bg-slate-800 border-2 border-purple-400/50 rounded-xl text-amber-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 cursor-pointer hover:bg-slate-700"
            >
              {dices.map((el) => (
                <option key={el.id} value={el.sides} className="bg-slate-800 text-amber-100">
                  {el.id} - {el.description}
                </option>
              ))}
            </select>
            <p className="text-purple-200 text-lg mt-3 font-medium">
              ✨ Your chosen die wields <span className="text-amber-300 font-bold">{dieSides}</span> sides of power
            </p>
          </div>

          {/* Roll button */}
          <div className="text-center mb-8">
            <button 
              disabled={rolling} 
              onClick={() => rollDice(dieSides)}
              className={`
                px-12 py-4 text-2xl font-bold rounded-xl transition-all duration-300 transform
                ${rolling 
                  ? 'bg-purple-600/50 text-purple-200 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-900 hover:scale-105 shadow-lg shadow-amber-500/50 hover:shadow-amber-400/60'
                }
              `}
            >
              {rolling ? (
                <span className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                  Conjuring Magic...
                </span>
              ) : (
                "🎯 Cast the Die!"
              )}
            </button>
          </div>

          {/* Results section */}
          {rolled && (
            <div className="space-y-6">
              {/* Roll result */}
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-purple-600/30 to-amber-600/30 border-2 border-amber-400 rounded-2xl p-8 mb-6">
                  <p className="text-3xl text-amber-200 mb-2 font-semibold">The fates have spoken!</p>
                  <div className={`text-7xl font-bold ${rolling ? 'animate-pulse' : 'animate-bounce'}`}>
                    <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                      {roll}
                    </span>
                  </div>
                </div>
              </div>

              
              
                <div className="text-center">
                  <img
                    src={`/${dieId}/${roll}.png`}
                    alt={`${dieId} roll ${roll}`}
                    className="w-32 h-auto mx-auto rounded-lg shadow-lg shadow-purple-900/50 border-2 border-amber-400/30"
                  />
                </div>
              

              {/* History */}
              <div className="bg-slate-800/50 border border-purple-400/30 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                  📜 Chronicle of Rolls
                </h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {history.map((el, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border-l-4 border-amber-400/50 hover:bg-black/50 transition-colors">
                      <span className="text-amber-400 text-lg">⚡</span>
                      <span className="text-purple-200">{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restart button */}
              <div className="text-center">
                <button 
                  onClick={restart}
                  className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-amber-100 font-semibold rounded-xl border-2 border-slate-500 hover:border-slate-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-slate-700/50"
                >
                  🔄 Reset the Realm
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-purple-300">
          <p className="text-lg font-medium">May fortune favor your rolls, adventurer</p>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.7);
        }
      `}</style>
    </div>
  )
}

export default App