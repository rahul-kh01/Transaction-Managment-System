import React, { useState, useEffect } from "react";

const TypewriterText = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  showCursor = true,
  cursorBlink = true,
  onComplete = null 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial delay before starting the animation
    const initialDelay = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(initialDelay);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, isTyping, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && isTyping && (
        <span 
          className={`inline-block w-0.5 h-full bg-current ml-0.5 ${
            cursorBlink ? 'animate-pulse' : ''
          }`}
          style={{
            animation: cursorBlink ? 'blink 1s infinite' : 'none'
          }}
        />
      )}
      <style>{`
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
};

export default TypewriterText; 