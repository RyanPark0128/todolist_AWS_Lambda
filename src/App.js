import React, { useState } from 'react'
import './App.css';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

function App() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [signUser, setSignUser] = useState("")
  const [signPassword, setSignPassword] = useState("")
  const [email, setEmail] = useState("")
  const [confirm, setConfirm] = useState("")
  const [verifyUser, setVerifyUser] = useState("")
  const [verifyCode, setVerifyCode] = useState("")

  const poolData = {
    UserPoolId: process.env.REACT_APP_AMAZON_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_AMAZON_COGNITO_CLIENT_ID
  };

  const dataEmail = {
    Name: 'email',
    Value: email,
  }

  const authenticationData = {
    Username: user,
    Password: password,
  };

  const UserPool = new CognitoUserPool(poolData);

  const onSignin = (event) => {
    event.preventDefault();
    const userData = {
      Username: user,
      Pool: UserPool,
    };
    console.log(user)
    console.log(password)
    console.log(authenticationData)
    const authenticationDetails = new AuthenticationDetails(
      authenticationData
    );
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log(result)
        const accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken)
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  const onSignup = (event) => {
    event.preventDefault();
    console.log(signUser);
    console.log(signPassword);
    UserPool.signUp(signUser, signPassword, [dataEmail], null, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
  }

  const onConfirm = (event) => {
    event.preventDefault();
    const userData = {
      Username: verifyUser,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verifyCode, true, function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  }

  return (
    <div>
      <div className="header">
        <div className="logo">
          Compare your self
      </div>
        <div className="signin">
          Sign in
      </div>
        <div className="signup">
          Sign up
        </div>
      </div>
      <div className="content--signin">
        <h1> sign in </h1>
        <div className="username">
          Username
        </div>
        <input className="input" value={user} onChange={(event) => setUser(event.target.value)} />
        <div className="password">
          Password
        </div>
        <input className="input" value={password} type="password" onChange={(event) => setPassword(event.target.value)} />
        <button className="submit" onClick={(event) => onSignin(event)}>
          submit
        </button>
      </div>

      <div className="content--signup">
        <h1> sign up </h1>
        <div className="username">
          Username
        </div>
        <input className="input" value={signUser} onChange={(event) => setSignUser(event.target.value)} />
        <div className="username">
          Email
        </div>
        <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
        <div className="password">
          Password
        </div>
        <input className="input" value={signPassword} type="password" onChange={(event) => setSignPassword(event.target.value)} />
        <div className="password">
          Confirm Password
        </div>
        <input className="input" value={confirm} type="password" onChange={(event) => setConfirm(event.target.value)} />
        <button className="submit" onClick={(event) => onSignup(event)}>
          submit
        </button>
      </div>

      <div className="content--verify">
        <h1> Confirm Account </h1>
        <div className="username">
          Username
        </div>
        <input className="input" value={verifyUser} onChange={(event) => setVerifyUser(event.target.value)} />
        <div className="password">
          Validation Code
        </div>
        <input className="input" value={verifyCode} onChange={(event) => setVerifyCode(event.target.value)} />
        <button className="submit" onClick={(event) => onConfirm(event)}>
          Confirm Your Account
        </button>
      </div>
    </div>
  );
}

export default App;
