import { Button, Checkbox, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText, Skeleton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styles } from '../Pages/Homepage';

const Tasklist = (props) => {
    if(props.list.length > 0) {
    return (
        <List variant="outlined">
        {props.list.map((task) =>(
            
            <div key={task.id}>
            {/*props.setTaskId(task.id)         props.setOpenModal(true)*/}
            <List component="nav" aria-label="secondary mailbox folders">
                  <ListItem style={{height:'2rem'}}>

                      <Checkbox defaultChecked={task.isDone} onChange={e => props.checkDone(task.id)} />
                         
                      <ListItemText primary={task.name} secondary={new Date(task.date).toLocaleDateString()} 
                                      style={(task.isDone) ? styles.doneTask : styles.pendingTask  }/>

                      {props.isEditing?'' : 
                      <>
                      <IconButton  aria-label="edit" onClick={e => props.updateTask(task.id)}>
                              <EditIcon/>
                      </IconButton>

                      <IconButton  aria-label="delete" onClick={(e) => (props.onDelete(task.id))}>
                              <DeleteIcon />
                      </IconButton>
                      </>
                      }

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
                              <Button onClick={e => {props.deleteTask(props.taskId) 
                                                  props.setOpenModal(false)}} autoFocus>Yes</Button>
                              </DialogActions>
                          </Dialog>
                      
                  </ListItem>                                
              </List>                                    
                  </div>
            ))}                        
        </List> 
    )
    }else{
            return(<Typography variant="h4" textAlign='center' color='#cdcdcd'>
                <Skeleton animation="wave" width={'90%'} >
                {props.isDoneFilter?'No done tasks ':'No Tasks Added'} 
                </Skeleton>
                </Typography>
                                )
                              }
    
}

export default Tasklist
