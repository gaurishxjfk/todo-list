import React from 'react';
import { getTasks } from '../Pages/Homepage';
import Tasklist from './Tasklist';
//import { styles } from './Login';
//import { userData } from '../config/data';
//import { compare } from './Addtask';
//import { UserState } from '../context';

const AdminPage = (props) => {

    //const {setIsLoggedIn} = UserState();

    
    const results = getTasks(props.adminPanel)
    
    return (
        <Tasklist list={results}
                    checkDone={props.checkDone} 
                    admin={true} />
    )
}

export default AdminPage
