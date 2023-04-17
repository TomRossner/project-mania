export const defaultStageProperties = {
    stage_name: "New Stage",
    description: "",
    stage_tasks: [],
    created_at: new Date(),
    edit_active: false,
    options_menu_open: false,
    tasks_done: 0
}
  
export const defaultStages = [
    {...defaultStageProperties, stage_name: 'Stage #1'},
    {...defaultStageProperties, stage_name: 'Stage #2'},
    {...defaultStageProperties, stage_name: 'Stage #3'}
]
  
export const boardProperties = {
    stages: [...defaultStages],
    members: [],
    due_date: new Date().toISOString().slice(0, 10),
    title: "New Board",
    subtitle: "",
    admin_pass: "",
    admins: []
}

export const defaultTaskProperties = {
    created_at: new Date(),
    current_stage: {
        name: "",
        id: ""
    },
    project: {
        title: "",
        id: ""
    },
    title: "New Task",
    due_date: new Date().toISOString().slice(0, 10),
    isDone: false,
    edit_active: false,
    files: [],
    description: "",
    priority: "low",
    subtitle: ""
}

export const defaultNotificationProperties = {
    message: "",
    created_at: new Date()
}