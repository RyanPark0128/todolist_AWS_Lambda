import React, {useState} from 'react'
import './App.css';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import Signin from './components/Signin'
import Signup from './components/Signup'
import Confirm from './components/Confirm'
import Profile from './components/Profile'

const poolData = {
  UserPoolId: process.env.REACT_APP_AMAZON_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AMAZON_COGNITO_CLIENT_ID
};
const UserPool = new CognitoUserPool(poolData);

const App = () => {
  const [user, setUser] = useState(UserPool.getCurrentUser())

  const currentUser = () => {
    const cognitoUser= UserPool.getCurrentUser();
    console.log(cognitoUser)
    console.log(user)
    // cognitoUser.getSession((err, session) => {
    //   if (err) {
    //     alert(err);
    //     return
    //   }
    //   console.log(`session validity: ` + session.isValid())
    // })
  }

  const signOut = () => {
    UserPool.getCurrentUser().signOut()
    localStorage.clear()
    setUser(null)
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
      { user ? <Profile UserPool={UserPool}/> :
      <div>
        <Signin setUser={setUser} UserPool={UserPool}/>
        <Signup UserPool={UserPool}/>
        <Confirm UserPool={UserPool}/>
      </div>
      }
      <button onClick={() => currentUser()}>
        current user
        </button>
      <button onClick={() => signOut()}>
        sign out
        </button>
        {user ? 'logged in' : 'logged out'}
    </div>
  );
}

export default App;
