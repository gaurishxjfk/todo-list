import React, { useState } from 'react'
import { UserState } from '../context';
import AddTask from '../components/AddTask';
import Header from '../components/Header'
import Tasks from '../components/Tasks';
import { userData } from '../config/data';
import AdminUserslist from '../components/AdminUserslist';
import Sidebar from '../components/Sidebar';
import {  Switch } from 'react-router';
import ProtectedAdmin from '../components/ProtectedAdmin';


//function to sort Done todos
export const compare = ( a, b ) => {
    if ( a.isDone < b.isDone){
    return -1;
    }
    if ( a.isDone > b.isDone ){
    return 1;
    }
    return 0;
}

export const getTasks = (userID) => {
    const result = localStorage.getItem(`task-${userID}`);
    if(result){
        return JSON.parse(result)
    }else{
        return []
    }        
}  

export const todayDate = new Date()//.toLocaleDateString()

 //styles
 export const styles = {
    paper : {
        padding : 20,
        height : '70vh',
        width : '50%',
        margin : '30px auto'
    },
    doneTask:{
        textDecoration: 'line-through' ,
        color : 'grey'
    },
    pendingTask:{
        textDecoration: 'none' 
    }
}

const Homepage = () => {

    const {userID,isAdmin,isDoneFilter,setIsDoneFilter} = UserState();

    const [taskList, setTaskList] = useState(getTasks(userID).sort( compare ));
    const [task, setTask] = useState('');
    const [dateValue, setDateValue] = useState(todayDate);
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setTaskId] = useState('');
    const [searchTask, setSearchTask] = useState('');
    
    const [todoForm, setTodoForm] = useState(false)
    const [adminPanel, setAdminPanel] = useState('')
    const [openSideBar,setOpenSideBar] = useState(false);
    const [userPath, setUserPath] = useState('')

    var userName ;
    var userAvatar ;

    userData.forEach((i) => {
        if(i.id === userID){
            userName = i.first_name;
            userAvatar = i.avatar;
        }
    })

    const updateTask = (id) => {
        setTodoForm(true)
        setIsEditing(true)
        const result =taskList.filter(i => i.id === id)
        setTaskId(result[0].id)
        setTask(result[0].name)
        setDateValue(result[0].date)
    }  

    const updateTaskList = (updated) => {  
            const result =taskList.map((i) => (i.id === taskId ? {...i, name : updated,date : dateValue}  : i  ))
            setTaskList(result)     
            setIsEditing(false)
            setTask('')
            setDateValue(todayDate)   
    } 

    const deleteTask = (id) => {
        const result = taskList.filter(i => i.id !== id)
        setTaskList(result)
    }  
    
    return (
        <>
            <Header userAvatar={userAvatar} userName={userName} 
                    setSearchTask={setSearchTask} searchTask={searchTask}
                    isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                    adminPanel={adminPanel} setAdminPanel={setAdminPanel}
                    setOpenSideBar={setOpenSideBar} openSideBar={openSideBar}/>

            {!isAdmin ? <>
                            <AddTask userID={userID} taskList={taskList} 
                                    setTaskList={setTaskList} task={task} 
                                    setTask={setTask} dateValue={dateValue} setDateValue={setDateValue}
                                    isEditing={isEditing} setIsEditing={setIsEditing}
                                    taskId={taskId} setTaskId={setTaskId} updateTask={updateTask} updateTaskList={updateTaskList}
                                    todoForm={todoForm} setTodoForm={setTodoForm}/>

                            <Tasks  userID={userID} taskList={taskList} 
                                    setTaskList={setTaskList} task={task} 
                                    setTask={setTask} dateValue={dateValue} setDateValue={setDateValue}
                                    isEditing={isEditing} setIsEditing={setIsEditing}
                                    taskId={taskId} setTaskId={setTaskId} updateTask={updateTask} updateTaskList={updateTaskList}
                                    deleteTask={deleteTask} searchTask={searchTask}
                                    isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                                    todoForm={todoForm} setTodoForm={setTodoForm}
                                    />
                         </>

                    :
                        <Switch>                   
                        <ProtectedAdmin path={userPath}>
                            <AdminUserslist adminPanel={adminPanel} userID={adminPanel} isDoneFilter={isDoneFilter} 
                                    setIsDoneFilter={setIsDoneFilter} task={task} 
                                    setTask={setTask} dateValue={dateValue} setDateValue={setDateValue}
                                    isEditing={isEditing} setIsEditing={setIsEditing}
                                    taskId={taskId} setTaskId={setTaskId} updateTask={updateTask} updateTaskList={updateTaskList}
                                    deleteTask={deleteTask} searchTask={searchTask}
                                    todoForm={todoForm} setTodoForm={setTodoForm}/> 
                        </ProtectedAdmin>
                    </Switch>
                    }

                <Sidebar openSideBar={openSideBar} 
                  setOpenSideBar={setOpenSideBar} 
                  userName={userName} 
                  userAvatar={userAvatar}
                  isDoneFilter={isDoneFilter} 
                  setIsDoneFilter={setIsDoneFilter}
                  adminPanel={adminPanel} setAdminPanel={setAdminPanel}
                  setUserPath={setUserPath}/>
                  
                 
            {/* {<AdminPage userID={userID} taskList={taskList} 
                        setTaskList={setTaskList} task={task} 
                    setTask={setTask} dateValue={dateValue} setDateValue={setDateValue}
                    isEditing={isEditing} setIsEditing={setIsEditing}
                    taskId={taskId} setTaskId={setTaskId} updateTask={updateTask} updateTaskList={updateTaskList}
                    deleteTask={deleteTask} searchTask={searchTask}
                    isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                    todoForm={todoForm} setTodoForm={setTodoForm} adminPanel={adminPanel}/>} */}
        </>
    )
}

export default Homepage
