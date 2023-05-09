import React, { useEffect } from 'react';
import { BsCircleFill } from "react-icons/bs";
import { RxPlus } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { fetchMembersAsync } from '../store/members/members.actions';
import useProject from '../hooks/useProject';
import { setProjectMembers } from '../store/project/project.actions';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from './common/ProfilePicture';
import { generateKey } from '../utils/keyGenerator';
import BlankProfilePicture from './common/BlankProfilePicture';

const ProjectMembers = () => {
    const NUMBER_OF_MEMBERS_TO_DISPLAY = 4;
    const {userInfo} = useAuth();
    const {projectMembers, handleAddMember, currentProject} = useProject();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate('/users');
    }

    useEffect(() => {
        dispatch(fetchMembersAsync());
    }, []);

    useEffect(() => {
        if (!currentProject) return;

        // Set project members
        dispatch(setProjectMembers(currentProject.members));
        
    }, [currentProject]);

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
                    <>
                        {member.base64_img_data || member.img_url
                            ?   <ProfilePicture
                                    key={generateKey()}
                                    src={member.base64_img_data || member.img_url}
                                    title={`${member.first_name} ${member.last_name}`}
                                />
                            :   <BlankProfilePicture title={`${member.first_name} ${member.last_name}`}/>
                        }
                    </>
                )}
                <span>+ {projectMembers.filter((_, index) => index > 3).length}</span>
            </div>
            :
            <div className='team'>
                {projectMembers?.map(member => {
                    if (member._id === userInfo?._id) {
                        return (
                            <>
                                {member.base64_img_data || member.img_url
                                    ?   <ProfilePicture
                                            key={generateKey()}
                                            src={userInfo?.base64_img_data || userInfo?.img_url}
                                            title={`${userInfo?.first_name} ${userInfo?.last_name}`}
                                        />
                                    :   <BlankProfilePicture title={`${userInfo?.first_name} ${userInfo?.last_name}`}/>
                                }
                            </>
                        )
                    } else return (
                        <>
                            {member.base64_img_data || member.img_url
                                ?   <ProfilePicture
                                        key={generateKey()}
                                        src={member.base64_img_data || member.img_url}
                                        title={`${member.first_name} ${member.last_name}`}
                                    />
                                :   <BlankProfilePicture title={`${member.first_name} ${member.last_name}`}/>
                            }
                        </>
                    )
                })}
            </div>
            }
        <span className='icon-span add' onClick={handleNavigate}><RxPlus className='icon'/></span>
        </div>
    </div>
    </>
  )
}

export default ProjectMembers;