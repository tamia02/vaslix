import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dashboardService } from '../services/api';

export const Dashboard = () => {
    const [stats, setStats] = useState<{ label: string; value: string }[]>([]);
    const [flowData, setFlowData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, flowRes] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getLiveFlow()
                ]);
                setStats(statsRes);
                setFlowData(flowRes);
                setLoading(false);
            } catch (error) {
                console.error("Dashboard connection failed:", error);
                // Fallback mock data if backend is offline
                setStats([
                    { label: 'Network Nodes', value: 'Offline' },
                    { label: 'Compute Cycles', value: 'N/A' },
                    { label: 'Successful Tasks', value: 'N/A' },
                    { label: 'Capital Managed', value: 'N/A' },
                ]);
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Polling for "Live" feel
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="dashboard" className="dashboard">
            <div className="container">
                <div className="section-header text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Operational Console</span>
                    <h2 className="mb-6">Infrastructure Control</h2>
                    <p className="text-muted">High-fidelity visualization of your autonomous revenue layer.</p>
                </div>

                <div className="dashboard-layout card">
                    <div className="dashboard-nav">
                        <div className="nav-group">
                            <span className="group-label">System State</span>
                            <div className="nav-link active">Live Execution</div>
                            <div className="nav-link">Neural Map</div>
                        </div>
                        <div className="nav-group mt-12">
                            <span className="group-label">Infrastructure</span>
                            <div className="nav-link">Compute Logs</div>
                            <div className="nav-link">Node Management</div>
                        </div>
                    </div>

                    <div className="dashboard-content">
                        <div className="content-header">
                            <div className="flex flex-col">
                                <h3 className="text-lg font-black tracking-tight">System Performance</h3>
                                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Cluster: US-EAST-01</span>
                            </div>
                            <div className="live-indicator">
                                <div className={`status-pulse-dot ${stats.length > 0 && stats[0].value !== 'Offline' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                                <span className={`live-text font-bold tracking-tight ${stats.length > 0 && stats[0].value !== 'Offline' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                    {loading ? 'CONNECTING...' : stats.length > 0 && stats[0].value !== 'Offline' ? 'ENGINE SYNCHRONIZED' : 'LEGACY MODE'}
                                </span>
                            </div>
                        </div>

                        <div className="dashboard-stats">
                            {stats.map((s, i) => (
                                <div key={i} className="mini-stat">
                                    <span className="mini-label">{s.label}</span>
                                    <span className="mini-value text-slate-900">{s.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="visualizer-container">
                            <div className="visualizer-header">
                                <span className="viz-title">Hardware Acceleration Flow</span>
                                <span className="text-[10px] font-bold text-blue-600">Syncing...</span>
                            </div>
                            <div className="bars-viz">
                                {(flowData.length > 0 ? flowData : [30, 60, 40, 80, 50, 90, 45, 70, 85, 40, 75, 55, 65, 40, 85]).map((h, i) => (
                                    <motion.div
                                        key={`${i}-${h}`}
                                        className="viz-bar"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        style={{
                                            backgroundColor: i % 3 === 0 ? 'var(--accent-primary)' : i % 3 === 1 ? 'var(--accent-secondary)' : '#E2E8F0',
                                            opacity: i % 3 === 2 ? 0.3 : 0.8
                                        }}
                                        transition={{ duration: 0.8, ease: "circOut" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
