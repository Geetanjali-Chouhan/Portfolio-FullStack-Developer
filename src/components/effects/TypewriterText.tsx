"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
};

export function TypewriterText({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseTime = 2200,
  className = "",
  cursorClassName = "",
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // If visitor prefers reduced motion, show the first word statically
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentText(words[0]);
      return;
    }

    const fullWord = words[currentWordIndex];

    let timer: NodeJS.Timeout;

    if (!isDeleting && currentText === fullWord) {
      // Pause at full word before starting to delete
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText === "") {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      // Typing or deleting characters
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? fullWord.substring(0, currentText.length - 1)
          : fullWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{currentText}</span>
      <span
        aria-hidden
        className={`ml-1 inline-block w-[3px] animate-pulse rounded-xs bg-[#C5A46D] shadow-[0_0_8px_#C5A46D] ${cursorClassName}`}
        style={{ height: "0.85em" }}
      />
    </span>
  );
}
