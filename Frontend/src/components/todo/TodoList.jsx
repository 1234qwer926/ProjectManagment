import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList = ({ moduleId }) => {
    const { todos, isLoading, createTodo, updateTodo } = useTodos(moduleId);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [newTodoDate, setNewTodoDate] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodoTitle.trim()) {
            createTodo({
                title: newTodoTitle,
                due_date: newTodoDate ? `${newTodoDate}T00:00:00` : null
            });
            setNewTodoTitle('');
            setNewTodoDate('');
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            // In a real app, you'd send the new order to the backend
            // For now, we'll just handle local sorting if needed or assume optimistic updates
        }
    };

    if (isLoading) return <div>Loading tasks...</div>;

    return (
        <div className="space-y-4">
            {/* Add Todo Input */}
            <form onSubmit={handleAddTodo} className="flex gap-2">
                <Input
                    placeholder="Add a new task..."
                    className="flex-1 bg-muted/50"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <Input
                    type="date"
                    className="w-[150px] bg-muted/50 cursor-pointer"
                    value={newTodoDate}
                    onChange={(e) => setNewTodoDate(e.target.value)}
                />
                <Button type="submit" size="icon">
                    <Plus size={18} />
                </Button>
            </form>

            {/* Todo Items */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={todos.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2 relative">

                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={(status) => updateTodo({ todoId: todo.id, update: { status } })}
                                onUpdate={(update) => updateTodo({ todoId: todo.id, update })}
                            />
                        ))}

                        {todos.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                                No tasks yet. Create one above!
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default TodoList;
