import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
    return (
        <section className="not-found">
            <div className="container text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="error-code">404</h1>
                    <div className="section-header">
                        <h2>Infrastructure Layer Not Found</h2>
                        <p>The requested autonomous module does not exist in this sector.</p>
                    </div>
                    <div className="error-actions mt-12 flex justify-center gap-8">
                        <a href="/" className="btn btn-primary flex items-center gap-4">
                            <Home size={18} /> Return to Hub
                        </a>
                        <button onClick={() => window.history.back()} className="btn btn-ghost flex items-center gap-4">
                            <ArrowLeft size={18} /> Previous Sector
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
