import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"


import { Square } from './components/Square.jsx' // Importando Square de la Carpeta *components*
import { TURNS } from './constants.js' // Importando Constantes
import { checkEndGame, checkWinner } from './logic/board.js'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null)) // Estado del Tablero
  const [turn, setTurn] = useState(TURNS.X) // Estado para cambiar de Turno
  const [winner, setWinner] = useState(null) // Estado para saber quien gano - null=sin ganador - false=empate

  const updateBoard = (index) => {

    //No Actualizamos la posicion 
    //si ya tiene algo
    if (board[index] || winner) return

    //Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambiar el Turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisamos si hay Ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map( (cell, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <button onClick={resetGame}>Resetar el Tablero</button>

      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Gano'
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>

            </div>

          </section>
        )
      }

    </main>
  )
}

export default App
