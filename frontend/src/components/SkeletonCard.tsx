import { motion } from 'framer-motion';

export const SkeletonCard = () => {
    return (
        <div className="card skeleton-card">
            <div className="skeleton-header">
                <motion.div
                    className="skeleton-circle"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                    className="skeleton-line short"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
            </div>
            <div className="skeleton-body">
                <motion.div
                    className="skeleton-line"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
                <motion.div
                    className="skeleton-line"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
            </div>
        </div>
    );
};
