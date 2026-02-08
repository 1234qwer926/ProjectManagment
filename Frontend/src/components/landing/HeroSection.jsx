import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const HeroSection = ({ midgroundY, foregroundY, rotateX, scale, opacity }) => {
    const { isAuthenticated } = useAuthStore();
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

            {/* Floating Orbs - Midground */}
            <motion.div
                style={{ y: midgroundY }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-40 right-[20%] w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-60 left-[15%] w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
                />
            </motion.div>

            {/* Hero Content - Foreground */}
            <motion.div
                style={{ y: foregroundY, rotateX, scale, opacity }}
                className="container mx-auto px-4 relative z-10 perspective-1000"
            >
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-pointer backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                            Next-Gen Project Management
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]"
                    >
                        <span className="block mb-2">Build better</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient-x">
                            software faster
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        The project management tool designed specifically for developers. Manage projects, modules, and nested todos with an interface that moves as fast as you do.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                    >
                        <Button
                            size="lg"
                            className="h-16 px-10 text-lg bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-2xl shadow-primary/25 group rounded-full"
                            asChild
                        >
                            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                                {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="h-16 px-10 text-lg border-2 rounded-full hover:bg-muted backdrop-blur-sm"
                        >
                            Watch Overview
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-muted-foreground"
                >
                    <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-current rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
