import { COLORS } from "../enums";

import ColorDropIcon from "../icons/ColorDropIcon";

const ColorSelector = ({ changeColor, selectedColor }) => {
  return (
    <div className="flex flex-col bg-white justify-center items-center gap-4 border shadow px-4 py-3">
      {COLORS.map((color) => (
        <div
          key={color.name}
          onClick={() => changeColor(color.hex)}
          className={`rounded-full bg-gray-200 p-1 ${
            selectedColor === color.hex ? "border-2 border-gray-200" : ""
          }`}
        >
          <ColorDropIcon size="20" fill={color.hex} />
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
