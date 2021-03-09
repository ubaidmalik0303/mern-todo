import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todo from '../todo';
import LogIn from '../login';
import SignUp from '../signup';

const Routes = () => {

    return (
        <>
            <Router>
                <Route path="/" exact component={Todo} />
                <Route path="/login" exact component={LogIn} />
                <Route path="/signup" exact component={SignUp} />
            </Router>
        </>
    )
}

export default Routes;