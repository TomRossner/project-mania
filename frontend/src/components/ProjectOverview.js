import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
// import { RiEdit2Fill } from "react-icons/ri";
import Line from './common/Line';
import Spinner from './common/Spinner';
import ProjectInfoBar from './ProjectInfoBar';
import ProjectStagesContainer from './ProjectStagesContainer';

const ProjectOverview = () => {
    const {boards,
        setBoards,
        currentProject
    } = useContext(ProjectContext);

    useEffect(() => {
        if (!currentProject) return;
        const updateBoards = () => setBoards([...boards.map(board => {
            if (board._id === currentProject._id) {
                return {...currentProject};
            } else return board;
        })])

        updateBoards();
    }, [currentProject])

  return (
    <>
        {currentProject ?
        <div className="project-overview">
            <ProjectInfoBar/>
            <Line/>
            <ProjectStagesContainer/>
        </div>
        : <Spinner/>}
    </>
  )
}

export default ProjectOverview;