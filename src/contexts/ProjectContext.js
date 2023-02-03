import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ProjectContext = createContext({
    open: false,
    setOpen: () => {},
    selectedElement: "",
    setSelectedElement: () => {},
    input: "",
    setInput: () => {},
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
    setSelectStage: () => {}
})

const ProjectProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState("");
    const [input, setInput] = useState("");
    const [boards, setBoards] = useState([]);
    const [projectMembers, setProjectMembers] = useState([]);
    const [currentProject, setCurrentProject] = useState(boards[boards.length - 1]);
    const [notificationTabOpen, setNotificationTabOpen] = useState(false);
    const [profileTabOpen, setProfileTabOpen] = useState(false);
    const [createPopupOpen, setCreatePopupOpen] = useState(false);
    const [availableMembers, setAvailableMembers] = useState([]);
    const [selectStage, setSelectStage] = useState(null);

    const addBoard = async (values) => {
        if (!values || values.type !== 'board') return;
        if (createPopupOpen) closeCreatePopup();
        const {data: newProject} = await axios.post("/projects", {...values, members: [...projectMembers]});
        return setBoards([...boards, {...newProject, due_date: new Date(newProject.due_date).toDateString()}]);
    }

    const addStage = (values, project) => {
        if (!values || values.type !== 'stage') return;
        if (createPopupOpen) closeCreatePopup();
        const newStage = {...values, project: project.title, _id: project.stages.length + 1};
        const projectToAddStage = boards.find(board => board._id === project._id);
        setBoards([...boards.filter(board => board._id !== projectToAddStage._id),
            {...projectToAddStage, stages: [...projectToAddStage.stages, newStage]}]);
        if (projectToAddStage._id === currentProject._id) {
            setCurrentProject({...currentProject, stages: [...currentProject.stages, newStage]});
        }
    }

    const addTask = (values, stageToUpdate) => {
        if (!values || values.type !== 'task') return;
        if (createPopupOpen) closeCreatePopup();
        const newTask = {...values, current_stage: stageToUpdate.stage_name, project: currentProject.title,
            _id: stageToUpdate.stage_tasks.length + 1};
        setCurrentProject({...currentProject, stages: [...currentProject.stages.map(current_project_stage => {
                if (current_project_stage._id === stageToUpdate._id) {
                    return {...current_project_stage, stage_tasks: [...current_project_stage.stage_tasks, newTask]}
                } else return current_project_stage;
        })]})
    }

    const getMembers = async () => {
        const {data} = await axios.get("/users");
        return setAvailableMembers(data);
    }

    const getProjects = async () => {
        const {data: projects} = await axios.get("/projects")
        setCurrentProject({...projects[projects.length - 1], due_date: new Date(projects[projects.length - 1].due_date).toDateString()})
        return setBoards(projects);
    }

    const updateProject = async (project) => {
        return await axios.put("/projects", project);
    }

    const closeCreatePopup = () => {
        return setCreatePopupOpen(false);
    }
    
    useEffect(() => {
        getMembers();
        getProjects();
    }, [])

    useEffect(() => {
        if (!open) setSelectedElement("");
    }, [open])

    useEffect(() => {
        if (!currentProject) return;
        console.log("Current project: ", currentProject);
        updateProject(currentProject);
        setProjectMembers(currentProject.members);
    }, [currentProject])

    useEffect(() => {
        if (!boards.length) return;
        else boards.forEach(board => {
            updateProject(board);
        })
    }, [boards])
    
    const values = {
        open, setOpen,
        selectedElement, setSelectedElement,
        input, setInput,
        boards, setBoards,
        projectMembers, setProjectMembers,
        currentProject, setCurrentProject,
        addBoard,
        addStage,
        addTask,
        notificationTabOpen, setNotificationTabOpen,
        profileTabOpen, setProfileTabOpen,
        availableMembers, setAvailableMembers,
        createPopupOpen, setCreatePopupOpen, closeCreatePopup,
        selectStage, setSelectStage
    }

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  )
}

export default ProjectProvider;