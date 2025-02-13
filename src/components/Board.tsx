import Cell from "./Cell";

type BoardPros = {
  board: string[];
  handleCellValueClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
export default function Board({ board, handleCellValueClick }: BoardPros) {
  return (
    <div className="board">
      {board.map((c, index) => (
        <Cell
          key={index}
          c={c}
          index={index}
          handleCellValueClick={handleCellValueClick}
        />
      ))}
    </div>
  );
}
