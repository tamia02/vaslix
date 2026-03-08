import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="/" className="nav-logo">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Shield size={18} color="white" strokeWidth={2.5} />
                        </div>
                        <span>VASLIX</span>
                    </div>
                </a>

                <div className="nav-links hidden md:flex">
                    <a href="#results">Infrastructure</a>
                    <a href="#capabilities">Capabilities</a>
                    <a href="#studio">Studio</a>
                    <a href="#pricing">Capital</a>
                </div>

                <div className="nav-right">
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            className="nav-btn-link"
                            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Terminal
                        </button>
                        <button
                            className="btn btn-primary btn-sm nav-cta"
                            onClick={() => window.open('https://calendly.com/tasmiyasiddiqui457/quick-discovery-call', '_blank')}
                        >
                            Deploy <ArrowRight size={12} className="ml-2" />
                        </button>
                    </div>

                    <button className="md:hidden text-slate-900" onClick={toggleMenu}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="mobile-nav-links">
                            <a href="#results" onClick={toggleMenu}>Infrastructure</a>
                            <a href="#capabilities" onClick={toggleMenu}>Capabilities</a>
                            <a href="#studio" onClick={toggleMenu}>Studio</a>
                            <a href="#pricing" onClick={toggleMenu}>Capital</a>
                            <hr className="border-slate-100 my-4" />
                            <button
                                className="mobile-nav-btn"
                                onClick={() => {
                                    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
                                    toggleMenu();
                                }}
                            >
                                Terminal
                            </button>
                            <button
                                className="btn btn-primary w-full justify-center mt-4"
                                onClick={() => window.open('https://calendly.com/tasmiyasiddiqui457/quick-discovery-call', '_blank')}
                            >
                                Deploy <ArrowRight size={14} className="ml-2" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

