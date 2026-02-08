import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';


export const useProjects = () => {
    const queryClient = useQueryClient();

    const projectsQuery = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await api.get('/projects/');
            return data;
        },
    });

    const createProjectMutation = useMutation({
        mutationFn: async (newProject) => {
            const { data } = await api.post('/projects/', newProject);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });

    const updateProjectMutation = useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            const { data } = await api.patch(`/projects/${id}`, updateData);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['project', data.id] });
        },
    });

    return {
        projects: projectsQuery.data || [],
        isLoading: projectsQuery.isLoading,
        createProject: createProjectMutation.mutate,
        updateProject: updateProjectMutation.mutate,
    };

};

export const useProject = (projectId) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: async () => {
            const { data } = await api.get(`/projects/${projectId}`);
            return data;
        },
        enabled: !!projectId,
    });
};
