import React, { useEffect, useRef, useState } from 'react';
import IconContainer from './common/IconContainer';
import { CgMenuGridO } from 'react-icons/cg';
import ProjectMembers from './ProjectMembers';
import { projectMenuOptions, projectMenuOptions_admin } from "../utils/projectMenuOptions";
import { useDispatch } from 'react-redux';
import { setProjectMenuOpen, setTasks } from '../store/globalStates/globalStates.actions';
import { setCurrentProject } from '../store/project/project.actions';
import {AiFillProject} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import useProject from '../hooks/useProject';
import {FiCheck} from "react-icons/fi";
import Space from "./common/Space";
import useAuth from '../hooks/useAuth';
import SearchBar from './common/SearchBar';
import { BsSearch } from 'react-icons/bs';
import LabelsContainer from './common/LabelsContainer';

const ProjectInfoBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        projectMenuTabOpen,
        currentProject,
        handleAddStage,
        handleMenuClick,
        handleDeleteProject,
        tasks,
        isAdmin
    } = useProject();
    const [projectNameInputValue, setProjectNameInputValue] = useState("");
    const titleRef = useRef();
    const [editActive, setEditActive] = useState(false);

    const toggleEditActive = () => setEditActive(!editActive);

    const handleProjectMenuOptions = (opt) => {
        if (!opt || typeof opt !== 'string') return;

        dispatch(setProjectMenuOpen(false));

        switch(opt.toLowerCase()) {
            case 'view project summary':
                return console.log(opt);
            case 'add stage':
                return handleAddStage();
            case 'manage team':
                return handleManageTeam();
            case 'edit project name':
                return toggleEditActive();
            case 'delete project':
                return handleDeleteProject(currentProject._id);
            default:
                return opt;
        }
    }

    const handleManageTeam = () => {
        navigate("/users");
    }

    const handleInputChange = (e) => setProjectNameInputValue(e.target.value);

    const validateProjectName = (input) => {
        setEditActive(false);

        if (!input || !input.length || input.trim() === currentProject.title) {
            return dispatch(setCurrentProject({...currentProject, title: currentProject.title}));
        } else {
            // Update project title and set edit_active to false
            dispatch(setCurrentProject({...currentProject, title: input.trim()}));

            // Update all tasks. Each task object contains a project property which contains the project name and id
            return dispatch(setTasks([...tasks.map(t => {
                return {...t, project: {
                    title: input.trim(),
                    id: currentProject._id
                }}
            })]));
        }
    }

    const [searchFieldValue, setSearchFieldValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const searchFieldRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (searchValue) => {
        const someMatchingTaskTitle = tasks.some(task => task.title.toLowerCase()
            .includes(searchValue.toLowerCase()));

        if (someMatchingTaskTitle){
            setSearchResults([...tasks.filter(task => task.title.toLowerCase()
                .includes(searchValue.toLowerCase())
            )]);
        } else return setSearchResults([]);
    }

    const handleSearchFieldChange = (e) => {
        setSearchFieldValue(e.target.value);
    }

    useEffect(() => {
        if (searchFieldValue.length && searchFieldRef.current) {
            setIsSearching(true);
            return;
        } else setIsSearching(false);

    }, [searchFieldValue]);

    useEffect(() => {
        if ((!searchFieldValue.length && searchResults.length) || !searchFieldValue.length) {
            setSearchResults([]);
            return;
        }
        
        handleSearchResults(searchFieldValue);
    }, [searchFieldValue])

    useEffect(() => {
        if (!currentProject) return;

        setProjectNameInputValue(currentProject.title);

        if (editActive) {
            titleRef.current.select();
            titleRef.current.focus();
        }
    }, [currentProject]);

  return (
    <>
    <div className="current-board-info-bar">
        <div className='project-title-container'>
            <h3>BOARD</h3>
            <div className='project-title'>
                <IconContainer icon={<AiFillProject className='icon'/>}/>
                <div className='input-container'>
                    <input
                        type="text"
                        ref={titleRef}
                        readOnly={!editActive}
                        onChange={handleInputChange}
                        value={projectNameInputValue}
                        className={editActive ? "title-input active" : "title-input"}
                    />
                    {editActive
                    ?   <IconContainer
                            additionalClass="green"
                            id="check"
                            onClick={() => validateProjectName(projectNameInputValue)}
                            icon={<FiCheck className='icon check' title='Save'/>}
                        />
                    : null}
                </div>
            </div>
        </div>
        <Space/>
        <SearchBar
            placeholderText='Search tasks'
            icon={<IconContainer icon={<BsSearch className='icon'/>}/>}
            type="text"
            fn={handleSearchFieldChange}
            refValue={searchFieldRef}
            value={searchFieldValue}
            styles={'bg-white'}
        />
        {isSearching && searchResults.length
            ? (
                <div className='search-results'>
                    {searchResults?.map(res => {
                        return (
                            <div key={res._id} className='search-result'>
                                <div>
                                    <p>{res.current_stage.name}</p>
                                    <h3>{res.title}</h3>
                                </div>
                                <Space/>
                                <LabelsContainer priority={res.priority} additionalClass={'no-hover'}/>
                            </div>
                        )
                    })}
                </div> 
            )
            : null
        }
        <ProjectMembers/>
        <IconContainer
            additionalClass='menu'
            onClick={handleMenuClick}
            icon={<CgMenuGridO
            className='icon'/>}
        />
        <div className={projectMenuTabOpen ? "options-menu open" : "options-menu"}>
            {isAdmin
            ? projectMenuOptions_admin.map(opt => <p key={opt} onClick={() => handleProjectMenuOptions(opt)}>{opt}</p>)
            : projectMenuOptions.map(opt => <p key={opt} onClick={() => handleProjectMenuOptions(opt)}>{opt}</p>)}
        </div>
    </div>
    </>
  )
}

export default ProjectInfoBar;