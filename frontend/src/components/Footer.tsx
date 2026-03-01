import { Phone, Mail, Globe, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="footer-enterprise">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">VASLIX</div>
                        <p className="footer-tagline">Autonomous Revenue Infrastructure for Infinite Scale.</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="#" className="social-link"><Linkedin size={20} /></a>
                            <a href="#" className="social-link"><Github size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-column">
                            <h4>Platform</h4>
                            <a href="#studio">Agent Studio</a>
                            <a href="#capabilities">Capabilities</a>
                            <a href="#dashboard">Dashboard</a>
                            <a href="#">API Documentation</a>
                        </div>
                        <div className="footer-column">
                            <h4>Company</h4>
                            <a href="#about">About Us</a>
                            <a href="#">Enterprise Plans</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                        <div className="footer-column">
                            <h4>Support</h4>
                            <a href="#contact">Contact Us</a>
                            <a href="#">Security & SLAs</a>
                            <a href="#">Knowledge Base</a>
                            <a href="#">Live Status</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 VASLIX AI. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="mailto:hello@vaslix.ai"><Mail size={14} /> hello@vaslix.ai</a>
                        <a href="#"><Globe size={14} /> Global / English</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
