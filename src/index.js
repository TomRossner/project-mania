import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ProjectProvider from './contexts/ProjectContext';
import { Provider } from 'react-redux';
// import UserProvider from './contexts/UserContext';
import { store } from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/project-mania-frontend'>
      <Provider store={store}>
        {/* <UserProvider> */}
          <ProjectProvider>
            <App />
          </ProjectProvider>
        {/* </UserProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();