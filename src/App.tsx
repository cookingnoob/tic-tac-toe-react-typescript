import { useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { values } from "./lib/constants";
import ValueContainer from "./components/ValueContainer";
import { useBoard, useTurn, useWinner } from "./lib/hooks";

function App() {
  const [userValue, setUserValue] = useState<string | null>(null);

  const { board, availableIndexes, tie, handleChooseCell } = useBoard();
  const { winner, winningMessage } = useWinner(board, userValue);
  const { userTurn, botTurn, handleChangeTurn, handleFirstTurn } = useTurn();

  const botValue = useMemo(
    () => values.find((v) => v != userValue),
    [userValue]
  );

  //usuario selecciona su valor
  const handleSelectUserValue = (value: string) => {
    setUserValue(value);
    handleFirstTurn();
  };

  //seleccion de celda con click
  const handleUserTurn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userValue) return;
    if (!userTurn) return;
    if (winner) return;
    const id = e.currentTarget.id;
    handleChooseCell(+id, userValue);
    handleChangeTurn(false, true);
  };

  //seleccion de celda automatizada
  const handleBot = () => {
    if (!botValue) return;
    if (!botTurn) return;
    if (winner) return;
    const randomAvialableIndex =
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

    if (availableIndexes.length === 0) return;

    setTimeout(() => {
      handleChooseCell(randomAvialableIndex, botValue);
      handleChangeTurn(true, false);
    }, 500);
  };

  if (botTurn) handleBot();

  return (
    <>
      <div className="titles">
        {!winner && !tie && botTurn && <h1>Es turno del bot</h1>}
        {!winner && !tie && userTurn && <h1>Es turno del usuario</h1>}
        {!winner && tie && <h1>Empate!</h1>}
        {winner && <h1>{winningMessage}</h1>}
        {!userValue && <h1>Escoge un valor para iniciar la partida</h1>}
      </div>
      <ValueContainer
        userValue={userValue}
        handleSelectUserValue={handleSelectUserValue}
      />
      {userValue && <Board board={board} handleUserTurn={handleUserTurn} />}
    </>
  );
}

export default App;
