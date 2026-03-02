import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, CheckCircle, Loader2 } from 'lucide-react';

export const ContactUs = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call for now (Phase 3 Integration)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="contact-us">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">Get in Touch</span>
                    <h2>Ready to scale your infrastructure?</h2>
                    <p>Contact our partnership team for enterprise-grade solutions.</p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="item-icon"><Mail size={20} /></div>
                            <div className="item-text">
                                <h4>Email Us</h4>
                                <p>tasmiya@vaslix.in</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="item-icon"><MessageCircle size={20} /></div>
                            <div className="item-text">
                                <h4>Live Support</h4>
                                <p>Available 24/7 for Enterprise</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="item-icon"><MapPin size={20} /></div>
                            <div className="item-text">
                                <h4>Global Hub</h4>
                                <p>India</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form card" onSubmit={handleSubmit}>
                        {status === 'success' ? (
                            <motion.div
                                className="success-state text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 24px' }} />
                                <h3>Message Received</h3>
                                <p>Our enterprise team will reach out within 2 hours.</p>
                                <button
                                    className="btn btn-ghost mt-8"
                                    onClick={() => setStatus('idle')}
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Work Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@company.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        placeholder="How can we help?"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    className="btn btn-primary w-full"
                                    type="submit"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <><Loader2 className="animate-spin mr-2" size={18} /> Processing...</>
                                    ) : 'Send Message'}
                                </button>
                                {status === 'error' && (
                                    <p className="error-text mt-4 text-center">Failed to send. Please try again.</p>
                                )}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};
