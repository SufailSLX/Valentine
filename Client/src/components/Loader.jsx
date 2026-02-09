import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const romanticMessages = [
    "Holding the moment for you...",
    "Almost ready to melt your heart...",
];

const FloatingHeart = ({ delay }) => (
    <motion.div
        className="absolute text-pink-500/30"
        initial={{ y: "100vh", x: Math.random() * window.innerWidth, opacity: 0, scale: 0.5 }}
        animate={{ y: "-10vh", opacity: [0, 0.8, 0], scale: 1 }}
        transition={{
            duration: Math.random() * 5 + 5,
            delay: delay,
            repeat: Infinity,
            ease: "linear",
        }}
        style={{ left: Math.random() * 100 + "%" }}
    >
        <svg
            width={Math.random() * 20 + 10}
            height={Math.random() * 20 + 10}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    </motion.div>
);

const Loader = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % romanticMessages.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2, ease: "easeInOut" },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.15, 1, 1.15, 1], // "Lub-dub" heartbeat
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.5,
            },
        },
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-950 z-[9999] overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-zinc-950 to-zinc-950 blur-3xl" />

            {/* Floating Hearts Background */}
            {[...Array(15)].map((_, i) => (
                <FloatingHeart key={i} delay={i * 0.8} />
            ))}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center z-10"
            >
                {/* Main Heart Container with Glow */}
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />

                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]"
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Stroke Layer - Draws first */}
                        <motion.path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="transparent"
                            stroke="#ec4899"
                            strokeWidth="0.8"
                            variants={pathVariants}
                        />

                        {/* Fill Layer - Fills and beats */}
                        <motion.path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="#ec4899"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            variants={pulseVariants}
                            whileInView="pulse"
                        />
                    </motion.svg>
                </div>

                {/* Rotating Text Messages */}
                <div className="h-16 mt-6 flex items-center justify-center overflow-hidden w-full px-4">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentMessageIndex}
                            className="font-['Great_Vibes'] text-pink-200/90 text-3xl md:text-5xl tracking-wide text-center drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {romanticMessages[currentMessageIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Loader;
