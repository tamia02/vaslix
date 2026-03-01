import { motion } from 'framer-motion';

export const Architecture = () => {
    return (
        <section className="architecture">
            <div className="container">
                <h2 className="section-title text-center">System Architecture</h2>

                <div className="arch-visual">
                    <motion.div
                        className="glass arch-layer"
                        initial={{ opacity: 0, rotateX: 45, y: 50 }}
                        whileInView={{ opacity: 1, rotateX: 30, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="layer-tag">Execution Layer</div>
                        <p>Voice Agents & Outbound Orchestration</p>
                    </motion.div>

                    <motion.div
                        className="glass arch-layer"
                        initial={{ opacity: 0, rotateX: 45, y: 50 }}
                        whileInView={{ opacity: 1, rotateX: 30, y: -40 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="layer-tag">Intelligence Layer</div>
                        <p>Intent Classification & Memory</p>
                    </motion.div>

                    <motion.div
                        className="glass arch-layer"
                        initial={{ opacity: 0, rotateX: 45, y: 50 }}
                        whileInView={{ opacity: 1, rotateX: 30, y: -80 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <div className="layer-tag">Sync Layer</div>
                        <p>CRM Persistence & API Integration</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
