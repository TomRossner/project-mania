export const selectProject = (state) => state.project; // Whole project's state slice

export const selectCurrentProject = (state) => state.project.currentProject;

export const selectProjectMembers = (state) => state.project.projectMembers;

export const selectBoards = (state) => state.project.boards;

export const selectActivity = (state) => state.project.activity;

export const selectIsUpdating = (state) => state.project.isUpdating;