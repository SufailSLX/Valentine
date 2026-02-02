import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Outtro from './outtro';

// --- Assets & Icons ---
const HeartIcon = ({ type, color, size, rotation, style, className }) => {
    const commonProps = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        className: className,
        style: {
            transform: `rotate(${rotation}deg)`,
            ...style
        },
        xmlns: "http://www.w3.org/2000/svg"
    };

    const path = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

    if (type === 'solid') return (<svg {...commonProps}><path d={path} fill={color} /></svg>);
    if (type === 'outline') return (<svg {...commonProps}><path d={path} stroke={color} strokeWidth="2" /><path d="M12 18l-1-1C6.5 13 4 10.5 4 8c0-2 1.5-3.5 3.5-3.5 1 0 2 .5 2.5 1.5.5-1 1.5-1.5 2.5-1.5 2 0 3.5 1.5 3.5 3.5 0 2.5-2.5 5-7 9z" stroke={color} strokeWidth="1" opacity="0.6" transform="scale(0.8) translate(3,3)" /></svg>);
    if (type === 'dotted') return (<svg {...commonProps}><defs><pattern id={`dot-pattern-${color}`} width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs><path d={path} fill={color} /><path d={path} fill={`url(#dot-pattern-${color})`} fillOpacity="0.6" /></svg>);
    return null;
};

const Intro = () => {
    const [accepted, setAccepted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [showConfetti, setShowConfetti] = useState(false);

    // Background Hearts
    const scatteredHearts = useMemo(() => {
        const hearts = [];
        const colors = ['#C2185B', '#D81B60', '#E91E63', '#F06292', '#F48FB1'];
        const types = ['solid', 'outline', 'dotted'];
        for (let i = 0; i < 50; i++) {
            hearts.push({
                id: i,
                top: Math.random() * 100,
                left: Math.random() * 100,
                size: Math.random() * 30 + 15,
                rotation: Math.random() * 360,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: types[Math.floor(Math.random() * types.length)],
                duration: Math.random() * 5 + 5 // Random float duration
            });
        }
        return hearts;
    }, []);

    // Confetti Hearts for the "Finish" animation
    const confettiHearts = useMemo(() => {
        if (!showConfetti) return [];
        const hearts = [];
        const colors = ['#ff0000', '#ff4d4d', '#ff9999', '#C2185B'];
        for (let i = 0; i < 40; i++) {
            hearts.push({
                id: i,
                left: 50, // Start center
                top: 50,  // Start center
                destX: (Math.random() - 0.5) * 200, // Explode outward
                destY: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                size: Math.random() * 20 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5
            });
        }
        return hearts;
    }, [showConfetti]);

    // Handle "Yes" click
    const handleAccept = () => {
        setAccepted(true);
        setShowConfetti(true);
    };

    // Handle "No" hover - Run away!
    const moveNoButton = (e) => {
        e.preventDefault(); // Prevent click on mobile

        // Wider range of movement
        const x = Math.random() * 400 - 200;
        const y = Math.random() * 400 - 200;

        setNoBtnPosition({ x, y });
    };

    return (
        <div className="valentine-container">
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@500;700&display=swap');

          .valentine-container {
            position: relative;
            width: 100%;
            height: 100vh;
            background-color: #fff0f5;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Great Vibes', cursive;
          }

          /* --- Animations --- */
          @keyframes floatBackground {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes heartbeat {
            0% { transform: scale(1); }
            15% { transform: scale(1.1); }
            30% { transform: scale(1); }
            45% { transform: scale(1.1); }
            60% { transform: scale(1); }
          }

          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes flyOut {
            0% { opacity: 1; transform: translate(0, 0) scale(1); }
            100% { opacity: 0; transform: translate(var(--destX), var(--destY)) scale(0.5); }
          }

          /* --- Layout --- */
          .text-content {
            z-index: 20;
            text-align: center;
            color: #9c1c38;
            font-size: 4rem;
            line-height: 1.2;
            text-shadow: 3px 3px 0px #fff;
            position: relative;
            animation: popIn 1s ease-out forwards;
          }

          .center-mask {
            position: absolute;
            width: 600px;
            height: 550px;
            z-index: 10;
            animation: popIn 0.8s ease-out forwards;
          }

          /* --- Buttons --- */
          .btn-group {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 20px;
            font-family: 'Montserrat', sans-serif;
          }

          .btn {
            padding: 12px 30px;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          .btn-yes {
            background-color: #D81B60;
            color: white;
            animation: heartbeat 2s infinite;
          }
          .btn-yes:hover {
            background-color: #ad1457;
            transform: scale(1.1);
          }

          .btn-no {
            background-color: #fff;
            color: #D81B60;
            border: 2px solid #D81B60;
            position: relative;
          }

          /* --- Finish State --- */
          .success-message {
            font-size: 5rem;
            color: #D81B60;
          }
          
          .confetti-heart {
            position: absolute;
            z-index: 30;
            pointer-events: none;
          }

          @media (max-width: 768px) {
            .text-content { font-size: 2.5rem; }
            .center-mask { width: 320px; height: 300px; }
            .success-message { font-size: 3rem; }
            .btn { padding: 10px 20px; font-size: 1rem; }
          }
        `}
            </style>

            {/* 1. Background Floating Hearts */}
            {scatteredHearts.map((h) => (
                <div
                    key={h.id}
                    style={{
                        position: 'absolute',
                        top: `${h.top}%`,
                        left: `${h.left}%`,
                        animation: `floatBackground ${h.duration}s ease-in-out infinite`,
                        zIndex: 1,
                        opacity: 0.8
                    }}
                >
                    <HeartIcon type={h.type} color={h.color} size={h.size} rotation={h.rotation} />
                </div>
            ))}

            {/* 2. White Mask Heart */}
            <div className="center-mask">
                <svg viewBox="0 0 24 24" width="100%" height="100%" fill="white" style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.05))' }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>

            {/* 3. Text & Interaction */}
            <div className="text-content">
                {!accepted && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <motion.div variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}>Will you</motion.div>
                            <motion.div variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}>be My</motion.div>
                            <motion.div variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}>Valentine?</motion.div>
                        </motion.div>

                        <div className="btn-group">
                            <button className="btn btn-yes" onClick={handleAccept}>
                                YES
                            </button>
                            <button
                                className="btn btn-no"
                                onMouseEnter={moveNoButton}
                                onTouchStart={moveNoButton}
                                onClick={moveNoButton}
                                style={{
                                    transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`,
                                    transition: 'transform 0.05s ease-out'
                                }}
                            >
                                NO
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* 5. Outtro Overlay */}
            {accepted && <Outtro />}

            {/* 4. Celebration Confetti */}
            {accepted && confettiHearts.map((h) => (
                <div
                    key={h.id}
                    className="confetti-heart"
                    style={{
                        left: `${h.left}%`,
                        top: `${h.top}%`,
                        '--destX': `${h.destX}px`,
                        '--destY': `${h.destY}px`,
                        animation: `flyOut 1.5s ease-out forwards ${h.delay}s`
                    }}
                >
                    <HeartIcon type="solid" color={h.color} size={h.size} rotation={h.rotation} />
                </div>
            ))}
        </div>
    );
};

export default Intro;