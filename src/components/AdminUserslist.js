import React, { useEffect, useState } from 'react'
import { compare, getTasks } from '../Pages/Homepage';
import Tasks from './Tasks'

const AdminUserslist = (props) => {
    const [taskList, setTaskList] = useState(getTasks(props.userID).sort( compare ));


    useEffect(() => {
        setTaskList(getTasks(props.userID).sort( compare ))
    }, [props.userID])
    return (
        <Tasks  userID={taskList} taskList={taskList} 
                                    setTaskList={setTaskList} task={props.task} 
                                    setTask={props.setTask} dateValue={props.dateValue} setDateValue={props.setDateValue}
                                    isEditing={true} setIsEditing={props.setIsEditing}
                                    taskId={props.taskId} setTaskId={props.setTaskId} updateTask={props.updateTask} updateTaskList={props.updateTaskList}
                                    deleteTask={props.deleteTask} searchTask={props.searchTask}
                                    isDoneFilter={props.isDoneFilter} setIsDoneFilter={props.setIsDoneFilter}
                                    todoForm={props.todoForm} setTodoForm={props.setTodoForm}/> 
    )
}

export default AdminUserslist
