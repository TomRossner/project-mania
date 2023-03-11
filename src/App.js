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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/auth/auth.actions";
import { getUser } from "./httpRequests/auth";
import { selectCurrentProject, selectProject } from "./store/project/project.selector";
import { updateProject } from "./httpRequests/projectsRequests";
import { setCreatePopupOpen, setCurrentProject, setElement } from "./store/project/project.actions";
import RightNav from "./components/RightNav";
import TopNav from "./components/TopNav";
import useAuth from "./hooks/useAuth";
import { fetchBoardsAsync } from "./store/boards/boards.actions";
import Users from "./components/Users";
import PrivateRoute from "./components/common/PrivateRoute";
import Space from "./components/common/Space";
import { setNotificationTabOpen, setProfileTabOpen, setTasks } from "./store/project/project.actions";
import NotificationTab from "./components/NotificationTab";

// Styles
import "./styling/general.styles.scss";
import "./styling/navbar.styles.scss";
import "./styling/search-bar.styles.scss";
import "./styling/top-nav.styles.scss";
import "./styling/project-info-bar.styles.scss";
import "./styling/project-members.styles.scss";
import "./styling/project-stages.styles.scss";
import "./styling/create-form.styles.scss";
import "./styling/form.styles.scss";
import "./styling/label.styles.scss";
import "./styling/task-overview.styles.scss";
import "./styling/input-container.styles.scss";
import "./styling/right-nav.styles.scss";
import "./styling/auth.styles.scss";
import "./styling/back-button.styles.scss";
import "./styling/spinner.styles.scss";
import "./styling/users.styles.scss";
import "./styling/notifications.styles.scss";
import "./styling/activity.styles.scss";

// Styles
// import "./styles/main-styles.scss";
// import "./styles/nav-styles.scss";
// import "./styles/create-styles.scss";
// import "./styles/input-styles.scss";
// import "./styles/form-styles.scss";
// import "./styles/project-overview-styles.scss";
// import "./styles/task-overview-styles.scss";
// import "./styles/notification-tab-styles.scss";
// import "./styles/projects-styles.scss";
// import "./styles/profile-tab-styles.scss";
// import "./styles/back-button-styles.scss";
// import "./styles/progress-bar-styles.scss";
// import "./styles/project-info-bar-styles.scss";
// import "./styles/project-members-styles.scss";
// import "./styles/error-popup-styles.scss";
// import "./styles/task-styles.scss";
// import "./styles/chat-styles.scss";
// import "./styles/chat-message-styles.scss";
// import "./styles/project-stages-styles.scss";
// import "./styles/spinner-styles.scss";
// import "./styles/label-styles.scss";
// import "./styles/labels-container-styles.scss";
// import "./styles/three-dots-menu-styles.scss";

const App = () => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);
  const {user, isAuthenticated} = useAuth();
  const {notificationTabOpen, profileTabOpen} = useSelector(selectProject)

  const refreshUser = () => {
    dispatch(setUser(getUser()));
  }

  const handleCreateBoard = () => {
    dispatch(setCreatePopupOpen(true));
    dispatch(setElement("board"));
  }

  const handleToggleNotificationTab = () => {
    dispatch(setNotificationTabOpen(!notificationTabOpen));
    if (profileTabOpen) dispatch(setProfileTabOpen(false));
  }

  const update = async (project) => {
    if (!project) return;

    try {
        await updateProject(project);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    if (!currentProject) return;
    update(currentProject);

    // Each time currentProject changes update tasks
    const projectTasks = currentProject?.stages.map(stage => {
      return stage.stage_tasks.map(task => task);
      // Each stage is returned as an array, so projectTasks is an array of arrays
    })
    dispatch(setTasks(projectTasks.flatMap(arr => arr)));
  }, [currentProject])

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
          <Space/>
        </div>
        <RightNav/>
      </div>
    </div>
  )
}

export default App;