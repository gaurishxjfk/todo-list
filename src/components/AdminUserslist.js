import React, { useEffect, useState } from 'react'
import { compare, getTasks } from '../Pages/Homepage';
import Tasks from './Tasks'

const AdminUserslist = (props) => {

    const { userID } = props;

    const [taskList, setTaskList] = useState(getTasks(userID).sort( compare ));

    useEffect(() => {
        setTaskList(getTasks(userID).sort( compare ))
    }, [userID])

    return (
        <Tasks  userID={taskList} 
                taskList={taskList} 
                setTaskList={setTaskList}
                isEditing={true} {...props}
                /> 
    )
}

export default AdminUserslist
