import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutDashboard, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthStore from '../../store/authStore';

const Navbar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuthStore();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Settings', href: '/settings', icon: <SettingsIcon size={18} /> },
    ];

    return (
        <header className="border-b bg-background/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                    <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple-600 text-white rounded-lg flex items-center justify-center shadow-md">
                        <Zap size={16} />
                    </div>
                    <span className="hidden sm:inline-block">Project Management</span>
                </Link>

                <nav className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <Button
                            key={item.name}
                            variant={location.pathname === item.href ? "secondary" : "ghost"}
                            size="sm"
                            className={cn(
                                "gap-2",
                                location.pathname === item.href ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground"
                            )}
                            asChild
                        >
                            <Link to={item.href}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                        <Link to="/">Home</Link>
                    </Button>
                    {isAuthenticated && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="text-muted-foreground hover:text-destructive flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
