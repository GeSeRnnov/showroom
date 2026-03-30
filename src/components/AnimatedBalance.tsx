import { FC, useEffect } from "react";
import { motion, useSpring, useTransform } from 'framer-motion';

export const AnimatedBalance: FC<{ value: number }> = ({ value = 0 }) => {
      // Пружинная анимация для плавности
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <div className="text-2xl font-mono font-bold text-green-400">
        <motion.span>{display}</motion.span> ₽
    </div>
}
