import { useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { originalBoard, values } from "./lib/constants";
import ValueContainer from "./components/ValueContainer";

type TBoard = string[];

function App() {
  const [board, setBoard] = useState<TBoard>(originalBoard);
  const [userValue, setUserValue] = useState<string | null>(null);

  const [userTurn, setUserTurn] = useState(false);
  const [botTurn, setBotTurn] = useState(false);

  const botValue = useMemo(
    () => values.find((v) => v != userValue),
    [userValue]
  );

  //usuario selecciona su valor
  const handleSelectUserValue = (value: string) => {
    setUserValue(value);
  };

  //agrega el valor a una celda
  const handleSelectCell = (id: number, turnValue: string): TBoard => {
    const newBoard = board.map((cell, index) => {
      if (!turnValue) {
        throw Error("no hay valor de usuario");
      }
      if (cell !== "") {
        return cell;
      }
      if (index === +id && cell === "") {
        return turnValue;
      }
      return "";
    });
    return newBoard;
  };

  //seleccion de celda con click
  const handleCellValueClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userValue) {
      return;
    }
    const id = e.currentTarget.id;
    const newBoard = handleSelectCell(+id, userValue);
    setBoard(newBoard);
    handleBotTurn();
  };

  //seleccion de celda automatizada
  const handleBotTurn = () => {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    if (!botValue) {
      return;
    }
    if (board[randomNumber] !== "") {
      handleBotTurn();
      return;
    }
    const newBoard = handleSelectCell(randomNumber, botValue);
    setBoard(newBoard);
  };

  return (
    <>
      <ValueContainer
        userValue={userValue}
        handleSelectUserValue={handleSelectUserValue}
      />
      {userValue && (
        <Board board={board} handleCellValueClick={handleCellValueClick} />
      )}
    </>
  );
}

export default App;
