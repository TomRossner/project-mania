import ProjectManagement from "./components/ProjectManagement";
import { Route, Routes } from "react-router-dom";
import Projects from "./components/Projects";
import Notifications from "./components/Notifications"
import Profile from "./components/Profile"
import { useEffect } from "react";
import NotificationTab from "./components/NotificationTab";
import ProfileTab from "./components/ProfileTab";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectOverview from "./components/ProjectOverview";
import NavBar from "./components/NavBar";
import Task from "./components/Task";
import Create from "./components/Create";
import ErrorPopup from "./components/ErrorPopup";
import Logout from "./components/Logout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/user/user.actions";
import { getUser, getUserInfo } from "./httpRequests/auth";
import { selectCurrentProject, selectProject, selectUserProjects } from "./store/project/project.selector";
import { updateProject } from "./httpRequests/projectsRequests";
import SearchBar from "./components/common/SearchBar";
import { selectCurrentUser } from "./store/user/user.selector";
import {BsBell, BsPlus, BsPersonCircle} from "react-icons/bs";
import IconContainer from "./components/common/IconContainer";
import { getProjects } from "./httpRequests/projectsRequests";
import { setBoards, setCreatePopupOpen, setElement } from "./store/project/project.actions";

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
import RightNav from "./components/RightNav";
import TopNav from "./components/TopNav";

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
  const {notificationTabOpen, profileTabOpen} = useSelector(selectProject);
  const currentProject = useSelector(selectCurrentProject);
  const currentUser = useSelector(selectCurrentUser);
  const boards = useSelector(selectUserProjects);

  const loadUser = () => dispatch(setUser(getUser()));

  const handleCreateBoard = () => {
    dispatch(setCreatePopupOpen(true));
    dispatch(setElement("board"));
  }

  const update = async (project) => {
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
    loadUser();
  }, [])

  useEffect(() => {
    if (currentUser && !boards.length){
      const loadBoards = () => {
        return async (dispatch) => {
          const {data} = await getProjects(currentUser._id);
          dispatch(setBoards(data));
        }
      }
      dispatch(loadBoards());
    }
  }, [currentUser])

  return (
    <div className='main'>
      <Create/>
      <div className="sections-container">
        <NavBar/>
        <ErrorPopup/>
        <div className="main-content">
          <TopNav fn={handleCreateBoard}/>
            {/* {notificationTabOpen ? <NotificationTab/> : null}
            {profileTabOpen ? <ProfileTab/> : null} */}
          <Routes>
            <Route path="/" element={<ProjectManagement/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/projects/:id" element={<ProjectOverview/>}/>
            <Route path="/projects/:id/notifications" element={<Notifications/>}/>
            <Route path="/projects/:id/:stage_id/:task_id" element={<Task/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
          <div className="flex1"></div>
        </div>
        <RightNav></RightNav>
      </div>
    </div>
  )
}

export default App;