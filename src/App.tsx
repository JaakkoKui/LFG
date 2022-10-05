import React, { useEffect, useState } from 'react';
import Profile from './Component/Profile';
import LoginPage from './Component/LoginPage';
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
          <LoginPage/>
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
                <nav className="h-[65px] border-b shadow-lg flex relative font-semibold text-gray-600">

                    <div className="absolute w-full h-full">
                        <div className="flex h-full mx-auto w-fit justify-around">
                            <button onClick={handleLogout} className="px-5 hover:bg-gray-300 hover:text-gray-900">Feed</button>
                            <button onClick={handleLogout} className="px-5 hover:bg-gray-300 hover:text-gray-900">About</button>
                        </div>
                    </div>

                    <div className="ml-auto flex z-10">
                        <button onClick={handleLogout} className="px-5 hover:bg-gray-300 hover:text-gray-900">Profile</button>
                        <button onClick={handleLogout} className="px-5 hover:bg-red-400 bg-red-600 text-white">Logout</button>
                    </div>

                </nav>
            </header>
            <Profile />
      </>
    );
  }
}

export default App;
