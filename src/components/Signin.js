import React, { useState } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const Signin = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const UserPool = props.UserPool
    const onSignin = (event) => {
        event.preventDefault();

        const authenticationData = {
            Username: username,
            Password: password,
        };

        const userData = {
            Username: username,
            Pool: UserPool,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                const accessToken = result.getAccessToken().getJwtToken();
                props.setUser(UserPool.getCurrentUser());
                // localStorage.setItem("Token", accessToken)
                // localStorage.setItem("Username", user)
            },
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }
    return (
        <div className="content--signin">
            <h1> sign in </h1>
            <div className="username">
                Username
        </div>
            <input className="input" value={username} onChange={(event) => setUsername(event.target.value)} />
            <div className="password">
                Password
        </div>
            <input className="input" value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
            <button className="submit" onClick={(event) => onSignin(event)}>
                submit
        </button>
        </div>
    )
}

export default Signin