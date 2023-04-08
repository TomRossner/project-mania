import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch} from "react-redux";
import { fetchBoardsAsync } from "./store/boards/boards.actions";
import { setCurrentProject } from "./store/project/project.actions";

// Custom Hooks
import useAuth from "./hooks/useAuth";
import useProject from "./hooks/useProject";

//Components
import PrivateRoute from "./components/common/PrivateRoute";
import Spinner from "./components/common/Spinner";
import Projects from "./components/Projects"; 
import ProjectOverview from "./components/ProjectOverview"; 
import Notifications from "./components/Notifications";
import Create from "./components/Create"; 
import ErrorPopup from "./components/ErrorPopup"; 
import NotificationTab from "./components/NotificationTab";
import AdminForm from "./components/forms/AdminForm";
import MoveTaskPopup from "./components/MoveTaskPopup";

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


// Lazy-loading components
const ProjectManagement = lazy(() => import("./components/ProjectManagement")); 
const Profile = lazy(() => import("./components/Profile")); 
const Login = lazy(() => import("./components/Login")); 
const Register = lazy(() => import("./components/Register")); 
const NavBar = lazy(() => import("./components/NavBar")); 
const Task = lazy(() => import("./components/Task")); 
const Logout = lazy(() => import("./components/Logout")); 
const ActivitySection = lazy(() => import("./components/ActivitySection")); 
const TopNav = lazy(() => import("./components/TopNav")); 
const Users = lazy(() => import("./components/Users")); 
const UserCards = lazy(() => import("./components/UserCards"));

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
    if (isAuthenticated) {
      dispatch(fetchBoardsAsync(user._id));
    }

    // If user is not authenticated, set current project to null
    if (!isAuthenticated) dispatch(setCurrentProject(null));
  }, [isAuthenticated]);

  return (
    <Suspense fallback={<Spinner/>}>
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