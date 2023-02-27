import React from 'react';
import BoardForm from './forms/BoardForm';
import StageForm from './forms/StageForm';
import TaskForm from './forms/TaskForm';
import { RxCross2 } from 'react-icons/rx';
import IconContainer from './common/IconContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject, selectProject } from '../store/project/project.selector';
import { setCreatePopupOpen, setElement } from '../store/project/project.actions';
import {elements} from "../utils/elements";

const Create = () => {
    const currentProject = useSelector(selectCurrentProject);
    const {createPopupOpen, element: selectedElement} = useSelector(selectProject);
    const dispatch = useDispatch();

    const handleElementClick = (element) => {
        dispatch(setElement(element));
    }

    const handleCreatePopup = () => dispatch(setCreatePopupOpen(false));

    // useEffect(() => {
    //     if (!user) {
    //       navigate("/login");
    //       setError("You must be logged in to create projects/stages/tasks.");
    //       setErrorPopupOpen(true);
    //       setCreatePopupOpen(false);
    //       return;
    //     }
    //   }, [])

  return (
    <>
    {createPopupOpen ?
        (<div className='create-popup-container active'>
            <IconContainer icon={<RxCross2 className='icon'/>} onClick={handleCreatePopup}/>
            <div className='create-popup active'>
                <div className='element-options'>
                    <span>Create a new: </span>
                    {elements.map((element) =>
                        <span
                            key={element}
                            className={element === selectedElement ? "create-element selected" : "create-element"}
                            onClick={() => handleElementClick(element)}
                        >{element}</span>
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