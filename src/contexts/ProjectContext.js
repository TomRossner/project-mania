import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../httpRequests/auth';
import { addProject, getMembers, getProjects, updateProject } from '../httpRequests/projectsRequests';
import { generateId } from '../utils/IdGenerator';
import { UserContext } from './UserContext';
import {priorities} from "../utils/labels";

export const ProjectContext = createContext({
    selectedElement: "",
    setSelectedElement: () => {},
    boards: [],
    setBoards: () => {},
    addBoard: () => {},
    projectMembers: [],
    setProjectMembers: () => {},
    currentProject: "",
    setCurrentProject: () => {},
    addTask: () => {},
    addStage: () => {},
    notificationTabOpen: false,
    setNotificationTabOpen: () => {},
    profileTabOpen: false,
    setProfileTabOpen: () => {},
    availableMembers: [],
    setAvailableMembers: () => {},
    createPopupOpen: false,
    setCreatePopupOpen: () => {},
    closeCreatePopup: () => {},
    selectStage: null,
    setSelectStage: () => {},
    getProjects: () => {},
    projectMenuOpen: false,
    setProjectMenuOpen: () => {},
    error: "",
    setError: () => {},
    setErrorPopupOpen: () => {},
    errorPopupOpen: false,
    resetErrorMessage: () => {},
    getUserProjects: () => {},
    taskPriority: "",
    setTaskPriority: () => {},
    resetTaskPriority: () => {}
})

const ProjectProvider = ({children}) => {
    const [selectedElement, setSelectedElement] = useState("");
    const [boards, setBoards] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);
    const [currentProject, setCurrentProject] = useState(boards[boards.length - 1]);
    const [notificationTabOpen, setNotificationTabOpen] = useState(false);
    const [profileTabOpen, setProfileTabOpen] = useState(false);
    const [createPopupOpen, setCreatePopupOpen] = useState(false);
    const [availableMembers, setAvailableMembers] = useState([]);
    const [selectStage, setSelectStage] = useState(null);
    const [projectMenuOpen, setProjectMenuOpen] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [error, setError] = useState("");
    const [taskPriority, setTaskPriority] = useState(priorities[0]);

    const {user} = useContext(UserContext);


    // Add new board
    const addBoard = async (values) => {
        if (values.type !== 'board') return setError("Invalid values. Could not create board");
        if (createPopupOpen) closeCreatePopup();
        try {
            const {data: userInfo} = await getUserInfo(user._id);
            const response = await addProject({...values, members: [...projectMembers, userInfo]});
            const newProject = response.data;
            setBoards([...boards, {...newProject, due_date: new Date(newProject.due_date).toDateString()}]);
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                setError(response.data.error);
                setErrorPopupOpen(true);
            }
        }
    }


    // Add new stage
    const addStage = (values, project) => {
        if (!values || values.type !== 'stage') return setError("Invalid values. Could not create stage");
        if (createPopupOpen) closeCreatePopup();
        const newStage = {...values, project: project.title};
        const projectToAddStage = boards.find(board => board._id === project._id);
        setBoards([...boards.filter(board => board._id !== projectToAddStage._id),
            {...projectToAddStage, stages: [...projectToAddStage.stages, newStage]}]);
        if (projectToAddStage._id === currentProject._id) {
            setCurrentProject({...currentProject, stages: [...currentProject.stages, newStage]});
        }
    }


    // Add new task
    const addTask = (values, stageToUpdate) => {
        if (!values || values.type !== 'task') return setError("Invalid values. Could not create task");
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
        setCurrentProject({...currentProject, stages: [...currentProject.stages.map(current_project_stage => {
                if (current_project_stage._id === stageToUpdate._id) {
                    return {...current_project_stage, stage_tasks: [...current_project_stage.stage_tasks, newTask]}
                } else return current_project_stage;
        })]})
    }


    // Get all members and set availableMembers
    const loadMembers = async () => {
        try {
            const {data: members} = await getMembers();
            setAvailableMembers(members.filter(member => member._id !== user._id));
        } catch (error) {
            console.log(error);
        }
    }


    // Get all projects associated with user and set currentProject and Boards.
    const getUserProjects = async (id) => {
        try {
            const {data: projects} = await getProjects(id);
            setCurrentProject({...projects[projects.length - 1], due_date: new Date(projects[projects.length - 1].due_date).toDateString()});
            setBoards(projects);
            return projects;
        } catch ({response}) {
            if ((response.data.error && response.status === 400)
            || (response.data.error && response.status === 404)) {
                setError(response.data.error);
                setErrorPopupOpen(true);
            }
        }
    }


    // Update project
    const update = async (project) => {
        try {
            await updateProject(project);
        } catch (error) {
            console.log(error);
        }
    }

    const closeCreatePopup = () => setCreatePopupOpen(false);

    const resetErrorMessage = () => setError("");

    const resetTaskPriority = () => setTaskPriority(priorities[0]); // "Low"


    // Get all members on load
    useEffect(() => {
        loadMembers();
    }, [])


    // Every time currentProject changes, update it in DB.
    // Then update project members based on currentProject's members.
    useEffect(() => {
        console.log("Current project: ", currentProject)
        if (!currentProject) return;
        update(currentProject);
        setProjectMembers(currentProject.members);
    }, [currentProject])


    // Every time boards array changes, update each board in DB.
    useEffect(() => {
        if (!boards.length) return;
        else boards.forEach(board => {
            update(board);
        })
    }, [boards])


    // If user in not logged in, set currentProject to null.
    // Else get user's projects and set currentProject to first project returned(TODO: set currentProject to last project worked on).
    useEffect(() => {
        if (!user) setCurrentProject(null);
        else if (user && !currentProject) {
            const projects = getUserProjects(user._id);
            setCurrentProject(projects[0]);
        }
    }, [user, currentProject])
    
    const values = {
        selectedElement, setSelectedElement,
        boards, setBoards,
        projectMembers, setProjectMembers,
        currentProject, setCurrentProject,
        addBoard, addStage, addTask,
        notificationTabOpen, setNotificationTabOpen,
        profileTabOpen, setProfileTabOpen,
        availableMembers, setAvailableMembers,
        createPopupOpen, setCreatePopupOpen, closeCreatePopup,
        selectStage, setSelectStage,
        projectMenuOpen, setProjectMenuOpen,
        errorPopupOpen, setErrorPopupOpen, error, setError, resetErrorMessage,
        taskPriority, setTaskPriority, resetTaskPriority,
        getUserProjects
    }

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  )
}

export default ProjectProvider;