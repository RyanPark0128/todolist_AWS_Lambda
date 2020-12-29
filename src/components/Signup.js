import React, { useState } from 'react'

const Signup = (props) => {
    const UserPool = props.UserPool;
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const onSignup = (event) => {
        event.preventDefault();
        const dataEmail = {
            Name: 'email',
            Value: email,
        }

        UserPool.signUp(username, password, [dataEmail], null, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })
    }
    return (
        <div className="content--signup">
            <h1> sign up </h1>
            <div className="username">
                Username
            </div>
            <input className="input" value={username} onChange={(event) => setUsername(event.target.value)} />
            <div className="username">
                Email
            </div>
            <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
            <div className="password">
                Password
            </div>
            <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className="submit" onClick={(event) => onSignup(event)}>
                submit
            </button>
        </div>
    )
}

export default Signup