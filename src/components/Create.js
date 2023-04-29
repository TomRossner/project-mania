import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import {elements} from "../utils/elements";
import useProject from '../hooks/useProject';
import BoardForm from './forms/BoardForm';
import StageForm from './forms/StageForm';
import TaskForm from './forms/TaskForm';

const Create = () => {
    const {createPopupOpen, element: selectedElement, currentProject, closeCreatePopup, handleElementClick} = useProject();

  return (
    <>
    {createPopupOpen ?
        (<div className='create-popup-container active'>
            <span onClick={closeCreatePopup} className="icon-span" id="close">{<RxCross2 className='icon'/>}</span>
            <div className='create-popup active'>
                <div className='element-options'>
                    <span>Create a new: </span>
                    {elements.map((element) =>
                        <span
                            key={element}
                            className={element === selectedElement ? "create-element selected" : "create-element"}
                            onClick={() => handleElementClick(element)}
                        >
                            {element}
                        </span>
                    )}
                </div>
                {selectedElement === "board" && <BoardForm/>}
                {selectedElement === "stage" && currentProject && <StageForm/>}
                {selectedElement === "task" && currentProject && <TaskForm/>}
                {!selectedElement && null}
            </div>
        </div>)
    : (<div className='create-popup-container'></div>)}
    </>
  )
}

export default Create;