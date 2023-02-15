import React, { createContext, useEffect, useState } from 'react';
import { addProject, getMembers, getProjects, updateProject } from '../httpRequests/projectsRequests';
import { generateId } from '../utils/taskIdGenerator';

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
    loadProjects: () => {}
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

    const addBoard = async (values) => {
        if (values.type !== 'board') return setError("Invalid values. Could not create board");
        if (createPopupOpen) closeCreatePopup();
        try {
            const response = await addProject({...values, members: [...projectMembers]});
            const newProject = response.data;
            setBoards([...boards, {...newProject, due_date: new Date(newProject.due_date).toDateString()}]);
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                setError(response.data.error);
                setErrorPopupOpen(true);
            }
        }
    }

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

    const addTask = (values, stageToUpdate) => {
        if (!values || values.type !== 'task') return setError("Invalid values. Could not create task");
        if (createPopupOpen) closeCreatePopup();
        const newTask = {
            ...values,
            current_stage: stageToUpdate.stage_name,
            project: currentProject.title,
            _id: generateId(),
            messages: []
        };
        setCurrentProject({...currentProject, stages: [...currentProject.stages.map(current_project_stage => {
                if (current_project_stage._id === stageToUpdate._id) {
                    return {...current_project_stage, stage_tasks: [...current_project_stage.stage_tasks, newTask]}
                } else return current_project_stage;
        })]})
    }

    const loadMembers = async () => {
        try {
            const response = await getMembers();
            const members = response.data;
            setAvailableMembers(members);
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                setError(response.data.error);
                setErrorPopupOpen(true);
            }
        }
    }

    const loadProjects = async () => {
        try {
            const response = await getProjects();
            const projects = response.data;
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

    const update = async (project) => {
        try {
            await updateProject(project);
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                setError(response.data.error);
                setErrorPopupOpen(true);
            }
        }
    }

    const closeCreatePopup = () => {
        return setCreatePopupOpen(false);
    }

    const resetErrorMessage = () => setError("");
    
    useEffect(() => {
        loadMembers();
        loadProjects();
    }, [])


    useEffect(() => {
        if (!currentProject) return;
        update(); //currentProject
        setProjectMembers(currentProject.members);
    }, [currentProject])

    useEffect(() => {
        if (!boards.length) return;
        else boards.forEach(board => {
            update(board);
        })
    }, [boards])

    // useEffect(() => {
    //     console.log(currentProject)
    // }, [currentProject])
    
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
        loadProjects
    }

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  )
}

export default ProjectProvider;