"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TypingEffectProps {
  words?: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  pauseDuration?: number;
}

const TypingEffect = ({
  words = ["Creative Software Developer", "AI Solution Architect", "Digital Advertiser"],
  typingSpeed = 100,
  erasingSpeed = 50,
  pauseDuration = 2000
}: TypingEffectProps) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const handleTyping = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isTyping) {
      if (charIndex < currentWord.length) {
        setText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex, words, pauseDuration]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? typingSpeed : erasingSpeed
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping, typingSpeed, erasingSpeed]);

  return (
    <span className="inline-flex items-center">
      <span className="text-inherit">
        {text}
      </span>
      {/* Kursor berkedip — menggunakan warna current agar fleksibel */}
      <span className="ml-1 w-[2px] h-[1em] bg-current animate-pulse opacity-50">|</span>
    </span>
  );
};

export default TypingEffect;
