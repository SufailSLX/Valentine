import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Outtro from './outtro';

const Intro = () => {
    const [accepted, setAccepted] = useState(false);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [hearts, setHearts] = useState([]);
    const [butterflies, setButterflies] = useState([]);
    const yesControls = useAnimation();

    // Timer refs for hold interactions
    const yesTimerRef = useRef(null);
    const noTimerRef = useRef(null);

    // Refs to track if the hold action was successful
    const yesSuccessRef = useRef(false);
    const noSuccessRef = useRef(false);

    // State for hold animation
    const [holdingYes, setHoldingYes] = useState(false);
    const [holdingNo, setHoldingNo] = useState(false);

    // Tip state
    const [showHoldTip, setShowHoldTip] = useState(false);
    const tipTimeoutRef = useRef(null);

    const triggerHoldTip = () => {
        setShowHoldTip(true);
        if (tipTimeoutRef.current) clearTimeout(tipTimeoutRef.current);
        tipTimeoutRef.current = setTimeout(() => setShowHoldTip(false), 2000);
    };

    // Generate background hearts and butterflies
    useEffect(() => {
        const newHearts = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 5,
            size: Math.random() * 20 + 10,
        }));
        setHearts(newHearts);

        const newButterflies = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 6 + Math.random() * 6,
            size: Math.random() * 15 + 15,
        }));
        setButterflies(newButterflies);
    }, []);

    const moveNoButton = () => {
        // Dynamic constraints based on viewport
        const isMobile = window.innerWidth < 768;
        const maxX = isMobile ? 80 : 200; // Constrain horizontal
        const maxY = isMobile ? -200 : -350; // Constrain vertical (upward only)

        const x = Math.random() * (maxX * 2) - maxX; // -maxX to +maxX
        const y = Math.random() * maxY; // 0 to maxY (negative values)

        setNoBtnPos({ x, y });
        setHoldingNo(false);

        // Blink/Pulse the YES button
        yesControls.start({
            scale: [1, 1.2, 1],
            boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 0px 30px rgba(236,72,153,0.8)",
                "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { duration: 0.4 }
        });
    };

    // Yes Button Handlers (Hold 3s)
    const handleYesStart = () => {
        yesSuccessRef.current = false;
        setHoldingYes(true);
        yesTimerRef.current = setTimeout(() => {
            yesSuccessRef.current = true;
            setAccepted(true);
        }, 3000);
    };

    const handleYesEnd = () => {
        setHoldingYes(false);
        if (yesTimerRef.current) {
            clearTimeout(yesTimerRef.current);
            yesTimerRef.current = null;
        }
    };

    // No Button Handlers (Hold 2s)
    const handleNoStart = () => {
        noSuccessRef.current = false;
        setHoldingNo(true);
        noTimerRef.current = setTimeout(() => {
            noSuccessRef.current = true;
            moveNoButton();
        }, 2000);
    };

    const handleNoEnd = () => {
        setHoldingNo(false);
        if (noTimerRef.current) {
            clearTimeout(noTimerRef.current);
            noTimerRef.current = null;
        }
    };

    return (
        <div
            className="min-h-screen bg-pink-50 flex flex-col items-center justify-center relative overflow-hidden font-['Montserrat'] select-none"
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Background Floating Hearts */}
            {hearts.map((heart) => (
                <motion.div
                    key={`heart-${heart.id}`}
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

            {/* Background Floating Butterflies */}
            {butterflies.map((butterfly) => (
                <motion.div
                    key={`butterfly-${butterfly.id}`}
                    className="absolute pointer-events-none select-none"
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 1, 0],
                        x: [0, 20, -20, 0] // Zig-zag motion
                    }}
                    transition={{
                        duration: butterfly.duration,
                        repeat: Infinity,
                        delay: butterfly.delay,
                        ease: 'linear',
                    }}
                    style={{
                        left: `${butterfly.left}%`,
                        fontSize: `${butterfly.size}px`,
                    }}
                >
                    🦋
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

                            <motion.img
                                src="https://i.pinimg.com/originals/2a/a3/77/2aa37795ea614c617e49fd013ddad335.jpg"
                                alt="Cute Valentine Bear"
                                className="w-40 h-40 md:w-56 md:h-56 object-cover mx-auto"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />

                            <div className="flex gap-8 justify-center items-center mt-8 md:mt-12 h-20">
                                <motion.button
                                    animate={yesControls}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseDown={handleYesStart}
                                    onMouseUp={handleYesEnd}
                                    onMouseLeave={handleYesEnd}
                                    onTouchStart={handleYesStart}
                                    onTouchEnd={handleYesEnd}
                                    onClick={() => {
                                        if (!yesSuccessRef.current) triggerHoldTip();
                                    }}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xl md:text-2xl px-10 py-3 rounded-full font-bold shadow-lg transition-all duration-300 relative overflow-hidden touch-none select-none"
                                    style={{ WebkitTouchCallout: 'none' }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-white/30 origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: holdingYes ? 1 : 0 }}
                                        transition={{ duration: holdingYes ? 3 : 0.3, ease: 'linear' }}
                                    />
                                    <span className="relative z-10">YES</span>
                                </motion.button>

                                <motion.button
                                    animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                                    transition={{ type: 'spring', stiffness: 600, damping: 10, mass: 0.8 }}
                                    onMouseDown={handleNoStart}
                                    onMouseUp={handleNoEnd}
                                    onMouseLeave={handleNoEnd}
                                    onTouchStart={handleNoStart}
                                    onTouchEnd={handleNoEnd}
                                    onClick={() => {
                                        if (!noSuccessRef.current) triggerHoldTip();
                                    }}
                                    className="bg-white text-pink-500 border-2 border-pink-500 text-xl md:text-2xl px-10 py-3 rounded-full font-bold shadow-lg cursor-pointer whitespace-nowrap relative overflow-hidden touch-none select-none"
                                    style={{ WebkitTouchCallout: 'none' }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-pink-100 origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: holdingNo ? 1 : 0 }}
                                        transition={{ duration: holdingNo ? 2 : 0.3, ease: 'linear' }}
                                    />
                                    <span className="relative z-10">NO</span>
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {showHoldTip && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-rose-600 font-bold mt-4 text-xl drop-shadow-sm">
                                            Press and hold! 💕
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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