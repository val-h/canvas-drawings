import { POINTER_SIZES } from "../enums";

const AvailablePointers = ({ pointerSize, changePointerSize }) => {
  return (
    <div
      className={
        "flex justify-center items-center gap-4 border shadow p-4 ml-4"
      }
    >
      {POINTER_SIZES.map((size) => (
        <VisualPointer
          key={size}
          onClick={() => changePointerSize(size)}
          diameter={size}
          isSelected={size === pointerSize}
        />
      ))}
    </div>
  );
};

const VisualPointer = ({ onClick, diameter, isSelected }) => {
  return (
    <div
      onClick={() => onClick(diameter)}
      style={{ width: `${diameter}px`, height: `${diameter}px` }}
      className={`bg-black rounded-full ${
        isSelected ? "outline outline-gray-400" : ""
      }`}
    ></div>
  );
};

export default AvailablePointers;
