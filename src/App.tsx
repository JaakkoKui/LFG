import React, { useEffect, useState } from 'react';
import Profile from './Component/Profile';
import LoginPage from './Component/Login';
import './App.css';
import { useStateValue } from './state/state';
//import { Login } from './types';



const App: React.FC = () => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON && loggedUserJSON !== undefined) {
      const user = JSON.parse(loggedUserJSON);
      
      dispatch({type: "LOGIN", payload: user.logged});
    }
    dispatch({type: "ADD_LOGIN", payload: {Email: "root@root.fi", Password: "root"}});
    console.log("logged", loggedUserJSON);
    
  }, [dispatch]);
  
  if ( state.email === "") {
    return (
      <LoginPage />
    )
  } else {

    window.localStorage.setItem(
      'loggedUser', JSON.stringify({logged: state.email})
    )

    const handleLogout = () => {
      window.localStorage.clear();
      dispatch({type: "LOGOUT", payload: "" })
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
