import React from 'react'
import { Redirect, Route } from 'react-router';
import { UserState } from '../context';

const ProtectedRoute = props => {

    const { isLoggedIn } = UserState();
    if(!isLoggedIn){
        return <Redirect to='/' />
    }
    return <Route {...props} />
}

export default ProtectedRoute
