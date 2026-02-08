import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';


export const useTodos = (moduleId) => {
    const queryClient = useQueryClient();

    const todosQuery = useQuery({
        queryKey: ['todos', moduleId],
        queryFn: async () => {
            const { data } = await api.get(`/todos/module/${moduleId}/todos`);
            return data;
        },
        enabled: !!moduleId,
    });

    const createTodoMutation = useMutation({
        mutationFn: async (newTodo) => {
            const { data } = await api.post('/todos/', { ...newTodo, module_id: moduleId });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', moduleId] });
            queryClient.invalidateQueries({ queryKey: ['todos', 'upcoming'] });
            queryClient.invalidateQueries({ queryKey: ['modules'] });
            queryClient.invalidateQueries({ queryKey: ['project'] });
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: async ({ todoId, update }) => {
            const { data } = await api.patch(`/todos/${todoId}`, update);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', moduleId] });
            queryClient.invalidateQueries({ queryKey: ['todos', 'upcoming'] });
            queryClient.invalidateQueries({ queryKey: ['modules'] });
            queryClient.invalidateQueries({ queryKey: ['project'] });
        },
    });

    return {
        todos: todosQuery.data || [],
        isLoading: todosQuery.isLoading,
        createTodo: createTodoMutation.mutate,
        updateTodo: updateTodoMutation.mutate,
    };
};

export const useUpcomingTodos = () => {
    const queryClient = useQueryClient();

    const upcomingTodosQuery = useQuery({
        queryKey: ['todos', 'upcoming'],
        queryFn: async () => {
            const { data } = await api.get('/todos/upcoming');
            return data;
        }
    });

    const updateTodoMutation = useMutation({
        mutationFn: async ({ todoId, update }) => {
            const { data } = await api.patch(`/todos/${todoId}`, update);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            queryClient.invalidateQueries({ queryKey: ['modules'] });
            queryClient.invalidateQueries({ queryKey: ['project'] });
        },
    });

    return {
        data: upcomingTodosQuery.data || [],
        isLoading: upcomingTodosQuery.isLoading,
        updateTodo: updateTodoMutation.mutate,
    };
};

