import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, MoreVertical, Archive, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useProjects } from '../../hooks/useProjects';

const ProjectGrid = ({ projectsLoading, filteredProjects }) => {
    const { deleteProject } = useProjects();

    const handleDelete = (e, projectId) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            deleteProject(projectId);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <LayoutDashboard size={20} className="text-primary" />
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsLoading ? (
                    Array(6).fill(0).map((_, i) => (
                        <Card key={i} className="animate-pulse h-[200px] bg-muted/50" />
                    ))
                ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="group hover:border-primary/50 transition-all shadow-sm hover:shadow-md bg-card/50 backdrop-blur-sm">
                                <Link to={`/project/${project.id}`}>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-xl font-bold truncate pr-4">
                                            {project.name}
                                        </CardTitle>
                                        <div onClick={(e) => e.preventDefault()}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={(e) => handleDelete(e, project.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Project
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <CardDescription className="line-clamp-2 min-h-[40px]">
                                            {project.description || "No description provided."}
                                        </CardDescription>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="capitalize">
                                                {project.status}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(project.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-muted-foreground text-lg">No projects found. Create your first project to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectGrid;
