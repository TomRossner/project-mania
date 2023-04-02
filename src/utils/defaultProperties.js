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

export const activityProperties = {
    created_at: new Date(),
    text: "",
    created_by: null
}

export const activityTypes = {
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

export const createActivity = (user, activityTypeText, time) => {
    const newActivity = {
        created_by: user,
        text: activityTypeText,
        created_at: time
    }
    return newActivity;
}

export const getActivityText = (userName, type, elementName, newElementName) => {
    switch(type) {
        case activityTypes.CREATE_PROJECT:
            return `created ${elementName}`;
        case activityTypes.ADD_STAGE:
            return `added a new stage to ${elementName}`;
        case activityTypes.ADD_TASK:
            return `added a new task to ${elementName}`;
        case activityTypes.ADD_MEMBER_TO_PROJECT:
            return `added ${userName} to ${elementName}`;
        case activityTypes.REMOVE_MEMBER_FROM_PROJECT:
            return `removed ${userName} from ${elementName}`;
        case activityTypes.EDIT_STAGE:
            return `changed ${elementName} to ${newElementName}`;
        case activityTypes.DELETE_STAGE:
            return `removed ${elementName}`;
        case activityTypes.DELETE_TASK:
            return `removed ${elementName} from ${newElementName}`;
        case activityTypes.MOVE_TASK:
            return `moved ${elementName} to ${newElementName}`;
        default:
            return "invalid/unhandled type";
    }
}

export const defaultNotificationProperties = {
    message: "",
    created_at: new Date()
}