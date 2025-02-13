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
  const availableIndexes = board.reduce<number[]>((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  const tie = availableIndexes.length === 0 ? true : false;

  //usuario selecciona su valor
  const handleSelectUserValue = (value: string) => {
    setUserValue(value);
    handleFirstTurn();
  };

  //agrega el valor a una celda
  const handleSelectCell = (id: number, turnValue: string): TBoard => {
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
    return newBoard;
  };

  //seleccion de celda con click
  const handleCellValueClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userValue) return;
    if (!userTurn) return;

    const id = e.currentTarget.id;
    const newBoard = handleSelectCell(+id, userValue);
    setUserTurn(false);
    setBotTurn(true);
    setBoard(newBoard);
  };

  //seleccion de celda automatizada
  const handleBotTurn = () => {
    if (!botValue) return;
    if (!botTurn) return;

    const randomAvialableIndex =
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

    if (availableIndexes.length === 0) return;

    if (board[randomAvialableIndex] !== "") {
      handleBotTurn();
      return;
    }
    const newBoard = handleSelectCell(randomAvialableIndex, botValue);
    setTimeout(() => {
      setBotTurn(false);
      setUserTurn(true);
      setBoard(newBoard);
    }, 1000);
  };

  const handleFirstTurn = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    randomNumber % 2 === 0 ? setBotTurn(true) : setUserTurn(true);
  };

  if (botTurn) handleBotTurn();

  return (
    <>
      <div className="titles">
        {!tie && botTurn && <h1>Es turno del bot</h1>}
        {!tie && userTurn && <h1>Es turno del usuario</h1>}
        {tie && <h1>Se acabo la partida</h1>}
        {!userValue && <h1>Escoge un valor para iniciar la partida</h1>}
      </div>
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
