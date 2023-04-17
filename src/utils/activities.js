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
    };

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

const date = new Date();

const userDetails = (user) => {
    const {first_name, last_name, email, base64_img_data, img_url} = user;

    return {
        user_name: `${first_name} ${last_name}`,
        email,
        image: base64_img_data || img_url
    }
}

export const activity_createProject = (user, project) => {

    return createActivity(
        userDetails(user),
        getActivityText(null, 'CREATE_PROJECT', project.title, null),
        date
    );
}

export const activity_addTask = (user, stageToDelete) => {
    
    return createActivity(
        userDetails(user),
        getActivityText(null, 'ADD_TASK', stageToDelete.stage_name, null),
        date
    );
}

export const activity_createStage = (user, project) => {

    return createActivity(
        userDetails(user),
        getActivityText(null, 'ADD_STAGE', project.title, null),
        date
    );
}

export const activity_createBoard = (user, values) => {

    return createActivity(
        userDetails(user),
        getActivityText(null, 'CREATE_PROJECT', values.title, null),
        date
    );
}

export const activity_deleteTask = (user, task) => {

    return createActivity(
        userDetails(user),
        getActivityText(null, 'DELETE_TASK', task.title, task.current_stage.name),
        date
    );
}

export const activity_deleteStage = (user, stageToDelete) => {
    
    return createActivity(
        userDetails(user),
        getActivityText(null, 'DELETE_STAGE', stageToDelete.stage_name, null),
        date
    );
}

export const activity_addMember = (user, member, project) => {

    return createActivity(
        userDetails(user),
        getActivityText(member.first_name, 'ADD_MEMBER', project.title, null),
        date
    );
}

export const activity_editStageName = (user, stageToUpdate, inputValue) => {

    return createActivity(
        userDetails(user),
        getActivityText(null, 'EDIT_STAGE', stageToUpdate.stage_name, inputValue),
        date
    );
}

export const activity_removeMember = (user, memberToRemove, project) => {

    return createActivity(
        userDetails(user),
        getActivityText(memberToRemove.first_name, 'REMOVE_MEMBER_FROM_PROJECT', project.title, null),
        date
    );
}

export const activity_moveTask = (user, task, stageToMoveTaskTo) => {

    return createActivity(
        userDetails(user),
        getActivityText(null, 'MOVE_TASK', task.title, stageToMoveTaskTo.stage_name),
        date
    );
}