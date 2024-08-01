import { useState } from "react";

const PointerWidthControl = ({}) => {
  const [width, setWidth] = useState(10);

  const handleWidthChange = (e) => {
    setWidth(e.target.currentValue);
  };

  const handleIncrement = () => {
    setWidth((prevWidth) => {
      return (prevWidth += 1);
    });
  };

  const handleDecrement = () => {
    setWidth((prevWidth) => {
      return (prevWidth -= 1);
    });
  };

  return (
    <div className="border shadow p-4">
      <div className={`rounded-full w-${width} h-${width} bg-black`}></div>
      <input
        min={1}
        max={16}
        type="number"
        value={width}
        onChange={handleWidthChange}
      />
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
};

export default PointerWidthControl;
