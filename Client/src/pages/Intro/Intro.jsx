import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Outtro from './outtro';

const Intro = () => {
    const [accepted, setAccepted] = useState(false);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [hearts, setHearts] = useState([]);

    // Generate background hearts
    useEffect(() => {
        const newHearts = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 5,
            size: Math.random() * 20 + 10,
        }));
        setHearts(newHearts);
    }, []);

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPos({ x, y });
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center relative overflow-hidden font-['Montserrat']">
            {/* Background Floating Hearts */}
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute text-pink-200 pointer-events-none select-none"
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: 0.8 }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'linear',
                    }}
                    style={{
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                    }}
                >
                    ❤️
                </motion.div>
            ))}

            <AnimatePresence>
                {!accepted && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="z-10 w-full max-w-2xl px-4"
                    >
                        {/* Glass Card */}
                        <div className="bg-white/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 text-center">
                            <h1 className="font-['Great_Vibes'] text-6xl md:text-8xl text-pink-600 mb-8 drop-shadow-sm leading-tight">
                                Will you be my Valentine?
                            </h1>

                            <div className="flex gap-8 justify-center items-center mt-8 md:mt-12 h-20">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setAccepted(true)}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xl md:text-2xl px-10 py-3 rounded-full font-bold shadow-lg transition-all duration-300"
                                >
                                    YES
                                </motion.button>

                                <motion.button
                                    animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    onMouseEnter={moveNoButton}
                                    onTouchStart={moveNoButton}
                                    className="bg-white text-pink-500 border-2 border-pink-500 text-xl md:text-2xl px-10 py-3 rounded-full font-bold shadow-lg cursor-pointer whitespace-nowrap"
                                >
                                    NO
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>



            {/* Outtro Overlay */}
            {accepted && <Outtro />}
        </div>
    );
};

export default Intro;