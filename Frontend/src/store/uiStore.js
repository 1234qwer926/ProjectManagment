import { create } from 'zustand';

const useUIStore = create((set) => ({
    isDarkMode: true,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    activeProjectId: null,
    setActiveProjectId: (id) => set({ activeProjectId: id }),
}));

export default useUIStore;
