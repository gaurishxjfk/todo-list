import React, { useEffect, useState } from 'react'
import { UserState } from '../context';
//import AddTask from '../components/AddTask';
import Header from '../components/Header'
//import Tasks from '../components/Tasks';
import { userData } from '../config/data';
//import AdminUserslist from '../components/AdminUserslist';
import Sidebar from '../components/Sidebar';
// import {  Switch } from 'react-router';
// import ProtectedAdmin from '../components/ProtectedAdmin';
// import AddTaskModal from '../components/AddTaskModal';
// import ToDo from '../components/ToDo'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
//import Appointment from '../components/Appointment';
//import Dnd from '../components/Dnd';
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import Calender from '../components/Calender';
// import TabList from '@mui/lab/TabList';
import TabMenuListBar from '../components/TabMenuListBar';


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
    const [openModal, setOpenModal] = useState(false);
    const [todoForm, setTodoForm] = useState(false)
    const [adminPanel, setAdminPanel] = useState('')
    const [openSideBar,setOpenSideBar] = useState(false);
    const [userPath, setUserPath] = useState('');
    const [openDelModal, setOpenDelModal] = useState(false);

    var userName ;
    var userAvatar ;

    const setEditingMode = (id) => {
        setTodoForm(true)
        setIsEditing(true)
        setOpenModal(true)
        setTaskId(id)
    }

    userData.forEach((i) => {
        if(i.id === userID){
            userName = i.first_name;
            userAvatar = i.avatar;
        }
    })

    const updateTask = (id) => {
        setEditingMode(id);
        const result =taskList.filter(i => i.id === id)        
        
        // setTask(result[0].name)
        // setDateValue(result[0].date)

        console.log(result)
    }  

    const updateTaskList = (updated) => {  
            const result =taskList.map((i) => (i.id === taskId ? {...i, name : updated,date : dateValue}  : i  ))
            setTaskList(result)     
            setIsEditing(false)
            setTask('')
            setDateValue(todayDate)   
    } 

    const delModalOpen = (id) => {
        setOpenDelModal(true)
        setTaskId(id)
    }

    const deleteTask = () => {        
        const result = taskList.filter(i => i.id !== taskId)
        setTaskList(result)
    }  

    const handleClose = (event, reason) => {
        setOpenDelModal(false);
    }

    useEffect(() => {
        localStorage.setItem(`task-${userID}`,JSON.stringify(taskList));     
    }, [taskList, userID]); 


    const eventObj = (id,task,date,desc) => {

        return {
            id: id,
            title: task,
            allDay: true,
            start: new Date(date),
            end: new Date(date),
            desc: desc
        }
    }

    const filteredResults = isDoneFilter ? 
                          taskList.filter(i => ((i.Task.includes(searchTask)) || (i.date.includes(searchTask))) && i.isDone === isDoneFilter)
                          :
                          taskList.filter(i => (i.Task.includes(searchTask)) || (i.date.includes(searchTask)));

    const eventlist = filteredResults.map((task) => (
        eventObj(task.id,task.Task,task.date,task.Description)
    ))

    const updateDate = (id,date) => {
        const result = taskList.map((task) => (
            (task.id === id ? {...task, date : date} : {...task})  
        ))
        setTaskList(result)
    } 

    
    return (
        <>
            <Header userAvatar={userAvatar} userName={userName} 
                    setSearchTask={setSearchTask} searchTask={searchTask}
                    isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                    adminPanel={adminPanel} setAdminPanel={setAdminPanel}
                    setOpenSideBar={setOpenSideBar} openSideBar={openSideBar}/>

            {/* {!isAdmin ? <>
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
                    } */}

                <Sidebar openSideBar={openSideBar} 
                  setOpenSideBar={setOpenSideBar} 
                  userName={userName} 
                  userAvatar={userAvatar}
                  isDoneFilter={isDoneFilter} 
                  setIsDoneFilter={setIsDoneFilter}
                  adminPanel={adminPanel} setAdminPanel={setAdminPanel}
                  setUserPath={setUserPath}/>

                  <TabMenuListBar openModal={openModal} 
                                    setOpenModal={setOpenModal} 
                                    taskList={taskList} 
                                    setTaskList={setTaskList}
                                    isEditing={isEditing}
                                    setIsEditing={setIsEditing}
                                    updateTaskList={updateTaskList}
                                    taskId={taskId}
                                    updateTask={updateTask} 
                                    delModalOpen={delModalOpen}
                                    eventlist={eventlist} 
                                    updateDate={updateDate}
                                    userID={userID}
                                    task={task} 
                                    setTask={setTask} dateValue={dateValue} setDateValue={setDateValue} setTaskId={setTaskId} 
                                    deleteTask={deleteTask} searchTask={searchTask}
                                    isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                                    todoForm={todoForm} setTodoForm={setTodoForm} />

                  

                        {/* <Container sx={{display : 'flex' , flexWrap : 'wrap' , justifyContent : 'space-around'}}>
                            { taskList.map((task) => (<ToDo task={task} key={task.id} updateTask={updateTask} delModalOpen={delModalOpen}/>))} 
                        </Container> */}
                        <Dialog
                              open={openDelModal}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                          >
                              <DialogTitle id="alert-dialog-title">{"Delete the todo from the list?"}</DialogTitle>
                              
                              <DialogActions>
                              <Button onClick={handleClose}>No</Button>
                              <Button onClick={e => {deleteTask(taskId) ;  setOpenDelModal(false)}} autoFocus>Yes</Button>
                              </DialogActions>
                          </Dialog>
                                    
                  {/* <Appointment/> */}
                  {/* <Dnd/> */}
                  
                  {/* <Calender eventlist={eventlist} updateDate={updateDate}/> */}

        </>
    )
}

export default Homepage
