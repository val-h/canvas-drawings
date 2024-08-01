import useCanvas from "../hooks/useCanvas";

const Canvas = (draw) => {
  const canvasRef = useCanvas(draw);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="border shadow"
    ></canvas>
  );
};

export default Canvas;
