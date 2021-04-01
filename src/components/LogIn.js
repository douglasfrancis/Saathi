import { Auth } from 'aws-amplify';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Auth.css';

export default function LogIn({onSignIn}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const signIn = async (e) => {
        e.preventDefault();

        try{
            await Auth.signIn(username, password);
            history.push('/');
            onSignIn();

        } catch (error){
            console.log("There was an error logging in", error)
        }

    };

    return (
        <div>
            
            <form>
            <h2>Log In</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

                <button id="sign-in-btn" onClick={signIn}>Sign In</button>
            </form>
        </div>
    )
}
