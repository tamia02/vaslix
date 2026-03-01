import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2 }: { end: string, duration?: number }) => {
    const [count, setCount] = useState(0);
    const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
    const suffix = end.replace(/[0-9.]/g, '');

    useEffect(() => {
        let start = 0;
        const increment = numericEnd / (duration * 60);
        const handle = setInterval(() => {
            start += increment;
            if (start >= numericEnd) {
                setCount(numericEnd);
                clearInterval(handle);
            } else {
                setCount(start);
            }
        }, 1000 / 60);
        return () => clearInterval(handle);
    }, [numericEnd, duration]);

    return <span>{count.toFixed(count % 1 === 0 ? 0 : 1)}{suffix}</span>;
};

const stats = [
    { label: 'Sovereign Growth', value: '10x', detail: 'Sustained ROI across enterprise deployment cycles.', icon: TrendingUp },
    { label: 'Revenue Managed', value: '$8.4M', detail: 'Autonomous orchestration of peak operational volume.', icon: BarChart3 },
    { label: 'System Uptime', value: '99.9%', detail: 'Engineered redundancy for critical infrastructure.', icon: ShieldCheck },
];

const caseStudies = [
    {
        company: 'Nexus Technical',
        result: 'Reduced qualification latency by 98%',
        description: 'Autonomous voice modules now handle 100% of global inbound volume, increasing pipeline velocity by 4x.',
        image: '/C:/Users/tasmi/.gemini/antigravity/brain/a41e6227-9553-474e-8be0-6f782829ac75/case_study_nexus_tech_1772388796738.png'
    },
    {
        company: 'Aether Logistics',
        result: 'Recovered $2.1M in dormant revenue',
        description: 'Workflow intelligence autonomously synchronized CRM intent signals with real-time billing remediation.',
        image: '/C:/Users/tasmi/.gemini/antigravity/brain/a41e6227-9553-474e-8be0-6f782829ac75/case_study_aether_logistics_new_1772388843150.png'
    }
];

export const Results = () => {
    return (
        <section id="results" className="results-section">
            <div className="container">
                <div className="section-header text-center mb-20 max-w-2xl mx-auto">
                    <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Benchmarks</span>
                    <h2 className="mb-6">Engineered Results</h2>
                    <p className="text-muted">The measurable performance metrics of autonomous infrastructure.</p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="stat-card premium-stat"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                        >
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-value">
                                <CountUp end={stat.value} />
                            </div>
                            <p className="stat-detail">{stat.detail}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="case-studies-grid">
                    {caseStudies.map((study, i) => (
                        <motion.div
                            key={i}
                            className="case-study-card card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                        >
                            <div className="study-content">
                                <span className="company-name">{study.company}</span>
                                <h3>{study.result}</h3>
                                <p>{study.description}</p>
                                <button className="btn btn-secondary !px-6 text-[11px] font-bold uppercase tracking-widest">
                                    Technical Breakdown <ArrowRight size={14} className="ml-2" />
                                </button>
                            </div>
                            <div className="study-image">
                                <img src={study.image} alt={study.company} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
