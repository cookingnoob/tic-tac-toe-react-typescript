import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

const originalBoard = ["", "", "", "", "", "", "", "", ""];

type TBoard = string[];

function App() {
  const [board, setBoard] = useState<TBoard>(originalBoard);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.id;
    const newBoard = board.map((cell, index) => {
      if (cell !== "") {
        return cell;
      }
      if (index === +id) {
        return "X";
      }
      return "";
    });
    setBoard(newBoard);
  };

  return (
    <>
      <button>X</button>
      <button>O</button>
      <Board board={board} handleClick={handleClick} />
    </>
  );
}

export default App;
