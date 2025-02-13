import Cell from "./Cell";

type BoardPros = {
  board: string[];
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export default function Board({ board, handleClick }: BoardPros) {
  return (
    <div className="board">
      {board.map((c, index) => (
        <Cell c={c} index={index} handleClick={handleClick} />
      ))}
    </div>
  );
}
