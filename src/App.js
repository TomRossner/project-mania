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
import { fetchUserAsync, setIsAuthenticated, setUser } from "./store/auth/auth.actions";
import { getUser } from "./httpRequests/auth";
import { selectCurrentProject, selectProject } from "./store/project/project.selector";
import { updateProject } from "./httpRequests/projectsRequests";
import { setCreatePopupOpen, setCurrentProject, setElement } from "./store/project/project.actions";
import RightNav from "./components/RightNav";
import TopNav from "./components/TopNav";
import useAuth from "./hooks/useAuth";
import { selectBoards } from "./store/boards/boards.selector";
import { fetchBoardsAsync } from "./store/boards/boards.actions";

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

  const refreshUser = () => {
    dispatch(setUser(getUser()));
  }

  const handleCreateBoard = () => {
    dispatch(setCreatePopupOpen(true));
    dispatch(setElement("board"));
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
  }, [currentProject])

  useEffect(() => {
    refreshUser();
  }, [])

  useEffect(() => {
    if (user && isAuthenticated) dispatch(fetchBoardsAsync(user._id));
    if (!user || !isAuthenticated) dispatch(setCurrentProject(null));
  }, [user])

  return (
    <div className='main'>
      <Create/>
      <ErrorPopup/>
      <div className="sections-container">
        <NavBar/>
        <div className="main-content">
          <TopNav fn={handleCreateBoard}/>
          <Routes>
            <Route path="/" element={<ProjectManagement/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/projects/:id" element={<ProjectOverview/>}/>
            <Route path="/projects/:id/notifications" element={<Notifications/>}/>
            <Route path="/projects/:id/:stage_id/:task_id" element={<Task/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/sign-up" element={<Register/>}/>
          </Routes>
          <div className="flex1"></div>
        </div>
        <RightNav></RightNav>
      </div>
    </div>
  )
}

export default App;