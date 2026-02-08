import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Users, ShieldCheck, Badge, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeaturesSection = () => {
    const features = [
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Module Breakdown",
            description: "Organize projects by area: Frontend, Backend, Deployment, and API. Keep your focus where it matters most.",
            gradient: "from-blue-500 to-cyan-500",
            align: "left"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Task Priority",
            description: "Never lose track of what's critical. Status-based workflows (Todo, In-Progress, Blocked, Done) keep you moving forward.",
            gradient: "from-purple-500 to-pink-500",
            align: "right"
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Robust Backend",
            description: "Powered by FastAPI and SQLAlchemy, your data is safe, synced, and always available via our high-performance API.",
            gradient: "from-orange-500 to-red-500",
            align: "left"
        }
    ];

    return (
        <section id="features" className="relative py-32">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center px-4 py-1 rounded-full border mb-4 text-xs font-medium uppercase tracking-wider">
                        Capabilities
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for scale</h2>
                    <p className="text-lg text-muted-foreground">
                        Tools designed to handle everything from personal scripts to production-grade SaaS products.
                    </p>
                </div>

                <div className="space-y-32">
                    {features.map((feature, i) => (
                        <FeatureRow key={i} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeatureRow = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isLeft = feature.align === "left";

    return (
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`space-y-6 ${!isLeft ? "lg:order-2" : ""}`}
            >
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                    {feature.icon}
                </div>
                <h3 className="text-3xl font-bold">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                </p>
                <Button variant="ghost" className="group">
                    Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`relative ${!isLeft ? "lg:order-1" : ""}`}
            >
                <div className={`absolute -inset-4 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-3xl blur-2xl`} />
                <Card className="relative border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-8">
                        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                            <div className={`h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-20 animate-pulse`} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default FeaturesSection;
