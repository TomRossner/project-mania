import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';
import StageOverview from './StageOverview';
import { setCurrentProject, setCreatePopupOpen, setElement } from '../store/project/project.actions';

const ProjectStagesContainer = () => {
  const currentProject = useSelector(selectCurrentProject);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  const handleCreate = (type) => {
    closeStageOptionMenus();
    dispatch(setCreatePopupOpen(true));
    dispatch(setElement(type));
  }

  const closeStageOptionMenus = () => {
    return dispatch(setCurrentProject({...currentProject, stages: [...currentProject.stages.map(stage => {
        if (stage.options_menu_open) {
            return {...stage, options_menu_open: false};
        } else return stage;
    })]}));
  }

  useEffect(() => {
    if (currentProject) {
        const currentProjectTasks = currentProject?.stages.every(stage => !stage.stage_tasks.length);
        if (currentProjectTasks) setTasks([]);
    }
  }, [])

  return (
    <>
    {currentProject?.stages.length ?
      <div className='current-board-stages-container'>
          {currentProject?.stages?.map((stage) => {
              return (<StageOverview key={stage._id} stage={stage}/>)})}
      </div> :
      <div className='create-to-get-started'>
        <h3>Create a stage to get started</h3>
        <button className='btn blue' onClick={() => handleCreate("stage")}>Create a stage</button>
      </div>
    }
    {currentProject?.stages.length && tasks.length ? null :
      <div className='create-to-get-started'>
        <h3>Create a task to get started</h3>
        <button className='btn blue' onClick={() => handleCreate("task")}>Create a task</button>
      </div>
    }
    </>
  )
}

export default ProjectStagesContainer;