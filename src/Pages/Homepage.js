import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import TabMenuListBar from '../components/TabMenuListBar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { UserState } from '../context';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar';


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

export const todayDate = new Date()

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



const Homepage = (props) => {

    const {addUserOpenModal} = props;

    const {userID,isDoneFilter,setIsDoneFilter,isAdmin,users} = UserState();

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
    const [openDelModal, setOpenDelModal] = useState(false);

    var userName ;
    var userAvatar ;

    const setEditingMode = (id) => {
        setTodoForm(true)
        setIsEditing(true)
        setOpenModal(true)
        setTaskId(id)
    }

    (Array.isArray(users) && users.length) && (
        users.find((i) => {
            if(i.id === userID){
                userName = i.First_name;
                userAvatar = i.Avatar;
            }
            return userName
        })
    )

    const updateTask = (id) => {
        setEditingMode(id);
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

    
    const filteredResults = isDoneFilter ?//?.(Array.isArray(taskList) && taskList.length) ?
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

    const handleOnDeleteModal = (id) => {
        deleteTask(id) ;  
        setOpenDelModal(false)
    }

    
    return (
        <>
            <Header userAvatar={userAvatar} userName={userName} 
                    setSearchTask={setSearchTask} searchTask={searchTask}
                    isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                    adminPanel={adminPanel} setAdminPanel={setAdminPanel}
                    setOpenSideBar={setOpenSideBar} openSideBar={openSideBar}/>            

            <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} 
                  userName={userName}  userAvatar={userAvatar}
                  isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                  adminPanel={adminPanel} setAdminPanel={setAdminPanel}
                  addUserOpenModal={addUserOpenModal}/>

            {!isAdmin && <TabMenuListBar openModal={openModal} setOpenModal={setOpenModal} 
                            taskList={taskList} setTaskList={setTaskList}
                            isEditing={isEditing} setIsEditing={setIsEditing}
                            updateTaskList={updateTaskList} taskId={taskId}
                            updateTask={updateTask} delModalOpen={delModalOpen}
                            eventlist={eventlist} updateDate={updateDate}
                            userID={userID} task={task} setTask={setTask} 
                            dateValue={dateValue} setDateValue={setDateValue} setTaskId={setTaskId} 
                            deleteTask={deleteTask} searchTask={searchTask}
                            isDoneFilter={isDoneFilter} setIsDoneFilter={setIsDoneFilter}
                            todoForm={todoForm} setTodoForm={setTodoForm} />}


            <Dialog  open={openDelModal}  onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{"Delete the todo from the list?"}</DialogTitle>
                <DialogActions>
                              <Button onClick={handleClose}>No</Button>
                              <Button onClick={e => handleOnDeleteModal(taskId)} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default Homepage
