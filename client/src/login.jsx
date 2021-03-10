import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';



function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userToken = Cookies.get('userToken');

    const signin = (e) => {
        e.preventDefault();
        fetch('https://mern-todo-ubaid.herokuapp.com/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.err) {
                    alert(data.err)
                } else {
                    Cookies.set('userToken', data.userToken, { expires: 1 })
                    alert(data.msg)
                    setEmail('');
                    setPassword('');
                }
            })
    }

    if (userToken) {
        return <Redirect to="/" />
    }

    return (
        <>
            <div className="signup">
                <h1>LogIn</h1>
                <form onSubmit={(e) => signin(e)}>
                    <input value={email} type="eamil" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input value={password} type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="LogIn" />
                </form>
                <p>Go to <Link to="/signup">SignUp</Link></p>
            </div>
        </>
    );

}


export default LogIn;