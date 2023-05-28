import React, { useEffect, useState } from 'react';
import useProject from '../../hooks/useProject';
import LabelContainer from '../common/LabelsContainer';
import { dueDateFormat } from '../../utils/timeFormats';
import IconContainer from '../common/IconContainer';
import { RxCross1 } from 'react-icons/rx';
import { FiCheck } from 'react-icons/fi';
import {MdDoneAll} from "react-icons/md";
import CancelButton from '../common/CancelButton';
import { useDispatch } from 'react-redux';
import { setCurrentTask } from '../../store/project/project.actions';
import { labels } from '../../utils/labels';
import Space from '../common/Space';

const Task = () => {
    const {currentTask, closeTask, handleMarkAsDone, handleMarkAsNotDone} = useProject();
    const [isComplete, setIsComplete] = useState(false);
    const dispatch = useDispatch();

    // Set to complete
    const markAsComplete = () => {
        dispatch(setCurrentTask({
            ...currentTask,
            isDone: true
        }));
        
        handleMarkAsDone(currentTask);

        setIsComplete(true);
    }

    // Set to incomplete
    const markAsIncomplete = () => {
        dispatch(setCurrentTask({
            ...currentTask,
            isDone: false
        }));

        handleMarkAsNotDone(currentTask);

        setIsComplete(false);
    }

    const completedLabel = labels.find(label => label.id === 'label_completed');

    useEffect(() => {
        if (currentTask) setIsComplete(currentTask.isDone);
    }, [currentTask]);

  return (
    <div className='create-popup-container active'>

        <IconContainer additionalClass={'cross'} icon={<RxCross1 className='icon'/>} onClick={closeTask}/>

        <div className='create-popup active task'>

            <div>
                <div>
                    <LabelContainer priority={currentTask?.priority} additionalClass="no-hover"/>
                    <h2>{currentTask?.title}</h2>
                </div>
                <div id='task-labels'>
                    <LabelContainer additionalClass={'no-hover'} content={dueDateFormat(currentTask?.due_date)}/>
                    {currentTask?.isDone ? <LabelContainer content={labels[labels.length - 1].name} additionalClass={`${completedLabel.color_class} green-bg`}/> : null}
                </div>
            </div>

            <p>{currentTask?.subtitle}</p>

            <textarea readOnly value={currentTask?.description}/>

            <div className='buttons-container'>

                {isComplete && <button className='btn white' onClick={markAsIncomplete}>
                    <IconContainer icon={<RxCross1 className='icon green'/>}/>
                    <span className='btn-text'>{'Reset'}</span>
                </button>}

                {!isComplete && <button className='btn white' onClick={markAsComplete}>
                    <IconContainer icon={<MdDoneAll className='icon blue'/>}/>
                    <span className='btn-text'>{'Done'}</span>
                </button>}

                <CancelButton fn={closeTask} text={'Close'}/>

            </div>
        </div>

    </div>
  )
}

export default Task;