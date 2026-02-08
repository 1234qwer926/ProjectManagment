import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from '../hooks/useProjects';
import { useUpcomingTodos } from '../hooks/useTodos';
import Layout from '../components/layout/Layout';
import AgendaSection from '../components/dashboard/AgendaSection';
import ProjectGrid from '../components/dashboard/ProjectGrid';
import CreateProjectDialog from '../components/dashboard/CreateProjectDialog';

const Dashboard = () => {
    const { projects, isLoading: projectsLoading, createProject } = useProjects();
    const { data: upcomingTodos = [], isLoading: todosLoading, updateTodo } = useUpcomingTodos();
    const [searchTerm, setSearchTerm] = useState('');
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');
    const getLocalDateString = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(getLocalDateString());


    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const groupTodosByDate = (todos) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const today = now.getTime();
        const tomorrow = today + 86400000;

        return todos.reduce((groups, todo) => {
            const dueDate = new Date(todo.due_date);
            dueDate.setHours(0, 0, 0, 0);
            const dueTime = dueDate.getTime();

            if (selectedDate) {
                const selDate = new Date(selectedDate);
                selDate.setHours(0, 0, 0, 0);
                if (dueTime !== selDate.getTime()) return groups;
            }

            let group = 'Upcoming';
            if (dueTime < today) group = 'Overdue';
            else if (dueTime === today) group = 'Today';
            else if (dueTime === tomorrow) group = 'Tomorrow';

            if (!groups[group]) groups[group] = [];
            groups[group].push(todo);
            return groups;
        }, {});
    };

    const groupedTodos = groupTodosByDate(upcomingTodos);
    const groupOrder = ['Overdue', 'Today', 'Tomorrow', 'Upcoming'];

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateProject = () => {
        if (newProjectName.trim()) {
            createProject({ name: newProjectName, description: newProjectDesc });
            setNewProjectName('');
            setNewProjectDesc('');
            setIsDialogOpen(false);
        }
    };

    return (
        <Layout>
            <div className="p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                            <p className="text-muted-foreground">Manage your developer projects and modules</p>
                        </div>

                        <CreateProjectDialog
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            newProjectName={newProjectName}
                            setNewProjectName={setNewProjectName}
                            newProjectDesc={newProjectDesc}
                            setNewProjectDesc={setNewProjectDesc}
                            handleCreateProject={handleCreateProject}
                        />
                    </div>

                    {/* Agenda Section */}
                    <AgendaSection
                        upcomingTodos={upcomingTodos}
                        todosLoading={todosLoading}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        updateTodo={updateTodo}
                        groupedTodos={groupedTodos}
                        groupOrder={groupOrder}
                    />

                    {/* Filters/Search */}
                    <div className="flex gap-4 items-center bg-card/50 p-4 rounded-xl border backdrop-blur-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                placeholder="Search projects..."
                                className="pl-10 bg-background/50 border-none ring-1 ring-border focus-visible:ring-primary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter size={18} />
                        </Button>
                    </div>

                    {/* Project Grid */}
                    <ProjectGrid
                        projectsLoading={projectsLoading}
                        filteredProjects={filteredProjects}
                    />
                </div>
            </div>
        </Layout >
    );
};

export default Dashboard;

