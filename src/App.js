import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch} from "react-redux";
import { fetchBoardsAsync } from "./store/boards/boards.actions";
import { setCurrentProject } from "./store/project/project.actions";
import {io} from "socket.io-client";
import useAuth from "./hooks/useAuth";
import useProject from "./hooks/useProject";
import PrivateRoute from "./components/common/PrivateRoute";

// Styles
import "./styles/general.styles.scss";
import "./styles/navbar.styles.scss";
import "./styles/search-bar.styles.scss";
import "./styles/top-nav.styles.scss";
import "./styles/project-info-bar.styles.scss";
import "./styles/project-members.styles.scss";
import "./styles/project-stages.styles.scss";
import "./styles/create-form.styles.scss";
import "./styles/form.styles.scss";
import "./styles/label.styles.scss";
import "./styles/task-overview.styles.scss";
import "./styles/input-container.styles.scss";
import "./styles/right-nav.styles.scss";
import "./styles/auth.styles.scss";
import "./styles/back-button.styles.scss";
import "./styles/spinner.styles.scss";
import "./styles/users.styles.scss";
import "./styles/notifications.styles.scss";
import "./styles/activity.styles.scss";
import "./styles/progress-bar.styles.scss";
import "./styles/profile.styles.scss";
import "./styles/user-header.styles.scss";
import "./styles/clock.styles.scss";

const ProjectManagement = lazy(() => import("./components/ProjectManagement")); 
const Projects = lazy(() => import("./components/Projects")); 
const Notifications = lazy(() => import("./components/Notifications")); 
const Profile = lazy(() => import("./components/Profile")); 
const Login = lazy(() => import("./components/Login")); 
const Register = lazy(() => import("./components/Register")); 
const ProjectOverview = lazy(() => import("./components/ProjectOverview")); 
const NavBar = lazy(() => import("./components/NavBar")); 
const Task = lazy(() => import("./components/Task")); 
const Create = lazy(() => import("./components/Create")); 
const ErrorPopup = lazy(() => import("./components/ErrorPopup")); 
const Logout = lazy(() => import("./components/Logout")); 
const ActivitySection = lazy(() => import("./components/ActivitySection")); 
const TopNav = lazy(() => import("./components/TopNav")); 
const Users = lazy(() => import("./components/Users")); 
const NotificationTab = lazy(() => import("./components/NotificationTab"));
const AdminForm = lazy(() => import("./components/forms/AdminForm"));
const UserCards = lazy(() => import("./components/UserCards"));
const MoveTaskPopup = lazy(() => import("./components/MoveTaskPopup"));

const App = () => {
  const dispatch = useDispatch();
  const {user, isAuthenticated, refreshUser} = useAuth();
  const {
    notificationTabOpen,
    handleCreateBoard,
    handleToggleNotificationTab,
    adminFormOpen,
    moveTaskPopupOpen,
    currentProject
  } = useProject();

  const [userCardsActive, setUserCardsActive] = useState(false);

  useEffect(() => {
    refreshUser();
  }, [])

  useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(fetchBoardsAsync(user._id));
      // const socket = io("http://localhost:5000/");
      // socket.emit('connection', {message: 'Hello Tom'})
    }

    // If user is not authenticated, set current project to null
    if (!user || !isAuthenticated) dispatch(setCurrentProject(null));
  }, [user, isAuthenticated])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='main'>
      <Create/>
      <ErrorPopup/>
      {moveTaskPopupOpen && <MoveTaskPopup/>}
      {adminFormOpen && <AdminForm/>}
      <div className="sections-container">
        <NavBar/>
        <div className="main-content">
          {notificationTabOpen ? <NotificationTab/> : null}
          <TopNav fn={handleCreateBoard} fn2={handleToggleNotificationTab}/>
          <Routes>
            <Route path="/" element={<PrivateRoute element={<ProjectManagement/>}/>}/>
            <Route path="/projects" element={<PrivateRoute element={<Projects/>}/>}/>
            <Route path="/projects/:id" element={<PrivateRoute element={<ProjectOverview/>}/>}/>
            <Route path="/projects/:id/notifications" element={<PrivateRoute element={<Notifications/>}/>}/>
            <Route path="/projects/:id/:stage_id/:task_id" element={<PrivateRoute element={<Task/>}/>}/>
            <Route path="/profile" element={<PrivateRoute element={<Profile/>}/>}/>
            <Route path="/logout" element={<PrivateRoute element={<Logout/>}/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/sign-up" element={<Register/>}/>
            <Route path="/users" element={<PrivateRoute element={<Users setUserCardsActive={setUserCardsActive}/>}/>}/>
          </Routes>
        </div>
        {!userCardsActive && currentProject && <ActivitySection/>}
        {userCardsActive && <UserCards/>}
      </div>
    </div>
    </Suspense>
  )
}

export default App;