import ProjectManagement from "./components/ProjectManagement";
import { Route, Routes } from "react-router-dom";
import Projects from "./components/Projects";
import Notifications from "./components/Notifications"
import Profile from "./components/Profile"
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectOverview from "./components/ProjectOverview";
import NavBar from "./components/NavBar";
import Task from "./components/Task";
import Create from "./components/Create";
import ErrorPopup from "./components/ErrorPopup";
import Logout from "./components/Logout";
import { useDispatch} from "react-redux";
import { setCurrentProject, setError } from "./store/project/project.actions";
import RightNav from "./components/RightNav";
import TopNav from "./components/TopNav";
import useAuth from "./hooks/useAuth";
import { fetchBoardsAsync } from "./store/boards/boards.actions";
import Users from "./components/Users";
import PrivateRoute from "./components/common/PrivateRoute";
import NotificationTab from "./components/NotificationTab";
import useProject from "./hooks/useProject";
import AdminForm from "./components/forms/AdminForm";
import UserCards from "./components/UserCards";

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

const App = () => {
  const dispatch = useDispatch();
  const {user, isAuthenticated, refreshUser, error} = useAuth();
  const {notificationTabOpen, handleCreateBoard, handleToggleNotificationTab, adminFormOpen} = useProject();

  useEffect(() => {
    refreshUser();
  }, [])

  useEffect(() => {
    if (user && isAuthenticated) dispatch(fetchBoardsAsync(user._id));
    if (!user || !isAuthenticated) dispatch(setCurrentProject(null));
  }, [user, isAuthenticated])

  return (
    <div className='main'>
      <Create/>
      <ErrorPopup/>
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
            <Route path="/users" element={<PrivateRoute element={<Users/>}/>}/>
          </Routes>
        </div>
        <RightNav/>
        {/* <UserCards/> */}
      </div>
    </div>
  )
}

export default App;