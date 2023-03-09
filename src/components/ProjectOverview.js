import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';
// import { RiEdit2Fill } from "react-icons/ri";
import Line from './common/Line';
import Spinner from './common/Spinner';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectStagesContainer from './ProjectStagesContainer';
import { setBoards } from '../store/boards/boards.actions';
import { selectBoards } from '../store/boards/boards.selector';
import { setCurrentProject, setCreatePopupOpen, setElement } from '../store/project/project.actions';

const ProjectOverview = () => {
    const currentProject = useSelector(selectCurrentProject);
    const dispatch = useDispatch();
    const boards = useSelector(selectBoards);
    const [tasks, setTasks] = useState([]);

    const closeStageOptionMenus = () => {
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.options_menu_open) {
                return {...stage, options_menu_open: false};
            } else return stage;
        })]}));
    }

    const handleCreateTask = () => {
        closeStageOptionMenus();
        dispatch(setCreatePopupOpen(true));
        dispatch(setElement("task"));
    }
    
    useEffect(() => {
        if (currentProject) {
            const currentProjectTasks = currentProject?.stages.map(stage => stage.stage_tasks).concat();
            setTasks(currentProjectTasks[0].concat(currentProjectTasks[1].concat(currentProjectTasks[2])));
        }
    }, [])

    useEffect(() => {
        if (!currentProject) return;
        const updateBoards = () => dispatch(setBoards([...boards.map(board => {
            if (board._id === currentProject._id) {
                return {...currentProject};
            } else return board;
        })]))

        updateBoards();
    }, [currentProject])

  return (
    <>
        {currentProject ?
        <div className="project-overview">
            <ProjectInfoBar/>
            <Line/>
            <ProjectStagesContainer/>
            {tasks.length ? null :
                <div className='create-to-get-started'>
                    <h3>Create a task to get started</h3>
                    <button className='btn blue' onClick={handleCreateTask}>Create a task</button>
                </div>
            }
        </div>
        : <Spinner/>}
    </>
  )
}

export default ProjectOverview;