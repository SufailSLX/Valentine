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

          .made-by {
            position: absolute;
            bottom: 15px;
            right: 20px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.9rem;
            z-index: 60;
            opacity: 0.7;
            transition: color 0.5s ease;
          }
          .made-by a {
            color: inherit;
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s;
          }
          .made-by a:hover {
            opacity: 1;
            text-decoration: underline;
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

            {/* 6. Made By Footer */}
            {/* 6. Made By Footer */}
            <div
                className="made-by"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: accepted ? 'rgba(255, 255, 255, 0.5)' : '#D81B60'
                }}
            >
                Made BY <a href="https://github.com/SufailSLX" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Intro;