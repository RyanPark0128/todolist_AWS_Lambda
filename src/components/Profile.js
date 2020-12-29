import React, { useState } from 'react';
import axios from 'axios';

const Profile = (props) => {
    const UserPool = props.UserPool
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [income, setIncome] = useState("")
    const url = 'https://bkk73m9in5.execute-api.us-east-2.amazonaws.com/dev/compare-yourself'
    const data = {
        "age" : Number(age),
        "height": Number(height),
        "income": Number(income),
        "userId" : "hello6974"
    }

    const onSubmit = (event) => {
        const cognitoUser = UserPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, result) {
                if (err) {
                    console.log(err)
                }
                else if (result) {
                    const headers = {
                        'Content-Type' : 'application/json',
                        'Authorization': result.getIdToken().getJwtToken()
                    }
                    axios.post(url, data, {
                        headers: headers
                    });
                }
            });
        }
    }

    return (
        <div>
            <div className="content--signup">
                <h1> Set your Data </h1>
                <div className="username">
                    Age
            </div>
                <input className="input" value={age} onChange={(event) => setAge(event.target.value)} />
                <div className="username">
                    Height
            </div>
                <input className="input" value={height} onChange={(event) => setHeight(event.target.value)} />
                <div className="password">
                    Income
            </div>
                <input className="input" value={income} onChange={(event) => setIncome(event.target.value)} />
                <button className="submit" onClick={(event) => onSubmit(event)}>
                    submit
            </button>
            </div>
        </div>
    )
}

export default Profile