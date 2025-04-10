import React, { useState } from "react";
import "../styles/TextArea.css";

const getRandomParagraph = () => {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This is a test paragraph with multiple words.",
    "A journey of a thousand miles begins with a single step. Keep typing and explore the colors.",
    "Learning to code is fun and rewarding. Keep practicing and enhancing your skills.",
    "Creativity comes from an open mind. Explore new ideas and keep improving daily.",
    "Failure is a lesson. Learn, adapt, and keep moving forward toward your dreams.",
    "Your potential is limitless. Keep striving and pushing boundaries to achieve greatness.",
    "Collaboration leads to success faster. Work together and achieve bigger goals easily.",
    "Time is your most valuable asset. Use it wisely and focus on meaningful work.",
    "Dream big and take action. Hard work and passion make anything possible today."
  ];
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};

export default function ColorfulTyping() {
  const [text, setText] = useState(getRandomParagraph());
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;

    // Start the timer on first keystroke
    if (typedText.length === 0) {
      setStartTime(Date.now());
    }

    setTypedText(value);

    // Check if user completed the paragraph
    if (value.trim() === text.trim()) {
      calculateResults(value);
      setTimeout(() => {
        setText(getRandomParagraph()); // Load new paragraph
        setTypedText(""); // Reset input
      }, 500); // Short delay before new paragraph
    }
  };

  const calculateResults = (typedValue) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 60000; // Convert ms to minutes

    // Calculate WPM (Words Per Minute)
    const wordCount = text.split(" ").length;
    const calculatedWpm = timeTaken > 0 ? Math.round(wordCount / timeTaken) : 0;

    // Calculate Errors
    let errorCount = 0;
    text.split("").forEach((char, index) => {
      if (typedValue[index] !== char) {
        errorCount++;
      }
    });

    // Calculate Accuracy
    const totalChars = text.length;
    const correctChars = totalChars - errorCount;
    const calculatedAccuracy = ((correctChars / totalChars) * 100).toFixed(2);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setErrors(errorCount);
  };

  return (
    <div className="main-container">
      <div className="container">
        <p className="highlighted-text">
          {text.split("").map((char, index) => (
            <span
              key={index}
              style={{
                color:
                  typedText[index] === char
                    ? "green"
                    : typedText[index]
                    ? "red"
                    : "black",
              }}
            >
              {char}
            </span>
          ))}
        </p>
        <div className="results">
          <h3>Typing Statistics</h3>
          <p><strong>Speed (WPM):</strong> {wpm}</p>
          <p><strong>Accuracy:</strong> {accuracy}%</p>
          <p><strong>Errors:</strong> {errors}</p>
        </div>
        <textarea
          onChange={handleChange}
          className="text-area"
          value={typedText}
          placeholder="Start typing here..."
        ></textarea>

        
      </div>
    </div>
  );
}
