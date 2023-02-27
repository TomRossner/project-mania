import React, { useState } from 'react';
import { BsCircleFill } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { selectProjectMembers, selectAvailableMembers, selectCurrentProject } from '../store/project/project.selector';
import { setCurrentProject } from '../store/project/project.actions';

const ProjectMembers = () => {
    const NUMBER_OF_MEMBERS_TO_DISPLAY = 4;
    const [membersPopUpTabOpen, setMembersPopUpTabOpen] = useState(false);
    const user = useSelector(selectCurrentUser);
    const currentProject = useSelector(selectCurrentProject);
    const projectMembers = useSelector(selectProjectMembers);
    const availableMembers = useSelector(selectAvailableMembers);
    const dispatch = useDispatch();

    const toggleMembersPopUpTab = () => {
        setMembersPopUpTabOpen(!membersPopUpTabOpen);
    }

    const handleAddMember = (member) => {
        if (!member) return;

        const MemberAlreadyAdded = projectMembers.find(m => m._id === member._id);
        if (MemberAlreadyAdded) return;

        else dispatch(setCurrentProject({...currentProject, members: [...currentProject.members, member]}));
    }

  return (
    <>
    <div className='current-board-members-container'>
        <span className='current-board-members'>Members:
        {projectMembers.length > NUMBER_OF_MEMBERS_TO_DISPLAY
        ?
        <>
            {projectMembers.filter((_, index) => index < NUMBER_OF_MEMBERS_TO_DISPLAY)
            .map(member =>
                <span key={member._id} className='icon-span' onClick={() => handleAddMember(member)}>
                    <BsCircleFill className='icon'/>
                    <span className='name-overlay' title={`${member.first_name} ${member.last_name}`}>
                        {member.first_name.substring(0, 1).toUpperCase()}{member.last_name.substring(0, 1).toUpperCase()}
                    </span>
                </span>)}
            <span>+ {projectMembers.filter((_, index) => index > 3).length}</span>
        </>
        : projectMembers.map(member => {
            if (member._id === user._id) {
                return (
                    <span key={member._id} className="icon-span">
                        <BsCircleFill className='icon'/>
                        <span className='name-overlay small' title="You">YOU</span>
                    </span>
                )
            }
            else return (<span key={member._id} className='icon-span'>
                <BsCircleFill className='icon'/>
                <span className='name-overlay' title={`${member.first_name} ${member.last_name}`}>
                    {member.first_name.substring(0, 1).toUpperCase()}{member.last_name.substring(0, 1).toUpperCase()}
                </span>
            </span>)
        }
            )}
            <span className='icon-span add' onClick={toggleMembersPopUpTab}><RxPlus className='icon'/>
            {membersPopUpTabOpen
                ?   <div className='options-menu open'>
                        {availableMembers?.map((member, index) => {
                            if (member._id === user._id) return '';
                            if (projectMembers.find(project_member => project_member._id === member._id)) {
                                return (
                                    <p key={index} className="member-already-in-project" title={`${member.first_name} is already added`}>
                                        {member.first_name} {member.last_name}
                                    </p>
                                )
                            }
                            else return (
                                <p key={index} onClick={() => handleAddMember(member)}>
                                    {member.first_name} {member.last_name}
                                </p>
                            )
                        })}
                    </div>
                : null}
            </span>
        </span>
    </div>
    </>
  )
}

export default ProjectMembers;