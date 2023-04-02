import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoards } from "../store/boards/boards.selector";
import { selectActivity, selectCurrentProject, selectProjectMembers } from "../store/project/project.selector";
import { updateProject, deleteProject } from "../httpRequests/http.project";
import { useNavigate } from "react-router-dom";
import { setBoards } from "../store/boards/boards.actions";
import {deleteTask, addProject} from "../httpRequests/http.project";
import {getUserInfo} from "../httpRequests/http.auth";
import { selectMembers } from "../store/members/members.selector";
import useAuth from "./useAuth";
import { generateId } from "../utils/IdGenerator";
import {
    setTasks,
    setNotificationTabOpen,
    setProfileTabOpen,
    setCreatePopupOpen,
    setElement,
    setProjectMenuOpen,
    setStage,
    setError,
    setErrorPopupOpen,
    setTaskPriority,
    setAdminPassFormOpen,
    setNotifications
} from "../store/globalStates/globalStates.actions";
import { setCurrentProject, setProjectMembers } from "../store/project/project.actions";
import {selectGlobalStates} from "../store/globalStates/globalStates.selector";
import { getActivityText, createActivity } from "../utils/defaultProperties";

const useProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentProject = useSelector(selectCurrentProject);
    const boards = useSelector(selectBoards);
    const projectMembers = useSelector(selectProjectMembers);
    const members = useSelector(selectMembers);
    const activity = useSelector(selectActivity);
    const {user, userInfo, setUserInfo} = useAuth();
    const {
        element,
        projectMenuOpen,
        profileTabOpen,
        notificationTabOpen,
        createPopupOpen,
        stage,
        projectMenuTabOpen,
        error,
        errorPopupOpen,
        taskPriority,
        tasks,
        adminFormOpen,
        notifications
    } = useSelector(selectGlobalStates);

    const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));

    const handleCreateBoard = () => {
        dispatch(setCreatePopupOpen(true));
        dispatch(setElement("board"));
    }

    const handleCreate = (type) => {
        closeStageOptionMenus();
        dispatch(setElement(type));
        dispatch(setCreatePopupOpen(true));
    }

    const handleRemoveMemberFromProject = (id) => {
        if (!id) return;
        const memberToRemove = projectMembers.find(member => member._id === id);
        if (!memberToRemove) throw new Error("Member not found");

        const removeMemberActivity = createActivity(
            {
                user_name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email,
                image: userInfo.base64_img_data || userInfo.img_url
            },
            getActivityText(memberToRemove.first_name, 'REMOVE_MEMBER_FROM_PROJECT', currentProject.title, null),
            new Date()
        );

        dispatch(setProjectMembers(projectMembers.filter(member => member._id !== memberToRemove._id)));
        dispatch(setCurrentProject({...currentProject, activity: [...currentProject.activity, removeMemberActivity]}));
    }

    const handleCreateClick = () => {
        dispatch(setCreatePopupOpen(!createPopupOpen));
        if (projectMenuOpen) dispatch(setProjectMenuOpen(false));
        if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
        if (profileTabOpen) dispatch(setProfileTabOpen(false));
    }

    const validate = (inputValue, stageToUpdate) => {
        if (!inputValue || !stageToUpdate) return;

        const editStageNameActivity = createActivity(
            {
                user_name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email,
                image: userInfo.base64_img_data || userInfo.img_url
            },
            getActivityText(null, 'EDIT_STAGE', stageToUpdate.stage_name, inputValue),
            new Date()
        );

        return dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(stage => {
                if (stage._id === stageToUpdate._id) {
                    return {...stage, stage_name: inputValue, edit_active: false, stage_tasks: [...stage.stage_tasks.map(task => {
                        return {...task, current_stage: {...task.current_stage, name: inputValue}};
                    })]};
                } else return stage;
            })],
            activity: [...currentProject.activity, editStageNameActivity]}));
    }

    const handleToggleProfileTab = () => {
        dispatch(setProfileTabOpen(!profileTabOpen));
        if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
    }

    const handleProjectsClick = () => {
        closeCreatePopup();
        if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
        if (profileTabOpen) dispatch(setProfileTabOpen(false));
    }

    const handleToggleNotificationTab = () => {
        dispatch(setNotificationTabOpen(!notificationTabOpen));
        if (profileTabOpen) dispatch(setProfileTabOpen(false));
    }

    const update = async (project) => {
        if (!project) {
            dispatch(setError("No project to update"));
            dispatch(setErrorPopupOpen(true));
            return;
        }
    
        try {
            await updateProject(project);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddStage = () => {
        dispatch(setCreatePopupOpen(true));
        dispatch(setProjectMenuOpen(false));
        dispatch(setElement("stage"));
    }

    const handleDeleteProject = async (id) => {
        await deleteProject(id);
        dispatch(setCurrentProject(null));
        dispatch(setBoards([...boards.filter(board => board._id !== currentProject._id)]));
        navigate("/");
    }

    const handleMenuClick = () => {
        dispatch(setProjectMenuOpen(!projectMenuTabOpen));
    }

    const handleAddMember = (member) => {
        if (!member) return;

        const MemberAlreadyAdded = projectMembers.find(m => m._id === member._id);
        if (MemberAlreadyAdded) return;

        const addMemberActivity = createActivity({
            user_name: `${userInfo.first_name} ${userInfo.last_name}`,
            email: userInfo.email, image: userInfo.base64_img_data || userInfo.img_url
        },
        getActivityText(member.first_name, 'ADD_MEMBER', currentProject.title, null),
        new Date());

        dispatch(setCurrentProject({...currentProject, members: [...currentProject.members, member], activity: [...currentProject.activity, addMemberActivity]}));
    }

    const handleElementClick = (element) => {
        dispatch(setElement(element));
    }

    const closeStageOptionMenus = () => {
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open) {
                return {...stage, options_menu_open: false};
            } else return stage;
        })]}));
    }

    const handleAddTask = (stageToAddTaskTo) => {
        closeStageOptionMenus();
        dispatch(setStage(stageToAddTaskTo));
        dispatch(setCreatePopupOpen(true));
        dispatch(setElement("task"));
    }

    const toggleStageOptions = (stageToUpdate) => {
        if (!stageToUpdate) return;

        const updatedStage = {...stageToUpdate, options_menu_open: !stageToUpdate.options_menu_open}
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open && stage._id !== stageToUpdate._id) {
                return {...stage, options_menu_open: false};
            }
            else if (!stage.options_menu_open && stage._id !== stageToUpdate._id) {
                return stage;
            }
            else return updatedStage;
        })]}));
    }

    const handleDeleteStage = (stageToDelete) => {
        if (!stageToDelete) return;

        closeStageOptionMenus();

        const deleteStageActivity = createActivity(
            {
                user_name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email, image: userInfo.base64_img_data || userInfo.img_url
            },
            getActivityText(null, 'DELETE_STAGE', stageToDelete.stage_name, null),
            new Date()
        );

        return dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.filter(stage => stage._id !== stageToDelete._id)],
            activity: [...currentProject.activity, deleteStageActivity]
        }));
    }

    const updateCurrentProjectInBoardsArray = () => dispatch(setBoards([...boards.map(board => {
        if (board._id === currentProject._id) {
            return {...currentProject};
        } else return board;
    })]))

    const handleMarkAsDone = (task) => {
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
          if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.stage_tasks.filter(t => t.isDone === true).length + 1 , stage_tasks: [...stage.stage_tasks.map(t => {
              if (t._id === task._id) {
                return {...t, isDone: true};
              } else return t;
            })]};
          } else return stage;
        })]}))
    }

    const handleMarkAsNotDone = (task) => {
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
          if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.stage_tasks.filter(t => t.isDone === true).length - 1 , stage_tasks: [...stage.stage_tasks.map(t => {
              if (t._id === task._id) {
                return {...t, isDone: false};
              } else return t;
            })]};
          } else return stage;
        })]}))
    }

    const handleDeleteTask = async (task) => {
        const deleteTaskActivity = createActivity(
            {
                user_name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email,
                image: userInfo.base64_img_data || userInfo.img_url
            },
            getActivityText(null, 'DELETE_TASK', task.title, task.current_stage.name),
            new Date()
        );

        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
          if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.tasks_done === 0 ? 0 : stage.tasks_done - 1,
                stage_tasks: [...stage.stage_tasks.filter(t => t._id !== task._id)]};
          } else return stage;
        })], activity: [...currentProject.activity, deleteTaskActivity]}));
        
        dispatch(setTasks([...tasks.filter(t => t._id !== task._id)]));
        return await deleteTask({id: currentProject._id, stage_id: task.current_stage.id, task_id: task._id});
    }

    const handleClearStageTasks = (stageToClearTasksFrom) => {
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(s => {
            if (s._id === stageToClearTasksFrom._id) {
                return {...s, stage_tasks: [], tasks_done: 0};
            } else return s;
        })]}))
    }

    const handleAddMembers = (e) => {
        if (!e.target.value) return;
        const newMember = members?.find(member => e.target.value.trim() === member._id);
        if (projectMembers.find(member => newMember._id === member._id)) return;
        if (newMember._id === user._id) return;
        const {email, first_name, last_name, online, admin, img_url, base64_img_data} = newMember;
        dispatch(setProjectMembers([...projectMembers, {email, first_name, last_name, online, admin, image: base64_img_data || img_url}])); // newMember was members?.find(member => e.target.value.trim() === member._id) so changed it to newMember
    }

    const addBoard = async (values) => {
        if (values.type !== 'board') {
            dispatch(setError("Invalid values. Could not create board"));
            dispatch(setErrorPopupOpen(true));
            return;
        }
        if (createPopupOpen) closeCreatePopup();
        try {
            const {data: userInfo} = await getUserInfo(user._id);
            const {email, first_name, last_name, online, admin, img_url, base64_img_data} = userInfo;

            const createBoardActivity = createActivity(
                {
                    user_name: `${first_name} ${last_name}`,
                    email,
                    image: base64_img_data || img_url
                },
                getActivityText(null, 'CREATE_PROJECT', values.title, null),
                new Date()
            );

            const {data: newProject} = await addProject({
                ...values,
                members: [...values.members, {email, first_name, last_name, online, admin, image: base64_img_data || img_url ? base64_img_data || img_url : "" , _id: user._id}],
                admins: [email],
                activity: [createBoardActivity]
            });
            dispatch(setBoards([...boards, {...newProject, due_date: new Date(newProject.due_date).toDateString()}]));
            dispatch(setAdminPassFormOpen(true));
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                dispatch(setError(response.data.error));
                dispatch(setErrorPopupOpen(true));
            }
        }
    }

    const closeAdminForm = () => dispatch(setAdminPassFormOpen(false));

    const addStage = (values, project) => {
        if (!values || values.type !== 'stage') {
            dispatch(setError("Invalid values. Could not create stage"));
            dispatch(setErrorPopupOpen(true));
            return;
        }
        if (createPopupOpen) closeCreatePopup();
        const newStage = {...values, project: project.title};
        const projectToAddStage = boards.find(board => board._id === project._id);
        const {email, first_name, last_name, img_url, base64_img_data} = userInfo;

        const createStageActivity = createActivity(
            {
                user_name: `${first_name} ${last_name}`,
                email,
                image: base64_img_data || img_url
            },
            getActivityText(null, 'ADD_STAGE', currentProject.title, null),
            new Date()
        );

        dispatch(setBoards([...boards.filter(board => board._id !== projectToAddStage._id),
            {...projectToAddStage, stages: [...projectToAddStage.stages, newStage]}]));
        if (projectToAddStage._id === currentProject._id) {
            dispatch(setCurrentProject({
                ...currentProject,
                stages: [...currentProject.stages, newStage],
                activity: [...currentProject.activity, createStageActivity]
            }));
        }
    }

    const addTask = (values, stageToUpdate) => {
        if (!values || values.type !== 'task') {
            dispatch(setError("Invalid values. Could not create task"));
            dispatch(setErrorPopupOpen(true));
            return;
        }
        if (createPopupOpen) closeCreatePopup();
        const newTask = {
            ...values,
            current_stage: {
                name: stageToUpdate.stage_name,
                id: stageToUpdate._id
            },
            project: {
                title: currentProject.title,
                id: currentProject._id
            },
            _id: generateId(),
            messages: [],
            priority: taskPriority
        };

        const addTaskActivity = createActivity(
            {
                user_name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email,
                image: userInfo.base64_img_data || userInfo.img_url
            },
            getActivityText(null, 'ADD_TASK', stageToUpdate.stage_name, null),
            new Date()
        );

        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(current_project_stage => {
                if (current_project_stage._id === stageToUpdate._id) {
                    return {...current_project_stage, stage_tasks: [...current_project_stage.stage_tasks, newTask]}
                } else return current_project_stage;
            })],
            activity: [...currentProject.activity, addTaskActivity]
        }));

        dispatch(setTasks([...tasks, newTask]));
    }

    const handleSelectStage = (stage) => {
        return dispatch(setStage(stage));
    }

    const handleSetPriority = (priority=null) => {
        return dispatch(setTaskPriority(priority));
    }

    const clearNotifications = () => dispatch(setCurrentProject({...currentProject, notifications: []}));

    const addNotification = (notification) => {
        return dispatch(setCurrentProject({...currentProject, notifications: [...currentProject.notifications, notification]}));
    }

    useEffect(() => {
        if (!currentProject) return;
        update(currentProject);
    
        // Each time currentProject changes update tasks
        const projectTasks = currentProject?.stages.map(stage => {
            return stage.stage_tasks.map(task => task);
        // Each stage is returned as an array, so projectTasks is an array of arrays
        })
        dispatch(setTasks(projectTasks.flatMap(arr => arr)));

        // Update boards every time currentProject changes
        updateCurrentProjectInBoardsArray();

        // Set notifications
        dispatch(setNotifications([...currentProject.notifications]));

        // Set admin property to true if the user's email is in admins array
        if (user.email in currentProject.admins) dispatch(setUserInfo({...userInfo, admin: true}));
    }, [currentProject])

    // Reset element every time popup is closed 
    useEffect(() => {
        if (!createPopupOpen) dispatch(setElement(""));
    }, [createPopupOpen])
    
    return {
        currentProject,
        boards,
        element,
        profileTabOpen,
        projectMembers,
        notificationTabOpen,
        createPopupOpen,
        stage,
        projectMenuTabOpen,
        error,
        errorPopupOpen,
        taskPriority,
        tasks,
        adminFormOpen,
        notifications,
        activity,
        handleCreateBoard,
        handleCreate, // handleCreate and handleCreateBoard are similar
        handleToggleNotificationTab,
        closeCreatePopup,
        handleCreateClick,
        handleToggleProfileTab,
        handleProjectsClick,
        handleAddStage,
        handleMenuClick,
        handleDeleteProject,
        handleAddMember,
        closeStageOptionMenus,
        handleAddTask,
        validate,
        toggleStageOptions,
        handleDeleteStage,
        handleMarkAsDone,
        handleMarkAsNotDone,
        handleDeleteTask,
        handleRemoveMemberFromProject,
        handleAddMembers,
        addBoard,
        addStage,
        addTask,
        handleSelectStage,
        handleSetPriority,
        handleElementClick,
        closeAdminForm,
        clearNotifications,
        addNotification,
        handleClearStageTasks
    }
}

export default useProject;