export const selectProject = (state) => state.project; // Whole project's state slice

export const selectCurrentProject = (state) => state.project.currentProject;

export const selectProjectMembers = (state) => state.project.projectMembers;

export const selectTasks = (state) => state.project.tasks;

export const selectNotifications = (state) => state.project.notifications;