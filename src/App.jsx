import Canvas from "./components/Canvas";
import DrawingBoard from "./components/DrawingBoard";

function App() {
  const drawPing = (context, frameCount) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    context.fill();
  };

  const drawSmile = (context, frameCount) => {
    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.moveTo(110, 75);
    context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    context.moveTo(65, 65);
    context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    context.moveTo(95, 65);
    context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    context.stroke();
  };

  const drawHeart = (context, frameCount) => {
    context.beginPath();
    context.fillStyle = "red";
    context.moveTo(75, 40);
    context.bezierCurveTo(75, 37, 70, 25, 50, 25);
    context.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    context.bezierCurveTo(20, 80, 40, 102, 75, 120);
    context.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    context.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    context.bezierCurveTo(85, 25, 75, 37, 75, 40);
    context.fill();
  };

  return (
    <main className="flex flex-col justify-center items-center h-dvh w-dvw bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-500/70 mb-4">
        Canvas Drawing
      </h1>
      {/* <Canvas draw={drawHeart} /> */}

      <DrawingBoard />
    </main>
  );
}

export default App;
