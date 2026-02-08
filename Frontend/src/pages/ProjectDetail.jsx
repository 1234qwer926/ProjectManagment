import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Settings,
    Plus,
    Layout as LayoutIcon,
    Code,
    Server,
    Globe,
    PlusCircle,
    MoreVertical,
    CheckCircle2,
    Circle,
    Clock,
    AlertCircle,
    Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useProject, useProjects } from '../hooks/useProjects';

import { useModules } from '../hooks/useModules';
import TodoList from '../components/todo/TodoList';
import Layout from '../components/layout/Layout';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: project, isLoading: projectLoading } = useProject(id);
    const { updateProject, deleteProject } = useProjects();
    const { modules, isLoading: modulesLoading, createModule, deleteModule, updateModule } = useModules(id);

    const [isEditingProject, setIsEditingProject] = useState(false);
    const [editProjectName, setEditProjectName] = useState('');

    const [editingModuleId, setEditingModuleId] = useState(null);
    const [editModuleTitle, setEditModuleTitle] = useState('');
    const [editModuleDesc, setEditModuleDesc] = useState('');

    const handleDeleteProject = () => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone and all associated modules and tasks will be removed.')) {
            deleteProject(id);
            navigate('/dashboard');
        }
    };

    const handleSaveProjectName = () => {
        if (editProjectName.trim() && editProjectName !== project.name) {
            updateProject({ id: project.id, name: editProjectName });
        }
        setIsEditingProject(false);
    };

    const handleSaveModule = (moduleId) => {
        if (editModuleTitle.trim()) {
            updateModule({ id: moduleId, title: editModuleTitle, description: editModuleDesc });
        }
        setEditingModuleId(null);
    };

    if (projectLoading) return <div className="p-8">Loading project...</div>;
    if (!project) return <div className="p-8">Project not found</div>;

    const moduleIcons = {
        frontend: <Code size={18} />,
        backend: <Server size={18} />,
        deployment: <Globe size={18} />,
        custom: <LayoutIcon size={18} />,
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link to="/dashboard">
                                <ArrowLeft size={20} />
                            </Link>
                        </Button>
                        {isEditingProject ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={editProjectName}
                                    onChange={(e) => setEditProjectName(e.target.value)}
                                    className="text-2xl font-bold h-10 w-64 bg-background/50"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveProjectName()}
                                    onBlur={handleSaveProjectName}
                                />
                            </div>
                        ) : (
                            <h1
                                className="text-3xl font-bold cursor-pointer hover:text-primary transition-colors"
                                onClick={() => {
                                    setEditProjectName(project.name);
                                    setIsEditingProject(true);
                                }}
                            >
                                {project.name}
                            </h1>
                        )}
                        <Badge variant="outline" className="capitalize">{project.status}</Badge>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                        onClick={handleDeleteProject}
                    >
                        <Trash2 size={18} />
                        Delete Project
                    </Button>
                </div>

                <Tabs defaultValue={modules[0]?.id || "add-module"} className="space-y-8">
                    <div className="flex items-center justify-between">
                        <TabsList className="bg-muted/50 p-1">
                            {modules.map(module => (
                                <TabsTrigger
                                    key={module.id}
                                    value={module.id}
                                    className="gap-2 data-[state=active]:bg-background"
                                >
                                    {moduleIcons[module.type] || <LayoutIcon size={18} />}
                                    {module.title}
                                </TabsTrigger>
                            ))}
                            <TabsTrigger value="add-module" className="text-primary font-medium gap-2">
                                <Plus size={16} />
                                Add Module
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {modules.map(module => (
                        <TabsContent key={module.id} value={module.id}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="grid grid-cols-1 lg:grid-cols-4 gap-8"
                            >

                                {/* Module Content */}
                                <div className="lg:col-span-3 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1 mr-4">
                                            {editingModuleId === module.id ? (
                                                <div className="space-y-2">
                                                    <Input
                                                        value={editModuleTitle}
                                                        onChange={(e) => setEditModuleTitle(e.target.value)}
                                                        className="text-2xl font-bold h-10 bg-background/50"
                                                        autoFocus
                                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveModule(module.id)}
                                                    />
                                                    <Input
                                                        value={editModuleDesc}
                                                        onChange={(e) => setEditModuleDesc(e.target.value)}
                                                        placeholder="Add a description..."
                                                        className="text-muted-foreground h-8 bg-background/50"
                                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveModule(module.id)}
                                                        onBlur={() => handleSaveModule(module.id)}
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="group cursor-pointer"
                                                    onClick={() => {
                                                        setEditModuleTitle(module.title);
                                                        setEditModuleDesc(module.description || '');
                                                        setEditingModuleId(module.id);
                                                    }}
                                                >
                                                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                                                        {module.title}
                                                    </h2>
                                                    <p className="text-muted-foreground">{module.description || "Manage your todos for this module."}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">AI Generate Tasks</Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setEditModuleTitle(module.title);
                                                            setEditModuleDesc(module.description || '');
                                                            setEditingModuleId(module.id);
                                                        }}
                                                    >
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        Edit Module
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem

                                                        className="text-destructive"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this module?')) {
                                                                deleteModule(module.id);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Module
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>

                                    <TodoList moduleId={module.id} />
                                </div>

                                {/* Sidebar stats/info */}
                                <div className="space-y-6">
                                    <Card className="bg-card/50">
                                        <CardHeader>
                                            <CardTitle className="text-sm font-medium">Module Status</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Total Tasks</span>
                                                <span className="font-bold">{module.todos?.length || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">Completed</span>
                                                <span className="font-bold text-green-500">
                                                    {module.todos?.filter(t => t.status === 'done').length || 0}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        </TabsContent>
                    ))}

                    <TabsContent value="add-module">
                        <Card className="max-w-xl mx-auto border-dashed">
                            <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                <PlusCircle size={48} className="text-muted-foreground" />
                                <div>
                                    <h3 className="text-xl font-bold">Add New Module</h3>
                                    <p className="text-muted-foreground">Choose a module type to get started</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                                    {['Frontend', 'Backend', 'Deployment', 'Custom'].map(type => (
                                        <Button
                                            key={type}
                                            variant="outline"
                                            className="h-20 flex flex-col gap-2"
                                            onClick={() => createModule({ title: type, type: type.toLowerCase() })}
                                        >
                                            {moduleIcons[type.toLowerCase()]}
                                            {type}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>

    );
};

export default ProjectDetail;
