import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroSection from '../components/landing/HeroSection';
import ShowcaseSection from '../components/landing/ShowcaseSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import useAuthStore from '../store/authStore';

const ParallaxLandingPage = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
    const midgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
    const foregroundY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
    const rotateX = useTransform(smoothProgress, [0, 0.2], [0, -5]);
    const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
    const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden relative">

            <motion.div
                style={{ y: backgroundY }}
                className="fixed inset-0 z-0 pointer-events-none"
            >
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
            </motion.div>

            <header className="fixed top-0 w-full border-b bg-background/70 backdrop-blur-xl z-50 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 font-bold text-xl"
                    >
                        <div className="h-10 w-10 bg-gradient-to-br from-primary to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Zap size={20} />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Project Management
                        </span>

                    </motion.div>

                    <nav className="hidden md:flex gap-8 text-sm font-medium">
                        {[
                            { name: "Features", href: "#features" },
                            { name: "Dashboard", href: "/dashboard" },
                            { name: "Settings", href: "/settings" }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-muted-foreground hover:text-foreground transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3"
                    >
                        {isAuthenticated ? (
                            <>
                                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                    className="hover:text-destructive"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                                    <Link to="/login">Sign In</Link>
                                </Button>
                                <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25" asChild>
                                    <Link to="/login">Get Started</Link>
                                </Button>
                            </>
                        )}
                    </motion.div>

                </div>
            </header>

            <HeroSection
                midgroundY={midgroundY}
                foregroundY={foregroundY}
                rotateX={rotateX}
                scale={scale}
                opacity={opacity}
            />

            <ShowcaseSection smoothProgress={smoothProgress} />

            <FeaturesSection />

            <section className="relative py-40 overflow-hidden">
                <motion.div
                    style={{ y: useTransform(smoothProgress, [0.6, 0.9], [0, -100]) }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
                </motion.div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center text-white"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Ready to ship your<br />next big thing?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                            Join developers using Project Management to manage their most ambitious projects.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="h-16 px-10 text-lg bg-white text-primary hover:bg-white/90 shadow-2xl rounded-full"
                                asChild
                            >
                                <Link to="/dashboard">Get Started Now</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="relative z-10 border-t bg-background/80 backdrop-blur-xl py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 font-bold text-xl mb-4">
                                <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple-600 text-white rounded-lg flex items-center justify-center">
                                    <Zap size={18} />
                                </div>
                                Project Management
                            </div>
                            <p className="text-muted-foreground text-sm max-w-xs">
                                Empowering developers with high-performance project management tools.
                            </p>
                        </div>

                        {[
                            { title: "Product", links: ["Features", "Dashboard", "Settings"] },
                            { title: "Stack", links: ["FastAPI", "React", "SQLAlchemy"] },
                            { title: "Legal", links: ["Privacy", "Terms"] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 className="font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="hover:text-foreground transition-colors">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© 2026 Project Management Systems. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ParallaxLandingPage;