import "../styles/Keyboard.css";
import { useState, useEffect, useRef } from "react";

const keyMappings = {
  " ": "Space",
  "Control": "Ctrl",
  "AltGraph": "Alt",
  "CapsLock": "CapsLock",
  "Shift": "Shift",
  "Enter": "Enter",
  "Backspace": "Backspace",
  "Tab": "Tab",
  "Meta": "Win"
};

const keys = [
  "Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
  "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\",
  "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter",
  "Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift",
               "Ctrl", "Alt", "Space", "Alt", "Ctrl"
];

export default function Keyboard() {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.8);
  const [isHovered, setIsHovered] = useState(false);
  const keyboardRef = useRef(null);
  const hasBeenDragged = useRef(false);

  useEffect(() => {
    if (!hasBeenDragged.current) {
      setPosition({
        x: 50,
        y: window.innerHeight - 380
      });
    }
  }, [scale]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = keyMappings[event.key] || event.key.toUpperCase();
      setActiveKeys((prevKeys) => new Set(prevKeys).add(key));
    };

    const handleKeyUp = (event) => {
      const key = keyMappings[event.key] || event.key.toUpperCase();
      setActiveKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    };

    const handleWheel = (event) => {
      if (isHovered) {
        setScale((prevScale) => Math.min(Math.max(prevScale + event.deltaY * -0.001, 0.7), 1.3));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isHovered]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setOffset({ x: event.clientX - position.x, y: event.clientY - position.y });
    hasBeenDragged.current = true;
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newX = event.clientX - offset.x;
      const newY = event.clientY - offset.y;

      setPosition({
        x: newX,
        y: newY
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    handleMouseUp();
  };

  return (
    <div
      className={`keyboard ${isDragging ? 'dragging' : ''}`}
      ref={keyboardRef}
      style={{
        position: 'fixed',
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: "center",
        display: "grid",
        gridTemplateColumns: "repeat(14, 1fr)",
        gap: "6px",
        padding: "12px",
        width: "800px",
        maxWidth: "95vw",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        zIndex: 1000,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {keys.map((key) => (
        <div key={key} className={`key key-${key} ${activeKeys.has(key) ? "active" : ""}`}>
          {key}
        </div>
      ))}
    </div>
  );
}
