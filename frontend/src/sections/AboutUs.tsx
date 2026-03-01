import { motion } from 'framer-motion';

export const AboutUs = () => {
    return (
        <section id="about" className="about-us">
            <div className="container">
                <div className="about-grid">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-tag">Our Mission</span>
                        <h2>Engineered to redefine the edge of human-AI collaboration.</h2>
                        <p>
                            VASLIX was founded on the principle that autonomous infrastructure should be as intuitive as it is powerful. We don't just build agents; we build the future of execution.
                        </p>
                        <p>
                            Our team of world-class engineers and AI researchers are dedicated to creating a world where revenue operations are self-sustaining, self-correcting, and infinitely scalable.
                        </p>
                    </motion.div>
                    <motion.div
                        className="about-visual card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="visual-stat">
                            <span className="stat-num">99.9%</span>
                            <span className="stat-label">Uptime Execution</span>
                        </div>
                        <div className="visual-stat">
                            <span className="stat-num">10x</span>
                            <span className="stat-label">Efficiency Gain</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
