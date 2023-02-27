export const selectProject = (state) => state.project; // Whole project's state slice

export const selectCurrentProject = (state) => state.project.currentProject;

export const selectUserProjects = (state) => state.project.boards;

export const selectAvailableMembers = (state) => state.project.availableMembers;

export const selectProjectMembers = (state) => state.project.projectMembers;