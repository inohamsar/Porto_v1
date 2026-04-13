"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface TypingBadgeProps {
  text: string;
  trigger?: boolean;
  className?: string;
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDuration?: number;
  startDelay?: number; // Initial delay before the first type
}

export default function TypingBadge({ 
  text, 
  trigger = false, 
  className = "", 
  typingSpeed = 150, 
  erasingSpeed = 75,
  pauseDuration = 2500,
  startDelay = 0
}: TypingBadgeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true); // Start paused for startDelay
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsReady(true);
      }, startDelay * 1000);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPaused(true);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedText("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCharIndex(0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTyping(true);
    }
  }, [trigger, startDelay]);

  const handleTyping = useCallback(() => {
    if (!trigger || isPaused || !isReady) return;

    if (isTyping) {
      if (charIndex < text.length) {
        setDisplayedText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsTyping(true);
        }, 1000); // Pause briefly before re-typing
      }
    }
  }, [charIndex, isTyping, text, trigger, isPaused, isReady, pauseDuration]);

  useEffect(() => {
    if (!trigger || !isReady) return;

    const timeout = setTimeout(
      handleTyping,
      isTyping ? typingSpeed : erasingSpeed
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping, typingSpeed, erasingSpeed, trigger, isReady]);

  return (
    <span className={`${className} inline-flex items-center min-h-[1.2rem]`}>
      <span>
        {displayedText}
      </span>
      {/* Blinking Cursor (Permanent loop) */}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          times: [0, 0.5, 0.5, 1],
          ease: "linear" 
        }}
        className="ml-1 w-[2px] h-[1em] bg-current"
      />
    </span>
  );
}
