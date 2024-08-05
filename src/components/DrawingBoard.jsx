import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import AvailablePointers from "./AvailablePointers";
import { DEFAULT_COLOR, DEFAULT_POINTER } from "../enums";
import ColorSelector from "./ColorSelector";

// TODO: Add the PenIcon as a cursor
const DrawingBoard = () => {
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [pointerSize, setPointerSize] = useState(DEFAULT_POINTER);
  const [strokeStyle, setStrokeStyle] = useState(DEFAULT_COLOR.hex);

  // History state
  const [actionHistory, setActionHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]); // todo
  const [currentAction, setCurrentAction] = useState({
    color: strokeStyle,
    pointerSize: pointerSize,
    lines: [],
  });

  const draw = (moveToX, moveToY, lineToX, lineToY) => {
    context.beginPath();
    context.moveTo(moveToX, moveToY);
    context.lineTo(lineToX, lineToY);
    context.stroke();
  };

  // redraw function - runtime complexity - o(n^2)
  // try to find optimizations
  const drawHistory = () => {
    handleClearBoard();

    // no pointer size param
    const lastAction = actionHistory[actionHistory.length - 1];
    console.log(lastAction);

    for (let i = 0; i < actionHistory.length - 1; i++) {
      const action = actionHistory[i];

      // odd bug of stroke style changes on undo - pointerSize missing
      context.strokeStyle = action.color;
      context.lineWidth = action.pointerSize;
      action.lines.forEach((line) => {
        draw(
          line.moveTo.x,
          line.moveTo.y,
          line.lineTo.offsetX,
          line.lineTo.offsetY
        );
      });
    }

    setActionHistory(actionHistory.splice(0, actionHistory.length - 1));
    setRedoHistory([lastAction, ...redoHistory]);
  };

  const drawHistoryRedo = () => {
    if (redoHistory.length === 0) return;

    const firstAction = redoHistory[0];
    console.log(firstAction), redoHistory;

    context.strokeStyle = firstAction.color;
    context.lineWidth = firstAction.pointerSize;
    firstAction.lines.forEach((line) => {
      draw(
        line.moveTo.x,
        line.moveTo.y,
        line.lineTo.offsetX,
        line.lineTo.offsetY
      );
    });

    setActionHistory([...actionHistory, firstAction]);
    setRedoHistory(redoHistory.splice(1));
  };

  const handleUndo = () => {
    drawHistory();
  };

  const handleRedo = () => {
    drawHistoryRedo();
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    context.strokeStyle = strokeStyle;
    context.lineWidth = pointerSize;
    setIsDrawing(true);
    setLastPos({ x: offsetX, y: offsetY });
    setCurrentAction({
      color: strokeStyle,
      pointerSize: pointerSize,
      lines: [],
    });
  };

  //FIX: onMouseOut - stop drawing
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing === true) {
      draw(lastPos.x, lastPos.y, offsetX, offsetY);

      setCurrentAction({
        color: strokeStyle,
        lines: [
          ...currentAction.lines,
          { moveTo: { ...lastPos }, lineTo: { offsetX, offsetY } },
        ],
      });

      setLastPos({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    setActionHistory([...actionHistory, currentAction]);
  };

  const handleClearBoard = () => {
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const handlePointerSizeChange = (size) => {
    setPointerSize(size);
    context.lineWidth = size;
  };

  const handleStrokeStyleChange = (color) => {
    setStrokeStyle(color);
    context.strokeStyle = color;
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.strokeStyle = strokeStyle;
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
        <ColorSelector
          selectedColor={strokeStyle}
          changeColor={handleStrokeStyleChange}
        />
      </div>
      <div className="w-full flex items-center justify-start">
        <Button onClick={handleUndo} label="Undo" />
        <Button onClick={handleRedo} label="Redo" className="ml-4" />
      </div>
    </div>
  );
};

export default DrawingBoard;

// endgoal: make it multiplayer
