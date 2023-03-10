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
    due_date: new Date().toDateString(),
    title: "New Board",
    subtitle: "",
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
    due_date: new Date().toDateString(),
    isDone: false,
    edit_active: false,
    files: [],
    description: "",
    priority: "low",
    subtitle: ""
}

export const activityProperties = {
    created_at: new Date(),
    text: "",
    subject: "",
    specified_members_names: [],
    specified_element: [],
    created_by: null
}

export const activitySubjects = {
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
    EDIT_TASK: "EDIT_TASK",
    CHECK_TASK: "CHECK_TASK",
    MOVE_TASK: "MOVE_TASK",
    UNCHECK_TASK: "UNCHECK_TASK",
    CREATE_PROJECT: "CREATE_PROJECT",
    DELETE_PROJECT: "DELETE_PROJECT",
    EDIT_PROJECT: "EDIT_PROJECT",
    ADD_MEMBER_TO_PROJECT: "ADD_MEMBER_TO_PROJECT",
    REMOVE_MEMBER_FROM_PROJECT: "REMOVE_MEMBER_FROM_PROJECT",
    ADD_STAGE: "ADD_STAGE",
    DELETE_STAGE: "DELETE_STAGE",
    EDIT_STAGE: "EDIT_STAGE",
    SEND_MESSAGE: "SEND_MESSAGE",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE"
}