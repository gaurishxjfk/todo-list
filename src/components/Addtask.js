import React, { useEffect, useState } from 'react';
import {TextField,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {List,ListItem,IconButton,Snackbar,Avatar,ListItemText,Grid,Paper,Typography} from '@mui/material'
import { UserState } from '../context';
import { userData } from '../config/data';

const Addtask = () => {

    const getTasks = () => {
        const result = localStorage.getItem(`task-${userID}`);
        if(result){
            return JSON.parse(result)
        }else{
            return []
        }        
    }


    const {userID,setIsLoggedIn} = UserState();

    const [task, setTask] = useState('');
    const [updatedtask, setUpdatedTask] = useState('');
    const [taskList, setTaskList] = useState(getTasks());
    const [isEditing, setIsEditing] = useState(false);
    const [alert, setAlert] = useState(false);

    const addTasks = () => {
        if(!task){}
        else{
            checkDuplicacy(task) ? setAlert(true)   :                                           
                setTaskList([...taskList,task.toLowerCase()])
                setTask('')                                        
        }        
    }

    const deleteTask = (id) => {
        const result = taskList.filter(i => i !== id)
        setTaskList(result)
        setAlert(false)
    }     
    
    const updateTask = (id) => {
        setIsEditing(true)
        setUpdatedTask(id)
        setTask(id)
        setAlert(false)
    }  

    const updateTaskList = () => {  
        setAlert(false)
        const index = taskList.indexOf(task);
        
        checkDuplicacy(updatedtask) ? setAlert(true) : taskList[index] = updatedtask.toLowerCase()        
        setIsEditing(false)
        setTask('')
    }  

    const checkDuplicacy = (text) =>{
       return taskList.includes(text.toLowerCase())
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    }
    useEffect(() => {
        localStorage.setItem(`task-${userID}`,JSON.stringify(taskList));      
    }, [task,taskList]);

    const styles = {
        paper : {
            padding : 20,
            height : '70vh',
            width : '50vh',
            margin : '30px auto'
        },
    }
    
    return (
        <Grid>
            <Button variant="outlined"  onClick={() => setIsLoggedIn(false) } fullWidth>Logout</Button> 
            <Paper elevation={10} style={styles.paper}>
                <Grid align='center'>
                    <img src={userData[userID].avatar} alt="" style={{borderRadius : '10rem',height:'3rem',width: 'auto'}}/>
                    <Typography variant="h5">Hello {userData[userID].first_name}</Typography>
                </Grid> 
                <Grid align='center'> 
                  <TextField id="outlined-basic" label="Enter Task..." variant="outlined" 
                        onChange={(e) => {isEditing?setUpdatedTask(e.target.value):setTask(e.target.value) 
                                        setAlert(false)}} 
                        value={isEditing?updatedtask:task}/>

                  <Button variant="outlined" onClick={isEditing?updateTaskList:addTasks} style={{height:'3.55rem'}}>
                      {isEditing?'Update':'Add'}
                    </Button>  
                    </Grid>             
                    <Snackbar
                        open={alert}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="Task already added..."
                    />
                  <List variant="outlined">
                      {taskList.map((task) =>(
                          
                          <div key={task}>
                          
                          <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem style={{height:'2rem'}}>
                                    <ListItemText primary={`> ${task}`} />
                                    <IconButton  aria-label="edit" onClick={e => updateTask(task)}>
                                            <EditIcon/>
                                    </IconButton>
                                    <IconButton  aria-label="delete" onClick={e => deleteTask(task)}>
                                            <DeleteIcon />
                                    </IconButton>
                                </ListItem>                                
                        </List>


                                    
                                </div>
    ))}
                        
            </List>
        </Paper>
    </Grid>
    )
}

export default Addtask
