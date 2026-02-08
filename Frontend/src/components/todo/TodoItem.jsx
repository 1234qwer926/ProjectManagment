import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircle2, Circle, GripVertical, MoreHorizontal, Clock, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TodoItem = ({ todo, onToggle, onUpdate }) => {
    const [isEditingDate, setIsEditingDate] = useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    const priorityColors = {
        low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        critical: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        onUpdate({ due_date: newDate ? `${newDate}T00:00:00` : null });
        setIsEditingDate(false);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group flex items-center gap-3 p-4 bg-card border rounded-xl hover:shadow-sm transition-all",
                todo.status === 'done' && "bg-muted/30 opacity-70"
            )}
        >
            <div {...attributes} {...listeners} className="cursor-grab text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                <GripVertical size={18} />
            </div>

            <button
                onClick={() => onToggle(todo.status === 'done' ? 'todo' : 'done')}
                className="text-muted-foreground hover:text-primary transition-colors"
            >
                {todo.status === 'done' ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                ) : (
                    <Circle size={20} />
                )}
            </button>

            <div className="flex-1 min-w-0">
                <h4 className={cn(
                    "font-medium truncate",
                    todo.status === 'done' && "line-through text-muted-foreground"
                )}>
                    {todo.title}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className={cn("text-[10px] uppercase h-5", priorityColors[todo.priority])}>
                        {todo.priority}
                    </Badge>

                    {isEditingDate ? (
                        <Input
                            type="date"
                            className="h-6 w-32 text-[10px] p-1 bg-muted"
                            autoFocus
                            onBlur={() => setIsEditingDate(false)}
                            onChange={handleDateChange}
                            defaultValue={todo.due_date ? todo.due_date.split('T')[0] : ''}
                        />
                    ) : (
                        <div
                            onClick={() => setIsEditingDate(true)}
                            className={cn(
                                "flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded cursor-pointer hover:bg-muted transition-colors",
                                (() => {
                                    if (!todo.due_date) return "text-muted-foreground border border-dashed";
                                    const dueDate = new Date(todo.due_date);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const isOverdue = dueDate < today && todo.status !== 'done';
                                    const isToday = dueDate.toDateString() === new Date().toDateString();
                                    return isOverdue ? "bg-red-500/10 text-red-500" :
                                        isToday ? "bg-green-500/10 text-green-500" :
                                            "text-muted-foreground";
                                })()
                            )}
                        >
                            {todo.due_date ? <Clock size={12} /> : <Calendar size={12} />}
                            {todo.due_date ? (
                                new Date(todo.due_date).toDateString() === new Date().toDateString() ? "Today" : new Date(todo.due_date).toLocaleDateString()
                            ) : "Set date"}
                        </div>
                    )}

                    {todo.tags?.map(tag => (
                        <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>
                    ))}
                </div>
            </div>

            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={18} />
            </Button>
        </div>
    );
};

export default TodoItem;
