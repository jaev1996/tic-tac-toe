import { WINNING_COMBINATIONS } from "../constants"

export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíos
    // en el tablero
    return newBoard.every ((square) => square != null)
  }
export const checkWinner = (boardToCheck) => {
    for (const combo of WINNING_COMBINATIONS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }
  
