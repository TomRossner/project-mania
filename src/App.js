import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch} from "react-redux";
import { fetchBoardsAsync, setBoards } from "./store/boards/boards.actions";
import { setCurrentProject } from "./store/project/project.actions";
import { setUserInfo, fetchUserInfoAsync } from "./store/userInfo/userInfo.actions";
import { setElement } from "./store/globalStates/globalStates.actions";
import { emitDisconnection, emitOnline } from "./utils/socket";
import { setChat, setCurrentContact } from "./store/chat/chat.actions";

// Custom Hooks
import useAuth from "./hooks/useAuth";
import useProject from "./hooks/useProject";
import useChat from "./hooks/useChat";
import useSocketEvents from "./hooks/useSocketEvents";

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
import Home from "./components/Home";
import About from "./components/About";
import ChangePriorityPopup from "./components/ChangePriorityPopup";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import AdminModal from "./components/AdminModal";

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
import "./styles/chat.styles.scss";
import "./styles/contact.styles.scss";
import "./styles/conversation.styles.scss";
import "./styles/chat-input-field.styles.scss";
import "./styles/chat-message.styles.scss";
import "./styles/logo.styles.scss";
import "./styles/chat-favorites.styles.scss";
import "./styles/home.styles.scss";
import "./styles/about.styles.scss";
import "./styles/projects.styles.scss";
import "./styles/user-tab.styles.scss";
import "./styles/footer.styles.scss";
import "./styles/not-found.styles.scss";

// Lazy-loading components
const Profile = lazy(() => import("./components/Profile")); 
const Login = lazy(() => import("./components/Login")); 
const Register = lazy(() => import("./components/Register")); 
const NavBar = lazy(() => import("./components/NavBar")); 
const Task = lazy(() => import("./components/Task")); 
const Logout = lazy(() => import("./components/Logout")); 
const ActivitySection = lazy(() => import("./components/ActivitySection")); 
const TopNav = lazy(() => import("./components/TopNav")); 
const Users = lazy(() => import("./components/Users")); 
const Chat = lazy(() => import("./components/chat/ChatApp"));

