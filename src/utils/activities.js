import { getActivityText, createActivity } from "./defaultProperties";

const date = new Date();

const userDetails = (user) => {
    const {first_name, last_name, email, base64_img_data, img_url} = user;

    return {
        user_name: `${first_name} ${last_name}`,
        email,
        image: base64_img_data || img_url
    }
}

export const activity_createProject = (user) => createActivity(
    userDetails(user),
    getActivityText(null, 'CREATE_PROJECT', null, null),
    date
);

export const activity_addTask = (user, stageToDelete) => createActivity(
    userDetails(user),
    getActivityText(null, 'ADD_TASK', stageToDelete.stage_name, null),
    date
);

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