import React from 'react'

const About = () => {
  return (
    <div className='container home'>
        <h3>About</h3>
        
        <h4>Goal</h4>
        <p>ProjectMania's goal is to keep track of projects, allowing users to create dashboards to easily manage their project by seperating tasks by including them in different lists or stages.<br/><br/> Tasks can be moved and/or dragged to each stage/list, which helps keeping track of what needs to be done and whats already completed, aswell as what's in progress, but take it how you want it, the point of lists is to help you be organized.</p>
        
        <h4>Features</h4>

        <div className='home-features'>
            <div className='feature'>
            <h5>Dashboards</h5>
            <ul>
                <li>Create dashboards, stages, tasks</li>
                <li>Stages can only be created in a project, and tasks can only be created inside a stage</li>
                <li>Tasks can be dragged or moved between stages</li>
                <li>Dashboard and stage titles can be edited</li>
                <li>Each stage has its own progress bar which shows the completion percentage of that same stage, and is updated when tasks are moved between the stages</li>
                <li>Tasks can be marked as completed and uncompleted which updates the progress bar of the stage they are currently in</li>
                <li>Each dashboard has its own history positioned on the right side, which tracks changes in the project such as tasks moved or created, stage names changed, etc...</li>
            </ul>
            </div>
            <div className='feature'>
            <h5>Users</h5>
            <ul>
                <li>Users can sign up and sign in with their email and password or with their Google account</li>
                <li>Users can only see the projects they are included in</li>
                <li>Project members can be added to your project either in the project creation form or from the dashboard navigation bar after the dashboard is created</li>
                <li>Users can be project admins by filling in the admin passcode</li>
                <li>The user who created the dashboard is automatically added to the project members and is automatically a project admin</li>
                <li>Admins have more privileges than regular members</li>
                <li>Users can look for other users, see their profile and chat with them</li>
                <li>Chats allow users to chat between them</li>
                <li>Users can search for other users in the chat section and start conversations with them</li>
                <li>Users can add others to their favorites</li>
                <li>Chats with favorites are displayed above the regular chats and are updated as favorites change</li>
                <li>Users can see if other users are online/offline and when they were last seen</li>
                <li>Online status is updated when users connect/disconnect</li>
            </ul>
            </div>

        </div>
    </div>
  )
}

export default About