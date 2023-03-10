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

const ProjectOverview = () => {
    const currentProject = useSelector(selectCurrentProject);
    const dispatch = useDispatch();
    const boards = useSelector(selectBoards);

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
        </div>
        : <Spinner/>}
    </>
  )
}

export default ProjectOverview;