import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';

export const Navbar = () => {
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
            </div>
        </nav>
    );
};