const App = () => {
  const dispatch = useDispatch();

  const {
    user,
    isAuthenticated,
    userInfo,
    emittedConnection,
    error: authError,
    loadProfileImage,
    setEmittedConnection
  } = useAuth();

  const {
    notificationTabOpen,
    handleCreateBoard,
    handleToggleNotificationTab,
    adminFormOpen,
    moveTaskPopupOpen,
    currentProject,
    update,
    updateCurrentProjectInBoardsArray,
    checkIfAdmin,
    createPopupOpen,
    showError,
    changePriorityPopupOpen,
    adminModalOpen
  } = useProject();
  
  const {
    error: chatError,
    currentContact,
    getContactInfo,
    currentChat
  } = useChat();

  // Handle user has connected
  const handleIsOnline = async (data) => {
    if (data.userId === currentContact?._id && currentContact?.online === false) {
        const contact = await getContactInfo(data.userId);
        dispatch(setCurrentContact(contact));
        return;
    } else return;
  }

  // Handle user went offline
  const handleIsOffline = async (data) => {
    if (data.userId === currentContact?._id && currentContact?.online === true) {
        const contact = await getContactInfo(data.userId);
        dispatch(setCurrentContact(contact));
        return;
    } else return;
  }

  // Listen to online/offline socket events
  useSocketEvents({
    events: {
      online: handleIsOnline,
      offline: handleIsOffline,
    },
  });

  /**********************************
      PROJECT RELATED SIDE EFFECTS
  ***********************************/



  useEffect(() => {
      if (!currentProject) return;
      
      // Update project;
      update(currentProject);

      // Update boards every time currentProject changes
      updateCurrentProjectInBoardsArray();

  }, [currentProject]);



  useEffect(() => {
    if (!userInfo || !currentProject) return;

    // Check if user is an admin
    checkIfAdmin();

  }, [currentProject]);



  useEffect(() => {
    if (user && isAuthenticated) {
      // Fetch user's projects from server/database
      dispatch(fetchBoardsAsync(user._id));
    }

    // If user is not authenticated, set current project to null and empty projects array
    if (!isAuthenticated) {
      dispatch(setCurrentProject(null));
      dispatch(setBoards([]));
      // socket.emit('clientDisconnect', { socketId: socket.id });
    }
  }, [user, isAuthenticated]);


  // Reset element every time popup is closed 
  useEffect(() => {
      if (!createPopupOpen) dispatch(setElement(""));
  }, [createPopupOpen]);




  /********************************
      USER RELATED SIDE EFFECTS
  *********************************/



  useEffect(() => {
      if (!user || !isAuthenticated) {
        dispatch(setUserInfo(null));
        if (currentChat) dispatch(setChat(null));
      }
  }, [user, isAuthenticated]);

  useEffect(() => {
      if ((user && isAuthenticated && !userInfo)
      || (user && isAuthenticated && user.email !== userInfo?.email)) {
          dispatch(fetchUserInfoAsync(user._id || user.user_id));
      }

      if ((!user || !isAuthenticated) && userInfo) {
        dispatch(setUserInfo(null));
      }
  }, [user, isAuthenticated, userInfo]);



  useEffect(() => {
      if (!userInfo) return setEmittedConnection(false);
      
      if (userInfo && !emittedConnection) {
          const userName = `${userInfo?.first_name} ${userInfo?.last_name}`;

          emitOnline(userName, userInfo?._id);

          setEmittedConnection(true);
      }
  }, [userInfo]);


  
  // Handle login error
  useEffect(() => {
      if ((authError || chatError) && !user) {
          const {response: {data: {error: errorMessage}}} = authError || chatError;
          showError(errorMessage);
      }
  }, [authError, chatError]);



  // Update profile image
  useEffect(() => {
      if (!userInfo) return;

      loadProfileImage();

  }, [userInfo]);



  // Emitting disconnection to update online status when the user closes browser/reloads page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();

      // Emit disconnection
      emitDisconnection();
    };

    // Before-Unload listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  return (
    <Suspense fallback={<Spinner/>}>
      <div className='main'>
        <Create/>
        <ErrorPopup/>
        {changePriorityPopupOpen && <ChangePriorityPopup/>}
        {moveTaskPopupOpen && <MoveTaskPopup/>}
        {adminFormOpen && <AdminForm/>}
        {adminModalOpen && <AdminModal/>}
        <div className="sections-container">
          <NavBar/>
          <div className="main-content">
            {notificationTabOpen ? <NotificationTab/> : null}

            <TopNav handleCreateBoard={handleCreateBoard} handleToggleNotificationTab={handleToggleNotificationTab}/>

            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/projects" element={<PrivateRoute element={<Projects/>}/>}/>
              <Route path="/projects/:id" element={<PrivateRoute element={<ProjectOverview/>}/>}/>
              <Route path="/projects/:id/notifications" element={<PrivateRoute element={<Notifications/>}/>}/>
              <Route path="/projects/:id/:stage_id/:task_id" element={<PrivateRoute element={<Task/>}/>}/>
              <Route path="/profile" element={<PrivateRoute element={<Profile/>}/>}/>
              <Route path="/logout" element={<PrivateRoute element={<Logout/>}/>}/>
              <Route path="/sign-in" element={<Login/>}/>
              <Route path="/sign-up" element={<Register/>}/>
              <Route path="/users" element={<PrivateRoute element={<Users/>}/>}/>
              <Route path="/chat/:id" element={<PrivateRoute element={<Chat/>}/>}/>
              <Route path="*" element={<PageNotFound/>} />
            </Routes>

          </div>
          {currentProject && <ActivitySection/>}
        </div>
        <Footer/>
      </div>
    </Suspense>
  )
}

export default App;