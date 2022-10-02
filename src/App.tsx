import React, { useEffect, useState } from 'react';
import Profile from './Component/Profile';
import LoginPage from './Component/Login';
import './App.css';
import { useStateValue } from './state/state';
import { Login, ProfileModel } from './types';
import { getUsers } from './services/userService';
import { getProfiles } from './services/profileService';



const App: React.FC = () => {
  const [{ email }, dispatch] = useStateValue();

  useEffect(() => {
    getUsers().then(user => {
      const users: Login[] = user as Login[];

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
      <>
        <header>
          <nav>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>
        <Profile />
      </>
    );
  }
}

export default App;
