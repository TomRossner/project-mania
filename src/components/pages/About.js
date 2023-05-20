import React from 'react';
import loginForm from "../../assets/projectmania/signin-form-mobile.png";
import signUpForm from "../../assets/projectmania/signup-form-mobile.png";
import dashboard from "../../assets/projectmania/dashboard-desktop.png";
import dashboardMobile from "../../assets/projectmania/dashboard-mobile.png";
import chat from "../../assets/projectmania/chat-mobile.png";
import chats from "../../assets/projectmania/chats-list-mobile.png";
import menuMobile from "../../assets/projectmania/menu-mobile.png";
import activityMobile from "../../assets/projectmania/activity-mobile.png";
import newTaskForm from "../../assets/projectmania/new-task-form.png";

const About = () => {
  return (
    <div className='container home'>
        <h3>About</h3>
        
        <div className='about-showcase'>
          <h4>Goal</h4>
          <p>ProjectMania's goal is to keep track of projects, allowing users to create dashboards to easily manage their project by separating tasks between different stages.<br/><br/> Tasks can be moved and/or dragged to each stage/list, which helps keeping track of what needs to be done and whats already completed, as well as what's in progress, but take it how you want it, the point of lists is to help you be organized.</p>
          <img src={dashboard} alt='Dashboard showcase'/>
          <span>ProjectMania on desktop</span>
        </div>
        
        <h4>Features</h4>

        <div className='home-features'>



          <div className='feature'>

            <div className='grid-2'>
              <div className='grid-item'>
                <img className='feature-img' src={signUpForm} alt='feature'/>
                <span className='feature-img-desc'>Sign up form</span>
              </div>

              <div className='grid-item'>
                <img className='feature-img' src={loginForm} alt='feature'/>
                <span className='feature-img-desc'>Sign in form</span>
              </div>
            </div>
            
            <div className='feature-text-content'>
              <h2>Auth - Login/Sign up forms</h2>
              <p>In order to use ProjectMania and its features, the user needs to authenticate himself. ProjectMania provides 2 ways of authentication -- either via Email & password or using Google.</p>
            </div>

          </div>



          <div className='feature'>

            <div className='feature-imgs'>

              <div className='grid-item'>
                <img className='feature-img' src={menuMobile} alt='feature'/>
                <span className='feature-img-desc'>Navigation menu</span>
              </div>
            </div>
            
            <div className='feature-text-content'>
              <h2>Navigate through our menu</h2>
              <p>Navigate through ProjectMania's menu to easily access its different features.</p>
            </div>

          </div>



          <div className='feature'>

            <div className='feature-imgs grid-2'>
              <div className='grid-item'>
                <img className='feature-img' src={newTaskForm} alt='feature'/>
                <span className='feature-img-desc'>Task form</span>
              </div>

              <div className='grid-item'>
                <img className='feature-img' src={dashboardMobile} alt='feature'/>
                <span className='feature-img-desc'>Dashboard on mobile device</span>
              </div>
            </div>
            
            <div className='feature-text-content'>
              <h2>Organize - Create dashboards, stages and tasks</h2>
              <p>ProjectMania is made to help you stay organized whilst keeping track of your tasks. Create dashboards for different projects, each dashboard defaults with 3 stages, so just create your tasks and be organized from the start!</p>
            </div>

          </div>



          <div className='feature'>

            <div className='feature-imgs'>

              <div className='grid-item'>
                <img className='feature-img' src={activityMobile} alt='feature'/>
                <span className='feature-img-desc'>Project activity</span>
              </div>
                
            </div>
            
            <div className='feature-text-content'>
              <h2>Activity - Keep track of your tasks</h2>
              <p>Either you created a new project, moved a task to another stage, or added a new member to the project, keep track of your project activity as you progress and make changes.</p>
            </div>

          </div>



          <div className='feature'>

            <div className='feature-imgs grid-2'>

              <div className='grid-item'>
                <img className='feature-img' src={chats} alt='feature'/>
                <span className='feature-img-desc'>Chats list</span>
              </div>

              <div className='grid-item'>
                <img className='feature-img' src={chat} alt='feature'/>
                <span className='feature-img-desc'>Chat</span>
              </div>

            </div>
            
            <div className='feature-text-content'>
              <h2>Discuss - Chat with other users</h2>
              <p>Chat with other users or with your project members and stay up to date by keeping in touch.</p>
            </div>

          </div>
        </div>
    </div>
  )
}

export default About;