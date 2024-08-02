import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import AvailablePointers from "./AvailablePointers";
import { DEFAULT_POINTER } from "../enums";

const DrawingBoard = ({ clear }) => {
  const fillStyle = "black";

  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [pointerSize, setPointerSize] = useState(DEFAULT_POINTER);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    setLastPos({ x: offsetX, y: offsetY });
  };
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing === true) {
      context.beginPath();
      context.moveTo(lastPos.x, lastPos.y);
      context.lineTo(offsetX, offsetY);
      context.stroke();
      setLastPos({ x: offsetX, y: offsetY });
    }
  };
  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  const handleClearBoard = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const handlePointerSizeChange = (size) => {
    setPointerSize(size);
    context.lineWidth = size;
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = fillStyle;
    context.lineWidth = pointerSize;
    context.lineCap = "round";

    setContext(context);
  }, []);

  return (
    <div>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
        height={800}
        width={800}
        className="border shadow"
      ></canvas>

      <div className="w-full flex items-center justify-start">
        <Button onClick={handleClearBoard} label="Clear Board" />
        <AvailablePointers
          pointerSize={pointerSize}
          changePointerSize={handlePointerSizeChange}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;

// endgoal: make it multiplayer
