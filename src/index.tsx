import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/order
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// import './index.css';
import { Provider } from 'react-redux';
// import { legacy_createStore as createStore } from 'redux';

import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line import/no-extraneous-dependencies
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import './scss/login.scss';
import './scss/dashboard.scss';
import Addpost from './components/Addposti/Addpost';
import Profile from './components/Profilei/Profile';
import StoriesImage from './components/shostory/StoriesImage';
import { store } from './redux/store';

// const store = createStore(loaderReducer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const ProtectedRouted: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (localStorage.getItem('Instagram-clone')) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRouted>
              <Home />
            </ProtectedRouted>
          }
          path="/home"
        />
        <Route element={<Login />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Addpost />} path="/addpost" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route element={<StoriesImage />} path="/storiesimage" />
      </Routes>
    </BrowserRouter>
    ,
  </Provider>,
);

reportWebVitals();
