import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Mail, Calendar, Settings, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { AICore } from '../components/canvas/AICore';

const agents = [
    {
        id: 'voice',
        name: 'Voice Infrastructure',
        description: 'Autonomous voice orchestration with natural cadence and objection handling.',
        icon: Phone,
        color: '#0066CC',
        active: '482',
        latency: '14ms'
    },
    {
        id: 'chat',
        name: 'Cognitive Chat',
        description: 'Multi-turn autonomous dialogue across all customer touchpoints.',
        icon: MessageSquare,
        color: '#10B981',
        active: '1.2k',
        latency: '8ms'
    },
    {
        id: 'email',
        name: 'Outbound Thread',
        description: 'Strategic email campaigns synchronized with CRM intent signals.',
        icon: Mail,
        color: '#F59E0B',
        active: '84',
        latency: '2ms'
    },
    {
        id: 'scheduler',
        name: 'Scheduler Hub',
        description: 'Automated executive meeting coordination and discovery qualification.',
        icon: Calendar,
        color: '#EC4899',
        active: '159',
        latency: '142ms'
    }
];

export const AgentStudio = () => {
    const [activeStates, setActiveStates] = useState<Record<string, 'idle' | 'syncing' | 'active'>>({});

    const handleConfigure = (id: string) => {
        setActiveStates(prev => ({ ...prev, [id]: 'syncing' }));

        // Simulate infrastructure provisioning
        setTimeout(() => {
            setActiveStates(prev => ({ ...prev, [id]: 'active' }));
        }, 2000);
    };

    return (
        <section id="studio" className="agent-studio">
            <div className="container relative">
                <div className="section-header text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Execution Layer</span>
                    <h2 className="mb-6">Agent Studio</h2>
                    <p className="text-muted">Deploy specialized infrastructure modules optimized for specific revenue operations.</p>
                </div>

                <div className="agents-grid">
                    {agents.map((agent, i) => {
                        const state = activeStates[agent.id] || 'idle';

                        return (
                            <motion.div
                                key={agent.id}
                                className={`agent-card card bespoke-card ${state === 'active' ? 'ring-2 ring-emerald-500/30' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -12, transition: { duration: 0.4 } }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                style={{ color: agent.color }}
                            >
                                <div className="agent-header">
                                    <div className="agent-icon-box">
                                        <agent.icon size={28} strokeWidth={1} />
                                    </div>
                                    <div className="agent-status-wrapper">
                                        <div className={`agent-status-pulse ${state === 'syncing' ? 'bg-amber-500' : state === 'active' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                                        <span className={`agent-status-text !font-black ${state === 'syncing' ? 'text-amber-600' : state === 'active' ? 'text-emerald-600' : 'text-blue-600'}`}>
                                            {state === 'idle' ? 'STANDBY' : state === 'syncing' ? 'SYNCING' : 'OPERATIONAL'}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-slate-950">{agent.name}</h3>
                                <p className="font-medium">{agent.description}</p>

                                <div className="agent-metrics">
                                    <div className="metric-item">
                                        <span className="metric-label">Active Modules</span>
                                        <span className="metric-value text-slate-900">{agent.active}</span>
                                    </div>
                                    <div className="metric-item">
                                        <span className="metric-label">Avg Latency</span>
                                        <span className="metric-value text-slate-900">{agent.latency}</span>
                                    </div>
                                </div>

                                <div className="agent-footer">
                                    <button
                                        onClick={() => handleConfigure(agent.id)}
                                        disabled={state !== 'idle'}
                                        className={`btn btn-sm !py-2.5 !px-5 !rounded-lg text-[10px] font-black uppercase tracking-widest transition-all
                                            ${state === 'idle' ? 'btn-secondary' : state === 'syncing' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}
                                        `}
                                    >
                                        <AnimatePresence mode="wait">
                                            {state === 'idle' ? (
                                                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                                    Configure <Settings size={12} />
                                                </motion.span>
                                            ) : state === 'syncing' ? (
                                                <motion.span key="sync" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                                    Syncing <RefreshCw size={12} className="animate-spin" />
                                                </motion.span>
                                            ) : (
                                                <motion.span key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                                    Ready <CheckCircle2 size={12} />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="section-mascot mt-32 h-[400px]">
                    <Canvas camera={{ position: [0, 0, 4], fov: 35 }} dpr={[1, 2]}>
                        <AICore />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};
