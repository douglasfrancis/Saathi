import './App.css';
import './components/Navbar.css';
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import { useEffect, useState } from 'react';
import LogIn from './components/LogIn';
import Register from './components/Register';


Amplify.configure(awsconfig);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  

  useEffect(() => {
    UserLoggedInState();
  }, []);

  const UserLoggedInState = () => {
    Auth.currentAuthenticatedUser().then(() => {
      setLoggedIn(true)
    }).catch(() => {
      setLoggedIn(false)
    })
  };

  const signOut = async() => {
    try {
     await Auth.signOut();
     setLoggedIn(false);

    } catch(error) {
     console.log("Error signing out", error)
    }
 };

 const onSignIn = () => {
  setLoggedIn(true);
 };

  return (

    <Router>
        <div className="App">
          <header className="App-header">
          <div className="navbar">
              <h2 id="app-name">Saathi</h2>
             
              {loggedIn ? <button onClick={signOut}>Sign Out</button> : (<><Link to="/login"> <button>Sign In</button> </Link> <Link to="/register"> <button>Register</button> </Link></>)}
          </div>
          </header>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LogIn onSignIn={onSignIn}/>
            </Route>
            <Route path="/register">
              <Register onSignIn={onSignIn}/>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
