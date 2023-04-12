import React, { useEffect, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { BsThreeDotsVertical, BsPlus } from 'react-icons/bs';
import TaskOverview from './TaskOverview';
import { stageOptions } from '../utils/stageOptionsMenu';
import ProgressBar from './common/ProgressBar';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import OptionsMenu from './common/OptionsMenu';
import IconContainer from './common/IconContainer';
import useProject from '../hooks/useProject';
import { useDrop } from 'react-dnd';
import { createActivity, getActivityText } from '../utils/defaultProperties';
import useAuth from '../hooks/useAuth';

const StageOverview = ({stage}) => {
    const {stage_name, stage_tasks, edit_active, options_menu_open} = stage;
    const [inputValue, setInputValue] = useState("");
    const {currentProject, handleAddTask, saveStageName, handleDeleteStage, toggleStageOptions, handleClearStageTasks} = useProject();
    const dispatch = useDispatch();
    const [{isOver}, drop] = useDrop({
        accept: 'task',
        drop: (task) => handleDropEnd(task),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });
    const [stageTasks, setStageTasks] = useState([]);
    const [tasksDone, setTasksDone] = useState(0);
    const titleRef = useRef();
    const {userInfo} = useAuth();

    useEffect(() => {
        setStageTasks(stage_tasks);
        setTasksDone(Number(stage_tasks.filter(t => t.isDone === true).length));
    }, [stage_tasks])

    const handleDropEnd = (task) => {
        const moveTaskActivity = createActivity(
            {
                user_name: `${userInfo.first_name} ${userInfo.last_name}`,
                email: userInfo.email,
                image: userInfo.base64_img_data || userInfo.img_url
            },
            getActivityText(null, 'MOVE_TASK', task.title, stage.stage_name),
            new Date()
        );

        if (stage._id !== task.current_stage.id) {
            return dispatch(setCurrentProject({
                ...currentProject,
                stages: [...currentProject.stages.map(s => {
                    if (s._id === stage._id) {
                        return {...s, stage_tasks: [...s.stage_tasks, {...task, current_stage: {name: s.stage_name, id: s._id}}]};
                    } else if (s._id === task.current_stage.id) {
                        return {...s, stage_tasks: [...s.stage_tasks.filter(t => t._id !== task._id)]};
                    } else return s;
                })],
                activity: [...currentProject.activity, moveTaskActivity]
            }));
        } else return;
    }

    const handleInputChange = (e) => {
        return setInputValue(e.target.value);
    }

    const handleEdit = (stageToUpdate) => {
        if (!stageToUpdate) return;

        setInputValue(stageToUpdate.stage_name);
        const updatedStage = {...stageToUpdate, edit_active: !stageToUpdate.edit_active, options_menu_open: false}
        return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
            if (stage.edit_active && stage._id !== stageToUpdate._id) {
                return {...stage, edit_active: false, options_menu_open: false};
            }
            else if (!stage.edit_active && stage._id !== stageToUpdate._id) {
                return {...stage, options_menu_open: false};
            }
            else return updatedStage;
        })]}));
    }

    const handleOption = (stage, opt) => {
        if (!stage || !opt || typeof opt !== 'string') return;

        if (opt.toLowerCase() === "edit") return handleEdit(stage);
        if (opt.toLowerCase() === "add task") return handleAddTask(stage);
        if (opt.toLowerCase() === "delete stage") return handleDeleteStage(stage);
        if (opt.toLowerCase() === "clear tasks") return handleClearStageTasks(stage);
        else return console.log(`Unknown/unhandled option "${opt}".`);
    }

    useEffect(() => {
        if (edit_active) {
            titleRef.current.focus();
            titleRef.current.select();
        }
    }, [edit_active])

  return (
    <div className='stage-container'>
        <div className='stage-title-container'>
            <OptionsMenu options={stageOptions} boolean={options_menu_open} fn={handleOption} fn_arg={stage}/>
            <span className='total-tasks'>{stage.stage_tasks.length}</span>
            <div className='input-container'>
                <input
                    type="text"
                    name='stage_name'
                    readOnly={!edit_active}
                    onChange={(e) => handleInputChange(e, stage)}
                    defaultValue={stage_name}
                    className={edit_active ? "stage-title-input active" : "stage-title-input"}
                    ref={titleRef}
                />
                {edit_active ? <span className='icon-span green' onClick={() => saveStageName(inputValue, stage)}><FiCheck className='icon'/></span> : null}
            </div>
            <div className='buttons-container'>
                <IconContainer icon={<BsThreeDotsVertical className='icon dots-menu'/>} onClick={() => toggleStageOptions(stage)}/>
                <IconContainer additionalClass='plus' onClick={() => handleAddTask(stage)} icon={<BsPlus className='icon plus'/>}></IconContainer>
            </div>
        </div>
        <div className={isOver ? 'stage-tasks drag' : 'stage-tasks'} ref={drop}>
            {stage_tasks?.map((task, index) => task.current_stage.name === stage_name
            ? <TaskOverview key={index} task={task}/>
            : null)}
        </div>
        {stage_tasks.length ?
        <div className='stage-status'>
            <h4>Status</h4>
            <p>{((tasksDone / stageTasks.length) * 100).toFixed()}% completed</p>
            <ProgressBar stage={stage} tasksDone={tasksDone} totalTasks={Number(stageTasks.length)}/>
        </div>
        : null}
    </div>
  )
}

export default StageOverview;