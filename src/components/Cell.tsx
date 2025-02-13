type CellProps = {
  c: string;
  index: number;
  handleUserTurn: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export default function Cell({ c, index, handleUserTurn }: CellProps) {
  return (
    <button
      id={`${index}`}
      className="card"
      onClick={handleUserTurn}
      disabled={c ? true : false}
    >
      {c}
    </button>
  );
}
