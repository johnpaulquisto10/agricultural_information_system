import { motion } from 'framer-motion';

export default function Card({
    children,
    className = '',
    animate = true,
    delay = 0
}) {
    const content = (
        <div className={`card ${className}`}>
            {children}
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
            >
                {content}
            </motion.div>
        );
    }

    return content;
}