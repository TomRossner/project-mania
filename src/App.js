import ProjectManagement from "./components/ProjectManagement";
import { Route, Routes } from "react-router-dom";
import Projects from "./components/Projects";
import Notifications from "./components/Notifications"
import Profile from "./components/Profile"
import { useContext } from "react";
import { ProjectContext } from "./contexts/ProjectContext";
import NotificationTab from "./components/NotificationTab";
import ProfileTab from "./components/ProfileTab";
import Login from "./components/Login";
import Register from "./components/Register";

// Styles
import "./styles/main-styles.scss";
import "./styles/nav-styles.scss";
import "./styles/create-styles.scss";
import "./styles/input-styles.scss";
import "./styles/form-styles.scss";
import "./styles/project-overview-styles.scss";
import "./styles/task-styles.scss";
import "./styles/notification-tab-styles.scss";
import "./styles/projects-styles.scss";
import "./styles/profile-tab-styles.scss";
import "./styles/back-button-styles.scss";


const App = () => {
  const {notificationTabOpen, profileTabOpen} = useContext(ProjectContext);
  return (
    <div className='main'>
      {notificationTabOpen ? <NotificationTab/> : null}
      {profileTabOpen ? <ProfileTab/> : null}
    <Routes>
        <Route path="/" element={<ProjectManagement/>}/>
        <Route path="projects" element={<Projects/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
    </Routes>
    </div>
  )
}

export default App;