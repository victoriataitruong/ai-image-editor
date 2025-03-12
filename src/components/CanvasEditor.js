import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const CanvasEditor = ({ image }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const history = useRef([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    // Create a new fabric canvas
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,  // Set the canvas width to the window's width
      height: window.innerHeight,  // Set the canvas height to the window's height
    });
    setCanvas(newCanvas);

    // Cleanup on component unmount
    return () => newCanvas.dispose();
  }, []);

  useEffect(() => {
    if (canvas && image) {
      fabric.Image.fromURL(image, (img) => {
        // Calculate scale factor to fit image within canvas size
        const scaleFactor = Math.min(window.innerWidth / img.width, window.innerHeight / img.height);
        
        // Apply an additional scaling factor to make the image even smaller (e.g., 0.5)
        const smallerScaleFactor = scaleFactor * 0.5;
        
        // Set image properties including position and scaling
        img.set({
          left: (window.innerWidth - img.width * smallerScaleFactor) / 2,
          top: (window.innerHeight - img.height * smallerScaleFactor) / 2,
          scaleX: smallerScaleFactor,
          scaleY: smallerScaleFactor,
        });
        
        canvas.add(img);
        canvas.renderAll();
        saveState();
      });
    }
  }, [canvas, image]);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.Textbox('Your Text', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: 'black',
    });
    canvas.add(text);
    canvas.renderAll();
    saveState();
  };

  const toggleDrawing = () => {
    if (!canvas) return;
    setIsDrawing(!isDrawing);
    canvas.isDrawingMode = !canvas.isDrawingMode;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = 'black';
    saveState();
  };

  const saveState = () => {
    if (!canvas) return;
    history.current = history.current.slice(0, historyIndex.current + 1);
    history.current.push(JSON.stringify(canvas));
    historyIndex.current++;
  };

  const undo = () => {
    if (!canvas || historyIndex.current <= 0) return;
    historyIndex.current--;
    canvas.loadFromJSON(history.current[historyIndex.current], () => canvas.renderAll());
  };

  const redo = () => {
    if (!canvas || historyIndex.current >= history.current.length - 1) return;
    historyIndex.current++;
    canvas.loadFromJSON(history.current[historyIndex.current], () => canvas.renderAll());
  };

  const downloadImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <h2>Upload an image, resize, draw, and download</h2>
      <div className="controls">
        <button className="btn" onClick={toggleDrawing}>{isDrawing ? 'Disable Draw' : 'Enable Draw'}</button>
        <button className="btn" onClick={undo}>Undo</button>
        <button className="btn" onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
