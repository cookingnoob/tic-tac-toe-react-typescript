import { useState } from "react";
import { originalBoard, winningCells } from "./constants";

export function useWinner(board: string[], userValue: string | null) {
  const handleWinner = () => {
    for (const combination of winningCells) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = handleWinner();

  const winningMessage = winner === userValue ? "Ganaste!!!" : "Gano el bot";

  return { winner, winningMessage };
}

export function useBoard() {
  const [board, setBoard] = useState<string[]>(originalBoard);

  const availableIndexes = board.reduce<number[]>((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  const tie = availableIndexes.length === 0 ? true : false;
  //agrega el valor a una celda
  const handleChooseCell = (id: number, turnValue: string) => {
    const newBoard = board.map((cell, index) => {
      if (!turnValue) {
        throw Error("no hay valor de usuario");
      }
      if (cell !== "") {
        return cell; //retorna lo que ya se habia escrito
      }
      if (index === +id && cell === "") {
        return turnValue;
      }
      return ""; //retorna valor original del array, no modifica
    });
    setBoard(newBoard);
  };

  return { board, availableIndexes, tie, handleChooseCell };
}

export function useTurn() {
  const [userTurn, setUserTurn] = useState(false);
  const [botTurn, setBotTurn] = useState(false);

  const handleChangeTurn = (user: boolean, bot: boolean) => {
    setUserTurn(user);
    setBotTurn(bot);
  };

  const handleFirstTurn = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    randomNumber % 2 === 0 ? setBotTurn(true) : setUserTurn(true);
  };
  return { userTurn, botTurn, handleChangeTurn, handleFirstTurn };
}
