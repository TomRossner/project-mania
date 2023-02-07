import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { getMembers, getProjects, updateProject } from '../httpRequests/projectsRequests';
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
    resetErrorMessage: () => {}
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
    const [errorPopupOpen, setErrorPopupOpen] = useState(true);
    const [error, setError] = useState("Some error that needs attention, but when I click CLOSE it resets :D");

    const addBoard = async (values) => {
        if (!values || values.type !== 'board') return setError("Invalid values. Could not create board");
        if (createPopupOpen) closeCreatePopup();
        const {data: newProject} = await axios.post("/projects", {...values, members: [...projectMembers]});
        return setBoards([...boards, {...newProject, due_date: new Date(newProject.due_date).toDateString()}]);
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
        const members = await getMembers();
        return setAvailableMembers(members);
    }

    const loadProjects = async () => {
        const projects = await getProjects();
        if (projects.length) {
            setCurrentProject({...projects[projects.length - 1], due_date: new Date(projects[projects.length - 1].due_date).toDateString()});
            return setBoards(projects);
        } else return;
    }

    const update = async (project) => {
        return await updateProject(project);
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
        update(currentProject);
        setProjectMembers(currentProject.members);
    }, [currentProject])

    useEffect(() => {
        if (!boards.length) return;
        else boards.forEach(board => {
            update(board);
        })
    }, [boards])

    useEffect(() => {
        console.log(currentProject)
    }, [currentProject])
    
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
        errorPopupOpen, setErrorPopupOpen, error, setError, resetErrorMessage
    }

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  )
}

export default ProjectProvider;