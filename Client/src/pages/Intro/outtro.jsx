import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Outtro = () => {
    const [hearts, setHearts] = useState([]);

    // Generate floating hearts for background effect
    useEffect(() => {
        const generateHearts = () => {
            const newHearts = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100, // Random horizontal position
                delay: Math.random() * 5, // Random animation delay
                duration: 4 + Math.random() * 4, // Random duration
            }));
            setHearts(newHearts);
        };
        generateHearts();
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gradient-to-br from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] overflow-hidden">
            {/* Background Floating Hearts */}
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'linear',
                    }}
                    style={{
                        left: `${heart.left}%`,
                        position: 'absolute',
                        fontSize: `${Math.random() * 2 + 1}rem`,
                    }}
                    className="text-white/30 pointer-events-none"
                >
                    ❤️
                </motion.div>
            ))}

            {/* Main Content Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* GIF Container with Glassmorphism */}
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300">
                    <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                        alt="Bear Kiss"
                        className="w-64 h-64 object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="font-['Great_Vibes'] text-white text-7xl md:text-9xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.2)] mb-4">
                        Yay!
                    </h1>
                    <p className="font-['Montserrat'] text-white text-2xl md:text-4xl font-bold tracking-wider drop-shadow-md">
                        You're my Valentine, Beaabb!<span className="text-red-500 inline-block animate-pulse">💗</span>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Outtro;
