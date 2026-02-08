import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const useModules = (projectId) => {
    const queryClient = useQueryClient();

    const modulesQuery = useQuery({
        queryKey: ['modules', projectId],
        queryFn: async () => {
            const { data } = await api.get(`/modules/project/${projectId}/modules`);
            return data;
        },
        enabled: !!projectId,
    });

    const createModuleMutation = useMutation({
        mutationFn: async (newModule) => {
            const { data } = await api.post('/modules/', { ...newModule, project_id: projectId });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['modules', projectId] });
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
    });

    const deleteModuleMutation = useMutation({
        mutationFn: async (moduleId) => {
            const { data } = await api.delete(`/modules/${moduleId}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['modules', projectId] });
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
    });

    const updateModuleMutation = useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            const { data } = await api.patch(`/modules/${id}`, updateData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['modules', projectId] });
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
        },
    });

    return {
        modules: modulesQuery.data || [],
        isLoading: modulesQuery.isLoading,
        createModule: createModuleMutation.mutate,
        deleteModule: deleteModuleMutation.mutate,
        updateModule: updateModuleMutation.mutate,
    };

};
