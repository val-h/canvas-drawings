import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import AvailablePointers from "./AvailablePointers";
import { DEFAULT_COLOR, DEFAULT_POINTER, MAX_ACTION_HISTORY } from "../enums";
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
  const [redoHistory, setRedoHistory] = useState([]);
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
  // Odd bug where a small portion from the end line of an actions is considered an action
  const drawHistory = () => {
    if (actionHistory.length === 0) return;

    handleClearBoard();

    const lastAction = actionHistory[actionHistory.length - 1];
    console.log(lastAction);

    for (let i = 0; i < actionHistory.length - 1; i++) {
      const action = actionHistory[i];

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

    //possibly remove over limit actions here
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
    redoHistory.length > 1
      ? setRedoHistory(redoHistory.splice(1))
      : setRedoHistory([]);
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

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing === true) {
      draw(lastPos.x, lastPos.y, offsetX, offsetY);

      setCurrentAction({
        color: strokeStyle,
        pointerSize: pointerSize,
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
    const totalActions = actionHistory.length + redoHistory.length;
    if (totalActions > MAX_ACTION_HISTORY - 2) {
      setActionHistory([
        ...actionHistory.splice(1, actionHistory.length),
        currentAction,
      ]);
    } else {
      setActionHistory([...actionHistory, currentAction]);
    }
    setRedoHistory([]);
  };

  const handleClearBoard = () => {
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // For now reset the history from here
    setActionHistory([]);
    setRedoHistory([]);
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
    <div className="flex justify-center">
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={canvasRef}
        height={800}
        width={800}
        className="border shadow"
      ></canvas>

      <div className="w-32 flex flex-col ml-4 gap-4">
        <Button onClick={handleClearBoard} label="Clear" />
        <Button onClick={drawHistory} label="Undo" />
        <Button onClick={drawHistoryRedo} label="Redo" />
        <AvailablePointers
          pointerSize={pointerSize}
          changePointerSize={handlePointerSizeChange}
        />
        <ColorSelector
          selectedColor={strokeStyle}
          changeColor={handleStrokeStyleChange}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;

// endgoal: make it multiplayer
