import { Button,  Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { compare, styles, todayDate } from './Addtask'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UpcomingTasks = (props) => {
   
    const upcomingArr = props.taskList.filter(i =>  new Date(i.date) > new Date(todayDate))

    return (
        <List variant="outlined">
                      {upcomingArr.sort( compare ).map((task) =>(
                          
                          <div key={task.id}>
                          
                          <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem style={{height:'2rem'}}>

                                    {/* <Checkbox defaultChecked={task.isDone} onChange={e => props.checkDone(task.id)} /> */}
                                       
                                    <ListItemText primary={task.name} secondary={new Date(task.date).toLocaleDateString()} 
                                                    style={(task.isDone) ? styles.doneTask : styles.pendingTask  }/>

                                    <IconButton  aria-label="edit" onClick={e => props.updateTask(task.id)}>
                                            <EditIcon/>
                                    </IconButton>

                                    <IconButton  aria-label="delete" onClick={e => props.setOpenModal(true)}>
                                            <DeleteIcon />
                                    </IconButton>

                                    <Dialog
                                            open={props.openModal}
                                            onClose={props.handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                            {"Delete the todo from the list?"}
                                            </DialogTitle>
                                            
                                            <DialogActions>
                                            <Button onClick={props.handleClose}>No</Button>
                                            <Button onClick={e => {props.deleteTask(task.id) 
                                                                props.setOpenModal(false)}} autoFocus>Yes</Button>
                                            </DialogActions>
                                        </Dialog>
                                    
                                </ListItem>                                
                            </List>                                    
                                </div>
                    ))}                        
            </List> 
    )
}

export default UpcomingTasks
