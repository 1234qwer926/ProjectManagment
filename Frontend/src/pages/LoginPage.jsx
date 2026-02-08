import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from 'sonner';
import useAuthStore from '../store/authStore';
import api from '@/lib/api';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/login', { username, password });

            login(data.access_token);
            toast.success('Successfully logged in!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            const message = error.response?.data?.detail || 'Invalid credentials';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 font-bold text-2xl">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                            <Zap size={20} />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            Project Management
                        </span>
                    </div>
                </div>

                <Card className="border-none ring-1 ring-border/50 bg-card/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your projects
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        className="pl-10 h-12 bg-background/50 border-none ring-1 ring-border focus-visible:ring-primary"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="pl-10 h-12 bg-background/50 border-none ring-1 ring-border focus-visible:ring-primary"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25 transition-all group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-muted-foreground px-8">
                    By continuing, you agree to our terms and conditions.
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
