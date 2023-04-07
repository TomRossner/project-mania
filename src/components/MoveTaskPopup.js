import React from 'react';
import useProject from '../hooks/useProject';
import { useDispatch, useSelector } from 'react-redux';
import { setStage } from '../store/globalStates/globalStates.actions';
import { selectStage, selectTaskToMove } from '../store/globalStates/globalStates.selector';

const MoveTaskPopup = () => {
    const {currentProject, moveTask, closeMoveTaskPopup} = useProject();
    const dispatch = useDispatch();
    const taskToMove = useSelector(selectTaskToMove);
    const stage = useSelector(selectStage);

    const handleSelect = (e) => {
        const selectedStage = currentProject.stages.find(stage => stage._id === e.target.value);
        dispatch(setStage(selectedStage)); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        moveTask(taskToMove, stage);
        closeMoveTaskPopup();
    }

    const currentTaskStage = currentProject.stages.find(stage => stage._id === taskToMove.current_stage.id);

  return (
    <div className='create-popup-container active admin'>
        <form onSubmit={handleSubmit} className="create-popup active">
            <h2>Move task</h2>
            <select onChange={handleSelect}>
                <option value={currentTaskStage}>Select stage</option>
                {currentProject?.stages.map(stage => {
                    if (stage._id === taskToMove?.current_stage.id) return "";
                    else return <option key={stage._id} value={stage._id}>{stage.stage_name}</option>
                })}
            </select>
            <div className='buttons-container'>
                <button type='submit' className='btn blue'>Move</button>
                <button type='button' className='btn cancel' onClick={closeMoveTaskPopup}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default MoveTaskPopup;