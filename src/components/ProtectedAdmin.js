import React from 'react'
import { Redirect, Route } from 'react-router';
import { UserState } from '../context';

const ProtectedAdmin = props => {
    const { isAdmin } = UserState();
    console.log(isAdmin)
    if(!isAdmin){
        return <Redirect to='/' />
    }
    return <Route {...props} />
}

export default ProtectedAdmin
