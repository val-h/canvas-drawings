import { useEffect, useRef } from "react";

const useCanvas = (props) => {
  const canvasRef = useRef(null);

  const { draw } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
