import { motion } from 'framer-motion';
import React from 'react';

const Outtro = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 4, 3], // Scale up massively then settle slightly back
                    opacity: [0, 1, 1],
                    rotate: [0, -10, 10, 0] // Slight wiggle like a playful kiss
                }}
                transition={{
                    duration: 0.8,
                    times: [0, 0.6, 1],
                    ease: "easeOut"
                }}
                className="text-[10rem] md:text-[15rem] filter drop-shadow-2xl"
            >
                💋
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-[20%] text-center"
            >
                <div className="font-[Great Vibes] text-pink-500 text-5xl md:text-7xl font-bold drop-shadow-lg">
                    Yay!
                </div>
                <div className="font-[Montserrat] text-pink-400 text-2xl md:text-3xl mt-4 font-bold tracking-wide">
                    You're my Valentine! ❤️
                </div>
            </motion.div>
        </div>
    );
};

export default Outtro;
