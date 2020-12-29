import React, { useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js';

const Confirm = (props) => {

    const UserPool = props.UserPool;

    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")

    const onConfirm = (event) => {
        event.preventDefault();
        const userData = {
            Username: username,
            Pool: UserPool,
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    }

    return (
        <div className="content--verify">
            <h1> Confirm Account </h1>
            <div className="username">
                Username
        </div>
            <input className="input" value={username} onChange={(event) => setUsername(event.target.value)} />
            <div className="password">
                Validation Code
        </div>
            <input className="input" value={code} onChange={(event) => setCode(event.target.value)} />
            <button className="submit" onClick={(event) => onConfirm(event)}>
                Confirm Your Account
        </button>
        </div>
    )
}

export default Confirm