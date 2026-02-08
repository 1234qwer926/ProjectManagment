import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

const CreateProjectDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    newProjectName,
    setNewProjectName,
    newProjectDesc,
    setNewProjectDesc,
    handleCreateProject
}) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="gap-2 bg-primary hover:opacity-90">
                    <Plus size={20} />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Name</label>
                        <Input
                            placeholder="e.g. AI Trading Bot"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            placeholder="Briefly describe the project..."
                            value={newProjectDesc}
                            onChange={(e) => setNewProjectDesc(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCreateProject}>Create Project</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectDialog;
