import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Zap, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const ShowcaseSection = ({ smoothProgress }) => {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content - Moves faster */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                            <Zap className="w-4 h-4" />
                            Developer-First
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Focused execution, <br />
                            <span className="text-muted-foreground">minimal clutter</span>
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Stop fighting your tools. Project Management provides a clean, fast interface for managing complex software projects without the overhead of enterprise bloat.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Hierarchical project and module structure",
                                "Nested todo lists with priority tracking",
                                "Keyboard-first navigation and shortcuts"
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Image - Parallax Speed Difference */}
                    <div className="relative h-[600px]">
                        {/* Background Card - Slower */}
                        <motion.div
                            style={{ y: useTransform(smoothProgress, [0.1, 0.4], [100, -50]) }}
                            className="absolute top-20 -left-10 w-80 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl"
                        />

                        {/* Main Dashboard - Normal Speed */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 mx-4 flex justify-center">
                                    <div className="px-3 py-1 bg-background rounded-md text-xs text-muted-foreground flex items-center gap-2">
                                        <ShieldCheck className="w-3 h-3" />
                                        app.projectmanagement.com
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    {[65, 40, 85].map((h, i) => (
                                        <div key={i} className="h-24 bg-muted rounded-lg relative overflow-hidden">
                                            <div className="absolute bottom-0 left-0 right-0 bg-primary/20" style={{ height: `${h}%` }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="h-48 bg-muted rounded-lg flex items-end justify-between p-4 gap-2">
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <div key={i} className="flex-1 bg-primary rounded-t-sm transition-all hover:bg-purple-500" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Stats Card - Faster */}
                        <motion.div
                            style={{ y: useTransform(smoothProgress, [0.1, 0.4], [50, -100]) }}
                            className="absolute -bottom-10 -right-10 bg-card border border-border p-6 rounded-2xl shadow-2xl z-20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">100%</p>
                                    <p className="text-sm text-muted-foreground">Project health score</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
