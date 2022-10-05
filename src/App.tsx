import React, { useEffect, useState } from 'react';
import Profile from './Component/Profile';
import LoginPage from './Component/LoginPage';
import './App.css';
import { useStateValue } from './state/state';
import { User, ProfileModel } from './types';
import { getUsers } from './services/userService';
import { getProfiles } from './services/profileService';
import {
  HashRouter as Router,
  Route, Link, Routes
} from "react-router-dom"
import HomePage from './Component/HomePage';
import CustomRouter from './Component/CustomRouter';




const App: React.FC = () => {
  const [{ email }, dispatch] = useStateValue();
  
  useEffect(() => {
    getUsers().then(user => {
      const users: User[] = user as User[];

      dispatch({ type: "GET_USERS", payload: users });
    });

    getProfiles().then(data => {

      const profiles: ProfileModel[] = data as ProfileModel[];
      dispatch({ type: "GET_PROFILES", payload: profiles });
    });

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON && loggedUserJSON !== undefined) {
      const user = JSON.parse(loggedUserJSON);

      dispatch({ type: "LOGIN", payload: user });
    }

  }, [dispatch]);

  if (email === "") {
    return (
      <LoginPage />
    )
  } else {

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(email)
    )

    const handleLogout = () => {
      window.localStorage.clear();
      dispatch({ type: "LOGOUT", payload: "" })
    }

    return (
      <CustomRouter> 
        <header>
          <nav>
            <Link to="/login"><button onClick={handleLogout}>Logout</button></Link>
            <Link to="/profile">My profile</Link>
            <Link to="/">Home Page</Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </CustomRouter>
    );
  }
}

export default App;
