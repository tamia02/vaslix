import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
    {
        name: 'Standard Infrastructure',
        price: 'Custom',
        period: 'Config',
        description: 'Optimized for domestic operations and growth-stage teams.',
        features: ['12 Autonomous Voice Nodes', 'Direct CRM Orchestration', '2 Enterprise AI Personas', 'Standard Latency Tier']
    },
    {
        name: 'Professional Cluster',
        price: 'Scale',
        period: 'Tier',
        description: 'High-volume revenue automation for established scaling units.',
        features: ['Unlimited Compute Capacity', 'Deep Workflow Synchronization', 'Persistent Knowledge Layer', 'Hardware Acceleration', 'Global Node Redundancy'],
        popular: true
    },
    {
        name: 'Sovereign Core',
        price: 'Enterprise',
        period: 'Quote',
        description: 'Bespoke infrastructure architectures for global organizations.',
        features: ['Dedicated Neural Hardware', 'Direct Database Integration', 'Custom Security Protocols', 'White-glove Cluster Implementation', 'SLA Performance Guarantee']
    }
];

export const Pricing = () => {
    return (
        <section id="pricing" className="pricing-section">
            <div className="container">
                <div className="section-header text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Capital Allocation</span>
                    <h2 className="mb-6">Infrastructure Scalability</h2>
                    <p className="text-muted">Precision-engineered tiers for predictable autonomous scaling.</p>
                </div>

                <div className="pricing-grid">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            className={`pricing-card card ${plan.popular ? 'popular' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                        >
                            <div className="plan-header">
                                <h3>{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">{plan.period}</span>
                                </div>
                                <p className="plan-description">{plan.description}</p>
                            </div>

                            <div className="plan-features">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="feature-item">
                                        <Check size={14} strokeWidth={3} className="feature-icon" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} w-full justify-between group`}>
                                Deploy Cluster
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
