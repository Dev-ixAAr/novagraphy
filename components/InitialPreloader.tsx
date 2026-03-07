"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialPreloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if user has already visited the site in this session
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setIsLoading(false);
            setIsCompleted(true);
            return;
        }

        // Simulate loading progress
        const duration = 2000; // 2 seconds
        const interval = 20; // Update every 20ms
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoading(false);
                    sessionStorage.setItem("hasVisited", "true");
                }, 500); // 0.5s pause at 100%
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    if (isCompleted) return null;

    return (
        <AnimatePresence onExitComplete={() => setIsCompleted(true)}>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white"
                >
                    {/* Subtle noise/glass effect (luxurious) */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,225,252,0.05)_0%,transparent_70%)] pointer-events-none" />

                    {/* Central content */}
                    <div className="flex flex-col items-center z-10 w-64 space-y-6">
                        <div className="text-4xl font-share-tech tracking-widest text-[#2DE1FC]">
                            {Math.round(progress)}%
                        </div>

                        {/* Progress bar container */}
                        <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-[#2DE1FC]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-10 font-contrail tracking-[0.3em] text-white/30 text-xs sm:text-sm uppercase">
                        NOVAGRAPHY
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
