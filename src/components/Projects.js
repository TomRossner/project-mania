import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../store/project/project.actions';
import useProject from '../hooks/useProject';
import Spinner from './common/Spinner';
import LabelsContainer from './common/LabelContainer';
import { generateKey } from '../utils/keyGenerator';
import ProfilePicture from './common/ProfilePicture';
import BlankProfilePicture from './common/BlankProfilePicture';
import { dueDateFormat } from '../utils/timeFormats';
import ProgressBar from './common/ProgressBar';
import Space from './common/Space';
import IconContainer from './common/IconContainer';
import { BsCircle } from 'react-icons/bs';

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {boards: projects, isLoading, handleCreateBoard} = useProject();

  const handleClick = (board) => {
    dispatch(setCurrentProject(board));
    navigate(`/projects/${board._id}`);
  }

  // Total tasks
  const totalTasks = (board) => {
    const totalTasks = board.stages.reduce((totalCount, stage) => {
      return totalCount + stage.stage_tasks.length;
    }, 0);
  
    return totalTasks;
  };

  // Total completed tasks
  const totalCompletedTasks = (board) => {
    const completedTasks = board.stages.reduce((stageCount, stage) => {
      const tasksDone = stage.stage_tasks.reduce((taskCount, task) => {
        return taskCount + (task.isDone === true ? 1 : 0);
      }, 0);
      
      return stageCount + (tasksDone > 0 ? 1 : 0);
    }, 0);
  
    return completedTasks;
  };

  const percentage = (board) => {
    const tasks = totalTasks(board);
    const completedTasks = totalCompletedTasks(board);

    if (!tasks && !completedTasks) return 0;

    const percentage = (completedTasks / tasks) * 100;

    return percentage.toFixed();
  }

  return (
    <div className='projects-list-container'>
      <h1>My Projects</h1>
      {isLoading ? <Spinner width={'80px'}/>
      : <>
          {projects?.length ?
            <div className='projects-list'>
              {projects.map(project => {
                return (
                  <div key={project._id} className='project' onClick={() => handleClick(project)} title={`Open ${project.title}`}>
                    <div className='flex-align space-between gap1 flex1'>
                      <h3>{project.title}</h3>
                      <LabelsContainer content={<p>{dueDateFormat(new Date(project.due_date))}</p>} additionalClass={'no-hover'}/>
                    </div>
                    <p>Team <span>({project.members.length})</span></p>
                    <div className='team flex-align'>{project.members.map(member =>
                        <span key={member._id}>
                          {member.base64_img_data || member.img_url
                              ?   <ProfilePicture
                                      key={generateKey()}
                                      src={member.base64_img_data || member.img_url}
                                      title={`${member.first_name} ${member.last_name}`}
                                  />
                              :   <BlankProfilePicture key={generateKey()} title={`${member.first_name} ${member.last_name}`}/>
                          }
                        </span>
                      )}
                    </div>
                    <div id='project-progress'>
                      <div className='flex-align space-between'>
                        <h4>Status</h4>
                        <p title={`${totalTasks(project)} total tasks from ${project.stages.length} stages`}><span>{totalTasks(project)}</span> total tasks</p>
                      </div>
                      <div className='flex-align space-between'>
                        <Space/>
                        <span>{percentage(project)}% completed</span>
                      </div>
                      <ProgressBar totalTasks={totalTasks(project)} tasksDone={totalCompletedTasks(project)}/>
                    </div>
                  </div>
                )
              })}
            </div>
            : <div id='no-projects'>
                <p>No projects found</p>
                <button className='btn blue' onClick={handleCreateBoard}>Create a project</button>
              </div>
            }
        </>
      }
    </div>
  )
}

export default Projects;