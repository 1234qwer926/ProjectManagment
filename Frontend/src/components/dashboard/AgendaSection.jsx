import React from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

const AgendaSection = ({
    upcomingTodos,
    todosLoading,
    selectedDate,
    setSelectedDate,
    updateTodo,
    groupedTodos,
    groupOrder
}) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    Your Agenda
                </h2>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-muted/30 p-1.5 rounded-lg border">
                        <Input
                            type="date"
                            className="h-8 w-[140px] bg-transparent border-none focus-visible:ring-0 text-xs"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        {selectedDate && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-[10px] px-2"
                                onClick={() => setSelectedDate('')}
                            >
                                View All
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {upcomingTodos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {groupOrder.map(group => groupedTodos[group] && groupedTodos[group].length > 0 && (
                        <Card key={group} className="bg-card/30 backdrop-blur-sm border-none ring-1 ring-border/50 overflow-hidden">
                            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center ${group === 'Overdue' ? 'bg-destructive/10 text-destructive' :
                                group === 'Today' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                }`}>
                                {group}
                                <Badge variant="outline" className="text-[10px] border-none bg-background/50">
                                    {groupedTodos[group].length}
                                </Badge>
                            </div>
                            <div className="h-[250px] overflow-y-auto custom-scrollbar">
                                <div className="p-3 space-y-3">
                                    {groupedTodos[group].map(todo => (
                                        <div key={todo.id} className="group/item p-3 rounded-lg bg-background/50 ring-1 ring-border hover:ring-primary/30 transition-all">
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex items-start gap-2 flex-1 min-w-0">
                                                    <button
                                                        onClick={() => updateTodo({
                                                            todoId: todo.id,
                                                            update: { status: todo.status === 'done' ? 'todo' : 'done' }
                                                        })}
                                                        className="mt-0.5 text-muted-foreground hover:text-primary transition-colors shrink-0"
                                                    >
                                                        {todo.status === 'done' ? (
                                                            <CheckCircle2 className="text-green-500" size={16} />
                                                        ) : (
                                                            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 hover:border-primary/50" />
                                                        )}
                                                    </button>
                                                    <h4 className={cn(
                                                        "text-sm font-semibold truncate",
                                                        todo.status === 'done' && "line-through text-muted-foreground"
                                                    )}>
                                                        {todo.title}
                                                    </h4>
                                                </div>
                                                {todo.priority === 'critical' && (
                                                    <div className="w-2 h-2 rounded-full bg-destructive shrink-0" />
                                                )}
                                            </div>
                                            <Link to={`/project/${todo.project_id}`} className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                                                <span className="font-medium text-primary/70">{todo.project_name}</span>
                                                <span>/</span>
                                                <span className="truncate">{todo.module_title}</span>
                                            </Link>
                                            {todo.due_date && (
                                                <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                                                    <Clock size={10} />
                                                    {new Date(todo.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                    {selectedDate && Object.values(groupedTodos).every(g => g.length === 0) && (
                        <div className="col-span-full py-10 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                            No tasks found for this date.
                        </div>
                    )}
                </div>
            ) : !todosLoading && (
                <div className="py-10 text-center text-muted-foreground border-2 border-dashed rounded-lg bg-card/10">
                    No upcoming tasks.
                </div>
            )}
        </div>
    );
};

export default AgendaSection;
