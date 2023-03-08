import React, { useEffect, useState } from 'react';
import { BsCircleFill } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject } from '../store/project/project.selector';
import { setCurrentProject } from '../store/project/project.actions';
import useAuth from '../hooks/useAuth';
import { fetchMembersAsync } from '../store/members/members.actions';
import {selectMembers} from "../store/members/members.selector";
import { selectProjectMembers } from '../store/projectMembers/projectMembers.selector';
import { setProjectMembers } from '../store/projectMembers/projectMembers.actions';

const ProjectMembers = () => {
    const NUMBER_OF_MEMBERS_TO_DISPLAY = 4;
    const [membersPopUpTabOpen, setMembersPopUpTabOpen] = useState(false);
    const {userInfo, user} = useAuth();
    const currentProject = useSelector(selectCurrentProject);
    const projectMembers = useSelector(selectProjectMembers);
    const dispatch = useDispatch();
    const members = useSelector(selectMembers);

    const toggleMembersPopUpTab = () => {
        return setMembersPopUpTabOpen(!membersPopUpTabOpen);
    }

    const handleAddMember = (member) => {
        if (!member) return;

        const MemberAlreadyAdded = projectMembers.find(m => m._id === member._id);
        if (MemberAlreadyAdded) return;

        else dispatch(setCurrentProject({...currentProject, members: [...currentProject.members, member]}));
    }

    useEffect(() => {
        dispatch(fetchMembersAsync());
    }, [])

    // useEffect(() => { // Update project members each time projectMembers changes
    //     dispatch(setCurrentProject({...currentProject, members: projectMembers}));
    // }, projectMembers) // LINE 32 DOES THAT

  return (
    <>
    <div className='current-board-members-container'>
        <h3 className='current-board-members'>TEAM</h3>
        <div className='team-container'>
            {projectMembers.length > NUMBER_OF_MEMBERS_TO_DISPLAY
            ?
            <div className='team'>
                {projectMembers.filter((_, index) => index < NUMBER_OF_MEMBERS_TO_DISPLAY)
                .map(member =>
                    <span key={member._id} className='icon-span' onClick={() => handleAddMember(member)}>
                        <BsCircleFill className='icon'/>
                        <span className='name-overlay' title={`${member.first_name} ${member.last_name}`}>
                            {member.first_name.substring(0, 1).toUpperCase()}{member.last_name.substring(0, 1).toUpperCase()}
                        </span>
                    </span>)}
                <span>+ {projectMembers.filter((_, index) => index > 3).length}</span>
            </div>
            :
            <div className='team'>
            {projectMembers.map(member => {
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
            })}
            </div>
            }
        <span className='icon-span add' onClick={toggleMembersPopUpTab}><RxPlus className='icon'/>
        {membersPopUpTabOpen
            ?   <div className='options-menu open'>
                    {members.map((member, index) => {
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
        </div>
    </div>
    </>
  )
}

export default ProjectMembers;