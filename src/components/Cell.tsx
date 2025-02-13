type CellProps = {
  c: string;
  index: number;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export default function Cell({ c, index, handleClick }: CellProps) {
  return (
    <button
      id={`${index}`}
      className="card"
      onClick={handleClick}
      disabled={c ? true : false}
    >
      {c}
    </button>
  );
}
