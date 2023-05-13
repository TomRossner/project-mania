import { useDispatch, useSelector } from "react-redux";
import { selectBoards, selectIsLoading } from "../store/boards/boards.selector";
import { selectActivity, selectCurrentProject, selectCurrentTask, selectProjectAdmins, selectProjectMembers } from "../store/project/project.selector";
import { updateProject, deleteProject } from "../httpRequests/http.project";
import { useNavigate } from "react-router-dom";
import { setBoards } from "../store/boards/boards.actions";
import {deleteTask, addProject} from "../httpRequests/http.project";
import {getUserInfo} from "../httpRequests/http.auth";
import { selectMembers } from "../store/members/members.selector";
import { generateId } from "../utils/IdGenerator";
import { setCurrentProject, setCurrentTask, setProjectMembers } from "../store/project/project.actions";
import {selectGlobalStates} from "../store/globalStates/globalStates.selector";
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
    setTaskToMove,
    setMoveTaskPopupOpen,
    setChangePriorityPopupOpen,
    setNavOpen,
    setActivitySectionOpen,
    setAdminModalOpen
} from "../store/globalStates/globalStates.actions";
import {
    activity_addMember,
    activity_addTask,
    activity_createBoard,
    activity_createStage,
    activity_deleteStage,
    activity_deleteTask,
    activity_editStageName,
    activity_moveTask,
    activity_removeMember
} from "../utils/activities";
import { ERROR_MESSAGES } from "../utils/errors";
import { selectUser } from "../store/auth/auth.selector";
import { selectIsAdmin, selectUserInfo } from "../store/userInfo/userInfo.selector";
import { setIsAdmin, setUserInfo } from "../store/userInfo/userInfo.actions";
import { useEffect } from "react";

const useProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentProject = useSelector(selectCurrentProject);
    const boards = useSelector(selectBoards);
    const projectMembers = useSelector(selectProjectMembers);
    const members = useSelector(selectMembers);
    const activity = useSelector(selectActivity);
    const isLoading = useSelector(selectIsLoading);
    const currentTask = useSelector(selectCurrentTask);
    const user = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);
    const projectAdmins = useSelector(selectProjectAdmins);
    const isAdmin = useSelector(selectIsAdmin);
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
        notifications,
        taskToMove,
        moveTaskPopupOpen,
        changePriorityPopupOpen,
        adminModalOpen
    } = useSelector(selectGlobalStates);






    /****************************
        TASK RELATED FUNCTIONS
    *****************************/

    // Add task handler
    const handleAddTask = (stageToAddTaskTo) => {
        closeStageOptionMenus();
        dispatch(setStage(stageToAddTaskTo));
        dispatch(setCreatePopupOpen(true));
        dispatch(setElement("task"));
    }

    // Add task
    const addTask = (values, stageToUpdate) => {
        if (values.type !== 'task') {
            showError(ERROR_MESSAGES.INVALID_TYPE_TASK);
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

        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(current_project_stage => {
                if (current_project_stage._id === stageToUpdate._id) {
                    return {...current_project_stage, stage_tasks: [...current_project_stage.stage_tasks, newTask]}
                } else return current_project_stage;
            })],
            activity: [...currentProject.activity, activity_addTask(userInfo, stageToUpdate)]
        }));

        dispatch(setTasks([...tasks, newTask]));
    }

    // Check task
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

    // Uncheck task
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

    // Delete task
    const handleDeleteTask = async (task) => {
        dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage._id === task.current_stage.id) {
            return {...stage, tasks_done: stage.tasks_done === 0 ? 0 : stage.tasks_done - 1,
                stage_tasks: [...stage.stage_tasks.filter(t => t._id !== task._id)]};
        } else return stage;
        })], activity: [...currentProject.activity, activity_deleteTask(userInfo, task)]}));
        
        dispatch(setTasks([...tasks.filter(t => t._id !== task._id)]));
        return await deleteTask({id: currentProject._id, stage_id: task.current_stage.id, task_id: task._id});
    }

    // Move task handler
    const handleMoveTask = (task) => {
        
        // Set taskToMove
        dispatch(setTaskToMove(task));
        
        // Open taskToMove popup
        dispatch(setMoveTaskPopupOpen(true));
    }

    // Move task
    const moveTask = (task, stageToMoveTaskTo) => {
        if (stageToMoveTaskTo._id === task.current_stage.id) return;

        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(s => {
                // Remove task from previous stage
                if (s._id === task.current_stage.id) {
                    return {...s, stage_tasks: [...s.stage_tasks.filter(t => t._id !== task._id)]};
                }

                // Add to new stage
                else if (s._id === stageToMoveTaskTo._id) {
                    return {...s, stage_tasks: [...s.stage_tasks, {...task, current_stage: {name: s.stage_name, id: s._id}}]};
                }

                else return s;
            })],
            activity: [...currentProject.activity, activity_moveTask(userInfo, task, stageToMoveTaskTo)]
        }));
    }

    // Task options handler
    const handleTaskOptions = (task, opt) => {
        switch(opt) {
            case 'Delete':
                return handleDeleteTask(task);
            case "Move task":
                return handleMoveTask(task);
            case "Change priority":
                return handleChangePriority(task);
            default:
                return console.log("Unhandled option");
        }
    }

    const handleChangePriority = (task) => {
        console.log(task);
        // Open popup
        dispatch(setChangePriorityPopupOpen(true));

        // Set current task
        dispatch(setCurrentTask(task));
    } 

    // Close move task popup
    const closeMoveTaskPopup = () => dispatch(setMoveTaskPopupOpen(false));

    // Refresh tasks
    const refreshTasks = () => {
        
        // Each time currentProject changes update tasks
        const projectTasks = currentProject.stages.map(stage => {
            const {stage_tasks} = stage;

            // Each stage is returned as an array, so projectTasks is an array of arrays
            return stage_tasks.map(task => task);
        });
        
        return dispatch(setTasks(projectTasks.flatMap(arr => arr)));
    }




    
    /*****************************
        STAGE RELATED FUNCTIONS
    ******************************/

    // Add stage handler
    const handleAddStage = () => {
        dispatch(setCreatePopupOpen(true));
        dispatch(setProjectMenuOpen(false));
        dispatch(setElement("stage"));
    }

    // Add stage
    const addStage = (values, project) => {
        if (values.type !== 'stage') {
            showError(ERROR_MESSAGES.INVALID_TYPE_STAGE);
            return;
        }
        
        if (createPopupOpen) closeCreatePopup();

        const newStage = {...values, project: project.title};
        const projectToAddStage = boards.find(board => board._id === project._id);

        dispatch(setBoards([...boards.filter(board => board._id !== projectToAddStage._id),
            {...projectToAddStage, stages: [...projectToAddStage.stages, newStage]}]));

        if (projectToAddStage._id === currentProject._id) {
            dispatch(setCurrentProject({
                ...currentProject,
                stages: [...currentProject.stages, newStage],
                activity: [...currentProject.activity, activity_createStage(userInfo, currentProject)]
            }));
        }
    }

    // Close all stage options menus
    const closeStageOptionMenus = () => {
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open) {
                return {...stage, options_menu_open: false};
            } else return stage;
        })]}));
    }

    // Toggle stage options
    const toggleStageOptions = (stageToUpdate) => {
        if (!stageToUpdate) return;

        const updatedStage = {...stageToUpdate, options_menu_open: !stageToUpdate.options_menu_open};

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

    // Delete stage
    const handleDeleteStage = (stageToDelete) => {
        if (!stageToDelete) return;

        closeStageOptionMenus();

        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.filter(stage => stage._id !== stageToDelete._id)],
            activity: [...currentProject.activity, activity_deleteStage(userInfo, stageToDelete)]
        }));
    }

    // Save new stage name
    const saveStageName = (inputValue, stageToUpdate) => {
        if (!inputValue || !stageToUpdate) return;

        const newStageName = inputValue.trim();

        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(stage => {
                if (stage._id === stageToUpdate._id) {
                    return {...stage, stage_name: newStageName, edit_active: false, stage_tasks: [...stage.stage_tasks.map(task => {
                        return {...task, current_stage: {...task.current_stage, name: newStageName}};
                    })]};
                } else return stage;
            })],
            activity: [...currentProject.activity, activity_editStageName(userInfo, stageToUpdate, newStageName)]
        }));
    }

    // Clear all stage tasks
    const handleClearStageTasks = (stageToClearTasksFrom) => {
        dispatch(setCurrentProject({
            ...currentProject,
            stages: [...currentProject.stages.map(s => {
                if (s._id === stageToClearTasksFrom._id) {
                    return {...s, stage_tasks: [], tasks_done: 0};
                } else return s;
            })]
        }));
    }
    




    /*******************************
        PROJECT RELATED FUNCTIONS
    ********************************/

    // Add new project
    const addBoard = async (values) => {
        if (values.type !== 'board') {
            showError(ERROR_MESSAGES.INVALID_TYPE_BOARD);
            return;
        }

        if (createPopupOpen) closeCreatePopup();

        try {
            const {data: userInfo} = await getUserInfo(user._id);

            const {email, first_name, last_name, online, admin, img_url, base64_img_data} = userInfo;

            const {data: newProject} = await addProject({
                ...values,
                members: [
                    ...values.members,
                    {
                        email,
                        first_name,
                        last_name,
                        online,
                        admin,
                        img_url: img_url ? img_url : "" ,
                        base64_img_data: base64_img_data ? base64_img_data : "",
                        _id: user._id
                    }
                ],
                admins: [email],
                activity: [activity_createBoard(userInfo, values)]
            });

            dispatch(setBoards([
                ...boards,
                {...newProject, due_date: new Date(newProject.due_date).toDateString()}
            ]));

        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                showError(response.data.error);
            }
        }
    }

    // Update project in database
    // const update = async (project) => {
    //     try {
    //         await updateProject(project);
    //     } catch ({response}) {
    //         if (
    //             (response.data.error && response.status === 400)
    //             ||
    //             (response.data.error && response.status === 404)
    //         ) {
    //             showError(response.data.error);
    //  
    //         } else {
    //             showError(ERROR_MESSAGES.UPDATE_PROJECT_FAILED);
    //  
    //         }
    //     }
    // }

    let isUpdatingProject = false;

    const update = async (project) => {
        if (!isUpdatingProject) {
            isUpdatingProject = true;

            try {
                await updateProject(project);
            } catch ({response}) {
                if (
                    (response.data.error && response.status === 400)
                    ||
                    (response.data.error && response.status === 404)
                ) {
                    showError(response.data.error);
                } else {
                    showError(ERROR_MESSAGES.UPDATE_PROJECT_FAILED);
                }
            } finally {
                isUpdatingProject = false;
            }
        }
    };

    // Update project in boards array
    const updateCurrentProjectInBoardsArray = () => {
        dispatch(setBoards([...boards.map(board => {
            if (board._id === currentProject._id) {
                return {...currentProject};
            } else return board;
        })]))
    }

    // Create board handler
    const handleCreateBoard = () => {
        dispatch(setCreatePopupOpen(true));
        dispatch(setElement("board"));
    }
    
    // Close create popup
    const closeCreatePopup = () => dispatch(setCreatePopupOpen(false));

    // Project selection handler
    const handleProjectsClick = () => {
        closeCreatePopup();
        if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
        if (profileTabOpen) dispatch(setProfileTabOpen(false));
    }

    // Delete project
    const handleDeleteProject = async (id) => {
        await deleteProject(id);

        dispatch(setCurrentProject(null));
        dispatch(setBoards([...boards.filter(board => board._id !== currentProject._id)]));
        navigate("/");
    }




    /*****************************
        USERS RELATED FUNCTIONS
    ******************************/

    // Remove member from project
    const handleRemoveMemberFromProject = (id) => {
        const memberToRemove = projectMembers.find(member => member._id === id);
        
        if (!memberToRemove) throw new Error("Member not found");

        dispatch(setProjectMembers(projectMembers.filter(member => member._id !== memberToRemove._id)));

        dispatch(setCurrentProject({
            ...currentProject,
            members: [...currentProject.members.filter(member => member._id !== memberToRemove._id)],
            activity: [...currentProject.activity, activity_removeMember(userInfo, memberToRemove, currentProject)],
            admins: [...currentProject.admins.filter(adm => adm !== memberToRemove.email)]
        }));
    }

    // Add member
    const handleAddMember = (member) => {
        if (!member) return;

        const MemberAlreadyAdded = projectMembers.find(m => m._id === member._id);
        if (MemberAlreadyAdded) return;

        dispatch(setCurrentProject({
            ...currentProject,
            members: [...currentProject.members, member],
            activity: [...currentProject.activity, activity_addMember(userInfo, member, currentProject)]
        }));
    }

    // Add members
    const handleAddMembers = (e) => {
        if (!e.target.value) return;

        const newMember = members?.find(member => e.target.value.trim() === member._id);

        if (projectMembers.find(member => newMember._id === member._id)) return;

        if (newMember._id === user._id) return;

        const {email, first_name, last_name, online, admin, img_url, base64_img_data} = newMember;

        dispatch(setProjectMembers([
            ...projectMembers,
            {
                email,
                first_name,
                last_name,
                online,
                admin,
                image: base64_img_data || img_url
            }
        ]));
    }





    /**************************************
        NOTIFICATIONS RELATED FUNCTIONS
    ***************************************/

    // Toggle notifications handler
    const handleToggleNotificationTab = () => {
        dispatch(setNotificationTabOpen(!notificationTabOpen));
        if (profileTabOpen) dispatch(setProfileTabOpen(false));
    }

    // Clear all notifications
    const clearNotifications = () => dispatch(setCurrentProject({...currentProject, notifications: []}));

    // Add notification
    const addNotification = (notification) => {
        return dispatch(setCurrentProject({...currentProject, notifications: [...currentProject.notifications, notification]}));
    }
    




    const closeMenu = () => {
        dispatch(setNavOpen(false));
    }

    const closeRecentActivity = () => {
        dispatch(setActivitySectionOpen(false));
    }

    const handleCreate = (type) => {
        closeStageOptionMenus();
        dispatch(setElement(type));
        dispatch(setCreatePopupOpen(true));
    }

    const handleCreateClick = () => {
        dispatch(setCreatePopupOpen(!createPopupOpen));
        if (projectMenuOpen) dispatch(setProjectMenuOpen(false));
        if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
        if (profileTabOpen) dispatch(setProfileTabOpen(false));
    }

    const handleToggleProfileTab = () => {
        dispatch(setProfileTabOpen(!profileTabOpen));
        if (notificationTabOpen) dispatch(setNotificationTabOpen(false));
    }

    const handleMenuClick = () => {
        dispatch(setProjectMenuOpen(!projectMenuTabOpen));
    }

    const handleElementClick = (element) => {
        dispatch(setElement(element));
    }

    const handleSelectStage = (stage) => {
        return dispatch(setStage(stage));
    }
    
    const handleSetPriority = (priority=null) => {
        return dispatch(setTaskPriority(priority));
    }
    
    const closeAdminForm = () => dispatch(setAdminPassFormOpen(false));

    const handleOpenAdminModal = () => {
        dispatch(setAdminModalOpen(true));
    }

    const closeAdminModal = () => {
        dispatch(setAdminModalOpen(false));
    }

    const showError = (errorType) => {
        dispatch(setError(errorType));
        dispatch(setErrorPopupOpen(true));
    }
    
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
        taskToMove,
        moveTaskPopupOpen,
        isLoading,
        currentTask,
        adminModalOpen,
        changePriorityPopupOpen,
        projectAdmins,
        isAdmin,
        handleChangePriority,
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
        saveStageName,
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
        handleClearStageTasks,
        handleMoveTask,
        handleTaskOptions,
        moveTask,
        closeMoveTaskPopup,
        updateCurrentProjectInBoardsArray,
        update,
        refreshTasks,
        showError,
        closeMenu,
        closeRecentActivity,
        handleOpenAdminModal,
        closeAdminModal
    }
}

export default useProject;