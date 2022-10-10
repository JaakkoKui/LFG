import React, { useEffect } from 'react';
import Profile from './Component/Profile';
import LoginPage from './Component/LoginPage';
import './App.css';
import { useStateValue } from './state/state';
import { User, ProfileModel } from './types';
import { getUsers } from './services/userService';
import { getProfiles } from './services/profileService';
import {
  Route, Link, Routes
} from "react-router-dom"
import HomePage from './Component/HomePage';
import CustomRouter from './Component/CustomRouter';
import ProfilePage from './Component/ProfilePage';
import GameInfo from './Component/GameInfo';
import AboutPage from './Component/AboutPage';
import EditProfileForm from './Component/EditProfileForm';

const App: React.FC = () => {
    const [{ profile, email, user, posts, games }, dispatch] = useStateValue();

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

      const thisuser = Object.values(profile).filter(prof => prof.Email === email);

    return (
      <CustomRouter>
        <header>
                <nav className="h-[65px] flex relative font-semibold text-gray-600 z-20 bg-white">

            <div className="absolute w-full h-full">
              <div className="flex h-full mx-auto w-fit justify-around">
                <Link to="/"><button className="px-5 hover:bg-gray-300 h-full hover:text-gray-900">Feed</button></Link>
                <Link to="/about"><button className="px-5 hover:bg-gray-300 h-full hover:text-gray-900">About</button></Link>
              </div>
            </div>

            <div className="ml-auto flex z-10">
              <Link to="/profile"><button className="h-full px-5 hover:bg-gray-300 hover:text-gray-900">Profile</button></Link>
              <Link to="/login"><button onClick={handleLogout} className="h-full px-5 hover:bg-red-400 bg-red-600 text-white">Logout</button></Link>
            </div>

          </nav>
        </header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/game/:id' element={<GameInfo />} />
          <Route path='/profile/edit' element={<EditProfileForm currentUser={thisuser[0]} />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </CustomRouter>
    );
  }
}

export default App;