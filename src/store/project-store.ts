import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectState {
  projects: Project[];
  currentProjectId: string | null;
  currentProject: Project | null;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string | null) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [],
      currentProjectId: null,
      currentProject: null,

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
          currentProjectId: project.id,
          currentProject: project,
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
          currentProject:
            state.currentProject?.id === id
              ? { ...state.currentProject, ...updates, updatedAt: new Date() }
              : state.currentProject,
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProjectId:
            state.currentProjectId === id ? null : state.currentProjectId,
          currentProject:
            state.currentProject?.id === id ? null : state.currentProject,
        })),

      setCurrentProject: (id) =>
        set((state) => ({
          currentProjectId: id,
          currentProject: id
            ? state.projects.find((p) => p.id === id) || null
            : null,
        })),
    }),
    {
      name: 'silvercalc-storage',
      partialize: (state) => ({
        projects: state.projects,
        currentProjectId: state.currentProjectId,
      }),
    }
  )
);