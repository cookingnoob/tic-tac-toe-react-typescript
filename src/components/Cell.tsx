type CellProps = {
  c: string;
  index: number;
  handleCellValueClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
export default function Cell({ c, index, handleCellValueClick }: CellProps) {
  return (
    <button
      id={`${index}`}
      className="card"
      onClick={handleCellValueClick}
      disabled={c ? true : false}
    >
      {c}
    </button>
  );
}
