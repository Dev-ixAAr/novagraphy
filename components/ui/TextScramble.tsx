"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number; // Animation duration in seconds
  delay?: number;    // Start delay
}

export function TextScramble({ text, className, duration = 2, delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    // Start animation logic
    let startTime: number;
    let animationFrame: number;
    
    const timeoutId = setTimeout(() => {
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000); // 0 to 1

            if (progress >= 1) {
                setDisplayText(text);
                return;
            }

            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (char === " ") return " "; // Keep spaces
                    // If progress is past this character's index percentage, reveal it
                    if (index / text.length < progress) {
                        return char;
                    }
                    // Otherwise show random char
                    return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
                })
                .join("");

            setDisplayText(scrambled);
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(animationFrame);
    };
  }, [isInView, text, duration, delay]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className={className}
    >
      <span className="sr-only">{text}</span> {/* For Screen Readers */}
      <span aria-hidden="true">{displayText}</span>
    </motion.span>
  );
}