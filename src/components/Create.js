import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import BoardForm from './forms/BoardForm';
import StageForm from './forms/StageForm';
import TaskForm from './forms/TaskForm';

const elements = ["board", "stage", "task"];

const Create = () => {
    const {selectedElement, setSelectedElement, currentProject} = useContext(ProjectContext);
    const handleElementClick = (element) => {
        setSelectedElement(element);
    }

  return (
    <div className='create-popup'>
        <div className='element-options'>
        <span>Create a new: </span>
        {elements.map((element) =>
            <span
                key={element}
                className={selectedElement === element ? "create-element selected" : "create-element"}
                onClick={() => handleElementClick(element)}
            >{element}</span>
        )}
        </div>
        {selectedElement === "board" && <BoardForm/>}
        {selectedElement === "stage" && currentProject && <StageForm/>}
        {selectedElement === "task" && currentProject && <TaskForm/>}
        {!selectedElement && null}
    </div>
  )
}

export default Create;