import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { AICore } from '../components/canvas/AICore';
import { GridBackground } from '../components/canvas/GridBackground';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-10"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">Enterprise Infrastructure</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="hero-title">
                        <span>Autonomous Revenue.</span>
                        <span className="text-accent">Engineered to Run 24/7.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="hero-subtitle">
                        Architecting the future of revenue operations through sovereign voice agents,
                        deep CRM orchestration, and workflow intelligence. Unified Precision.
                    </motion.p>

                    <motion.div variants={itemVariants} className="hero-actions">
                        <button
                            className="btn btn-primary btn-lg !rounded-full !px-10"
                            onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Deploy Agent
                        </button>
                        <button
                            className="btn btn-secondary btn-lg group !rounded-full !px-10"
                            onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Solutions
                            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Floating Technical Badges - NovaCell/F1 Elite Style */}
                <div className="hero-badges-layer">
                    <motion.div
                        className="floating-tech-badge"
                        style={{ top: '25%', left: '15%' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="badge-label">Neural Engine v4.2</span>
                    </motion.div>

                    <motion.div
                        className="floating-tech-badge"
                        style={{ bottom: '20%', right: '12%' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                    >
                        <span className="badge-label">Sync Protocol: 14ms</span>
                        <ArrowRight size={14} className="opacity-40" />
                    </motion.div>
                </div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                >
                    <Canvas camera={{ position: [0, 0, 4], fov: 35 }} dpr={[1, 2]}>
                        <GridBackground />
                        <AICore />
                    </Canvas>
                </motion.div>
            </div>
        </section>
    );
};
