import React from 'react';
import { dueDateFormat } from '../../../utils/timeFormats';
import LabelsContainer from '../../common/LabelsContainer';
import { generateKey } from '../../../utils/keyGenerator';
import BlankProfilePicture from '../../common/BlankProfilePicture';
import ProfilePicture from '../../common/ProfilePicture';
import Space from '../../common/Space';
import ProgressBar from '../../common/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProject } from '../../../store/project/project.actions';
import useProject from '../../../hooks/useProject';

const ListedProject = ({project}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {totalCompletedTasks, totalTasks, percentage} = useProject();

    // Set currentProject when clicking on a project
    const handleClick = (board) => {
        dispatch(setCurrentProject(board));
        navigate(`/projects/${board._id}`);
    }

  return (
    <div className='project' onClick={() => handleClick(project)} title={`Open ${project.title}`}>
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
}

export default ListedProject;