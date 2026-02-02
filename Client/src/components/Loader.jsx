import { motion } from "framer-motion";

const Loader = () => {
    const pathVariants = {
        hidden: {
            pathLength: 0,
            opacity: 0,
        },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
            },
        },
    };

    const fillVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 2, // Wait for path drawing
                duration: 0.5,
            },
        },
    };

    const pulseVariants = {
        visible: {
            scale: [1, 1.1, 1],
            transition: {
                delay: 2.5, // Wait for fill
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-950 z-[9999]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center"
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                    initial="hidden"
                    animate="visible"
                >
                    {/* Stroke Layer */}
                    <motion.path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="transparent"
                        stroke="#ec4899" // Pink-500
                        strokeWidth="0.5"
                        variants={pathVariants}
                    />

                    {/* Fill Layer */}
                    <motion.path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#ec4899" // Pink-500
                        variants={{
                            ...fillVariants,
                            ...pulseVariants.visible
                        }}
                    />
                </motion.svg>

                <motion.p
                    className="mt-8 text-pink-400 font-light text-xl tracking-[0.2em]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    LOADING
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Loader;
