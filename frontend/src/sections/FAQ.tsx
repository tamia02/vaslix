import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'How does VASLIX integrate with existing CRMs?',
        answer: 'VASLIX features a native ingestion layer for HubSpot, Salesforce, and Pipedrive. It uses workflow intelligence to synchronize AI-driven status changes with your existing lead stages in real-time.'
    },
    {
        question: 'What measures are in place for enterprise security?',
        answer: 'We provide SOC2 compliant infrastructure, end-to-end encryption for all voice data, and the option for on-premise node deployment for sensitive operations. Your data is never used for training public models.'
    },
    {
        question: 'Do you offer Service Level Agreements (SLAs)?',
        answer: 'Yes. Our Professional and Enterprise plans include guaranteed 99.9% uptime SLAs, dedicated support engineers, and technical implementation audits.'
    },
    {
        question: 'Can the AI agents handle complex technical objections?',
        answer: 'Absolutely. Using our Persistent Memory Layer, you can train agents on your specific technical documentation and sales playbooks, enabling them to navigate complex enterprise-level objections with high accuracy.'
    }
];

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">Direct Answers</span>
                    <h2>Enterprise FAQ</h2>
                    <p>Addressing the core technical and operational concerns of revenue teams.</p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, i) => (
                        <div key={i} className="faq-item card">
                            <button
                                className="faq-question"
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            >
                                <span>{faq.question}</span>
                                {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="faq-answer"
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
