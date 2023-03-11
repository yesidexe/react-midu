import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS} from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage,resetGameStorage } from "./logic/storage/index.js"

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage)return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn,setTurn] = useState(()=>{
    const turnFromStorage=window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner,setWinner]=useState(null)

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  

  const updateBoard=(index)=>{
    //no actualizamos si ya tiene algo
    if(board[index] || winner)return
    //actualiza el tablero
    const newBoard = [...board]
    newBoard[index]=turn
    setBoard(newBoard)
    //cambia el turno
    const newTurn = turn === TURNS.X?TURNS.O:TURNS.X
    setTurn(newTurn)
    //guardar partida aquí
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    })    
    //
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti( )
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)//empate
    }
  }
  
  return(
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Resetear</button>
      <section className="game">
        {
          board.map((_, index)=>{
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
