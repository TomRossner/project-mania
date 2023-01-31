import React from 'react';
import NavBar from './NavBar';
import { useContext } from 'react';
import { ProjectContext } from '../contexts/ProjectContext';
import Create from './Create';
import ProjectOverview from './ProjectOverview';


const ProjectManagement = () => {
  const {open} = useContext(ProjectContext);

  return (
    <>
      <NavBar/>
      <section>
        {open ? <Create/> : <ProjectOverview/>}
      </section>
    </>
  )
}

export default ProjectManagement;