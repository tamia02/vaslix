import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Zap, Database, Search } from 'lucide-react';

const TiltCard = ({ cap, className, delay }: { cap: any, className: string, delay: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`capability-card premium-card ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
        >
            <div className="card-background"></div>
            <div className="card-border-glow"></div>

            <div className="card-content-wrapper">
                <div className="card-icon">
                    <cap.icon size={48} strokeWidth={1.5} />
                </div>

                <h3 className="card-title">{cap.title}</h3>
                <p className="card-description">{cap.description}</p>

                <div className="cap-meta">
                    {cap.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="cap-tag">{tag}</span>
                    ))}
                </div>

                <a href="#" className="btn-link">
                    Explore Infrastructure
                    <ArrowRight size={18} className="ml-2" />
                </a>
            </div>
        </motion.div>
    );
};

const capabilities = [
    {
        title: 'VASLIX Omni',
        description: 'A unified experience across every customer touchpoint. Seamlessly pivot between voice, chat, and email without losing context or record integrity.',
        icon: Globe,
        tags: ['Multi-channel', 'Real-time'],
        class: 'cap-card-large'
    },
    {
        title: 'Kinetic Logic',
        description: 'Autonomous reasoning that adapts to lead behavior. Real-time objection handling engineered for complex enterprise sales cycles.',
        icon: Zap,
        tags: ['Adaptive AI', 'Sales Focused'],
        class: 'cap-card-tall'
    },
    {
        title: 'Orchestrator Pro',
        description: 'Deep CRM synchronization for HubSpot and Salesforce. Automated ingestion and qualification.',
        icon: Database,
        tags: ['CRM Native', 'Deep Sync'],
        class: 'cap-card-small'
    },
    {
        title: 'Insight Engine',
        description: 'Transform every dialogue into structured metadata. Advanced sentiment analysis.',
        icon: Search,
        tags: ['RAG Enabled', 'Analytics'],
        class: 'cap-card-small'
    }
];

export const Capabilities = () => {
    return (
        <section id="capabilities" className="capabilities">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">Infrastructure</span>
                    <h2>Platform Capabilities</h2>
                    <p>The elite tools powering your autonomous revenue department.</p>
                </div>

                <div className="capabilities-grid">
                    {capabilities.map((cap, i) => (
                        <TiltCard key={i} cap={cap} className={cap.class} delay={i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};
