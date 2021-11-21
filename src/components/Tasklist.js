import { Button, Checkbox, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemText, Paper, Skeleton, TableContainer, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styles } from '../Pages/Homepage';
import { UserState } from '../context';

import TableComp from './TableComp';


const Tasklist = (props) => {
    const {isAdmin,isDoneFilter,setIsDoneFilter} = UserState(); 

      
   
    if(props.list.length > 0) {       
        return (
            <>
                 <TableComp onDelete={props.onDelete}  rows={props.list} checkDone={props.checkDone} 
                 updateTask={props.updateTask}
                 setOpenModal={props.setOpenModal}                                            
                 handleClose={props.handleClose}
                 deleteTask={props.deleteTask}
                                         openModal={props.openModal}
                                         taskId={props.taskId} 
                                         setTaskId={props.setTaskId}
                                         isDoneFilter={props.isDoneFilter}
                                         isEditing={props.isEditing}
                                         setIsDoneFilter={props.setIsDoneFilter}   
                                         admin={false} />

            <List variant="outlined" style={{display : 'none'}}>

            {props.list.map((task) =>(
            
            <React.Fragment key={task.id}>
            <List component="nav" aria-label="secondary mailbox folders">
                  <ListItem style={{height:'2rem'}}>

                  {isAdmin ? '' :
                      <Checkbox defaultChecked={task.isDone} onChange={e => props.checkDone(task.id)} />
                        }
                         
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
                  </React.Fragment>
            ))}                        
        </List> 
        </>
    )
    }else{
            return(
                <TableContainer component={Paper}>
        Show Done Tasks
             <Checkbox defaultChecked={isDoneFilter} onChange={e => setIsDoneFilter(!isDoneFilter)} /> 
            <Typography variant="h4" textAlign='center' color='#cdcdcd'>
                <Skeleton animation="wave" width={'90%'} >
                {props.isDoneFilter?'No done tasks ':'No Tasks Added'} 
                </Skeleton>
                </Typography></TableContainer>
                                )
     }
  
    
}

export default Tasklist
