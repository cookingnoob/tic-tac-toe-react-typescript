import Cell from "./Cell";

type BoardPros = {
  board: string[];
  handleUserTurn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export default function Board({ board, handleUserTurn }: BoardPros) {
  return (
    <div className="board">
      {board.map((c, index) => (
        <Cell key={index} c={c} index={index} handleUserTurn={handleUserTurn} />
      ))}
    </div>
  );
}
