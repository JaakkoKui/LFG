import React, { useEffect, useState } from 'react';
import Profile from './Component/Profile';
import Login from './Component/Login';
import './App.css';


const App: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserName(user.user);
    }
  }, [userName]);

  if (userName !== "root") {
    return (
      <Login setName={setUserName} password={setPassword} />
    )
  } else {

    window.localStorage.setItem(
      'loggedUser', JSON.stringify({ user: userName })
    )

    const handleLogout = () => {
      window.localStorage.clear();
      setUserName('');
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
