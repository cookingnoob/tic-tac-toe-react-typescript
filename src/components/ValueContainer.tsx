import { values } from "../lib/constants";

type ValueContainerProps = {
  userValue: string | null;
  handleSelectUserValue: (v: string) => void;
};

export default function ValueContainer({
  userValue,
  handleSelectUserValue,
}: ValueContainerProps) {
  if (userValue) {
    return;
  }
  return (
    <div className="value-container">
      {values.map((v) => (
        <button
          key={v}
          onClick={() => handleSelectUserValue(v)}
          disabled={userValue ? true : false}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
