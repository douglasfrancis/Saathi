import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router';
import './Auth.css';

export default function Register( {onSignIn} ) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    
    const history = useHistory();

    const newSignUp = async (e) => {
        e.preventDefault();

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                   // email,          // optional
                   // phone_number,   // optional - E.164 number convention
                    
                }
            });
            console.log(user);
            setConfirmOpen(true);
            
        } catch (error) {
            console.log('error signing up:', error);
        }

    };

    async function confirmSignUp(e) {
        e.preventDefault();

        try {
          await Auth.confirmSignUp(username, code);
          onSignIn();
          history.push('/');
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    return (
        <div>
            
            {confirmOpen && (
                <div className="confirm-register">

                

                <form>
                <h2>Confirm Registration</h2>
                    <input value={username} disabled/>
                    <input placeholder="Enter Code" value={code} onChange={(e)=> {setCode(e.target.value)}} />

                    <button onClick={confirmSignUp}>Confirm</button>
                </form>

                </div>
            )}

            <form>
            <h2>Register</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Please enter your email address" value={username} onChange={(e) => {setUsername(e.target.value)}}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

                <button id="sign-in-btn" onClick={newSignUp}>Register</button>
            </form>
        </div>
    )
}
