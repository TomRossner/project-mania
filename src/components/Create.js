import React, { useContext, useRef } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import BoardForm from './forms/BoardForm';
import StageForm from './forms/StageForm';
import TaskForm from './forms/TaskForm';
import { RxCross2 } from 'react-icons/rx';
import IconContainer from './common/IconContainer';

const elements = ["board", "stage", "task"];

const Create = () => {
    const {selectedElement, setSelectedElement, currentProject, closeCreatePopup, createPopupOpen} = useContext(ProjectContext);
    const handleElementClick = (element) => {
        setSelectedElement(element);
    }

  return (
    <div className={createPopupOpen ? 'create-popup-container active' : 'create-popup-container'}>
        <IconContainer icon={<RxCross2 className='icon'/>} onClick={closeCreatePopup}/>
        <div className={createPopupOpen ? 'create-popup active' : 'create-popup'}>
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
    </div>
  )
}

export default Create;