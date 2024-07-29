import { useEffect, useRef, useState } from "react"

const DrawingBoard = () => {
    const fillStyle = 'black'
    const lineWidth = 5;

    const [context, setContext] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPos, setLastPos] = useState(null);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setIsDrawing(true)
        setLastPos({x: offsetX, y: offsetY})
    }
    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = e.nativeEvent;

        if (isDrawing === true) {
            context.beginPath()
            context.moveTo(lastPos.x, lastPos.y)
            context.lineTo(offsetX, offsetY);
            context.stroke();
            setLastPos({x: offsetX, y: offsetY});
        }
    }
    const handleMouseUp = (e) => {
        setIsDrawing(false);
    }

    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = fillStyle;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';

        setContext(context);
    }, [])

    return <canvas onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={canvasRef} height={800} width={800} className="border shadow"></canvas>
}

export default DrawingBoard;