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

  const handleSelectCell = (id: number, turnValue: string): TBoard => {
    const newBoard = board.map((cell, index) => {
      if (!turnValue) {
        throw Error("no hay valor de usuario");
      }
      if (cell !== "") {
        return cell;
      }
      if (index === +id) {
        return turnValue;
      }
      return "";
    });
    return newBoard;
  };

  const handleCellValueClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userValue) {
      return;
    }
    const id = e.currentTarget.id;
    const newBoard = handleSelectCell(+id, userValue);
    setBoard(newBoard);
  };

  const handleSelectUserValue = (value: string) => {
    setUserValue(value);
  };

  const handleBotTurn = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    if (!botValue) {
      return;
    }
    const newBoard = handleSelectCell(randomNumber, botValue);
    setBoard(newBoard);
    console.log("botValue newBoard", newBoard);
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
