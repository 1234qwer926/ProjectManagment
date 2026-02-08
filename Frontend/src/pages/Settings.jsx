import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Download, Upload, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import useUIStore from '../store/uiStore';
import Layout from '../components/layout/Layout';
import api from '../lib/api';
import { useQueryClient } from '@tanstack/react-query';

const Settings = () => {
    const { isDarkMode, toggleDarkMode } = useUIStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleExport = async () => {
        try {
            const { data: projects } = await api.get('/projects/');
            const fullData = [];

            for (const project of projects) {
                const { data: details } = await api.get(`/projects/${project.id}`);
                fullData.push(details);
            }

            const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `project-data-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success('Data exported successfully');
        } catch (error) {
            console.error('Export failed:', error);
            toast.error('Export failed');
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (!Array.isArray(data)) throw new Error('Invalid format');

                for (const projectData of data) {
                    // Create Project
                    const { data: newProject } = await api.post('/projects/', {
                        name: projectData.name,
                        description: projectData.description,
                        status: projectData.status
                    });

                    // Create Modules
                    if (projectData.modules) {
                        for (const moduleData of projectData.modules) {
                            const { data: newModule } = await api.post('/modules/', {
                                project_id: newProject.id,
                                title: moduleData.title,
                                description: moduleData.description,
                                type: moduleData.type,
                                order: moduleData.order
                            });

                            // Create Todos
                            if (moduleData.todos) {
                                for (const todoData of moduleData.todos) {
                                    await api.post('/todos/', {
                                        module_id: newModule.id,
                                        title: todoData.title,
                                        description: todoData.description,
                                        priority: todoData.priority,
                                        status: todoData.status,
                                        due_date: todoData.due_date,
                                        order: todoData.order,
                                        tags: todoData.tags
                                    });
                                }
                            }
                        }
                    }
                }

                queryClient.invalidateQueries();
                toast.success('Data imported successfully');
                navigate('/dashboard');
            } catch (error) {
                console.error('Import failed:', error);
                toast.error('Import failed: ' + error.message);
            }
        };
        reader.readAsText(file);
    };

    const handleDeleteAll = async () => {
        if (!confirm('Are you sure you want to delete all projects? This action cannot be undone.')) return;

        try {
            await api.delete('/projects/bulk/all');
            queryClient.invalidateQueries();
            toast.success('All projects deleted');
            navigate('/dashboard');
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete projects');
        }
    };

    return (
        <Layout>
            <div className="p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link to="/dashboard">
                                <ArrowLeft size={20} />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Settings</h1>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize how the application looks for you.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                                        <div>
                                            <p className="font-medium">Dark Mode</p>
                                            <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                                        </div>
                                    </div>
                                    <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Data Management</CardTitle>
                                <CardDescription>Export or import your project data.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 gap-2" onClick={handleExport}>
                                        <Download size={18} />
                                        Export Data
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2" onClick={() => fileInputRef.current?.click()}>
                                        <Upload size={18} />
                                        Import Data
                                    </Button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".json"
                                        onChange={handleImport}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive/20">
                            <CardHeader>
                                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                                <CardDescription>Irreversible actions for your account data.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="destructive" className="gap-2" onClick={handleDeleteAll}>
                                    <Trash2 size={18} />
                                    Delete All Projects
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;

