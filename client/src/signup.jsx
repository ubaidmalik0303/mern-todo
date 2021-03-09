import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';


function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)
    const userToken = Cookies.get('userToken');



    const register = async (e) => {
        setLoading(true)
        e.preventDefault()
        if (password !== confirmPassword) {

            alert("Confirm Password Must Be Same!")

        } else {

            await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            }).then(response => response.json())
                .then((data) => {
                    if (data.msg) {
                        alert(data.msg)
                    } else {
                        alert(data.err)
                    }
                })
        }
    }

    if(userToken){
        return <Redirect to="/" />
    }


    return (
        <>
            <div className="signup">
                <h1>SignUp</h1>
                <form onSubmit={register}>
                    <input type="text" required placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="eamil" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" required placeholder="Confirm Password" onChange={(e) => setconfirmPassword(e.target.value)} />
                    <input type="submit" value="SignUp" />
                </form>
                <p>Go to <Link to="/login">LogIn</Link></p>
            </div>
        </>
    );
}


export default SignUp;