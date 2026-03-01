import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CursorGlow = () => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const springX = useSpring(mouse.x, { stiffness: 500, damping: 28 });
    const springY = useSpring(mouse.y, { stiffness: 500, damping: 28 });

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(124, 92, 255, 0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen',
            }}
        />
    );
};
