import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserState } from '../context';
import { Button, Checkbox, Container, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ToDo from './ToDo';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddTaskModal from './AddTaskModal'
import { compare, getTasks } from '../Pages/Homepage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const TableComp = (props) => {

  const {userID,isDoneFilter,setIsDoneFilter,isEdit,setIsEdit} = UserState();

  const [taskData, setTaskData]= useState(JSON.parse(localStorage.getItem(`task-${userID}`)));

  const [editingMode, setEditingMode]= useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(`task-${userID}`,JSON.stringify(taskData));     
}, [taskData,userID]); 

    const editMode = (id) => {
      setIsEdit(id)
      setEditingMode(true)
      setOpenModal(true)
    }

  
  
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (<Container sx={{display : 'flex',flexDirection : 'row', flexWrap : 'wrap '}}>
    
        {/* <TableContainer component={Paper}>
        Show Done Tasks
             <Checkbox defaultChecked={isDoneFilter} onChange={e => setIsDoneFilter(!isDoneFilter)} /> 
          <Table sx={{ minWidth: 380 }} aria-label="customized table">

            <TableHead>
              <TableRow>
                <StyledTableCell>Done?</StyledTableCell>
                <StyledTableCell align="right">Tasks</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                {props.isEditing?'' : 
                <StyledTableCell align="right">Action</StyledTableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
            {props.rows.length === 0 ? '' :
              props.rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
    
                      <Checkbox defaultChecked={row.isDone} onChange={e => props.checkDone(row.id)} disabled={isAdmin && true}/>
                       
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{new Date(row.date).toLocaleDateString()}</StyledTableCell>
                  {props.isEditing?'' : 
                  <StyledTableCell align="right">
                      
                            <IconButton  aria-label="edit" onClick={e => props.updateTask(row.id)}>
                                    <EditIcon/>
                            </IconButton>
                        

                      <IconButton  aria-label="delete" onClick={(e) => (props.onDelete(row.id))}>
                              <DeleteIcon />
                      </IconButton>
                      
                      </StyledTableCell>}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
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
        </TableContainer> */}
        <AddTaskModal {...props} openModal={openModal} 
        taskData={taskData} setTaskData={setTaskData} 
        editMode={editMode}
        editingMode={editingMode} setEditingMode={setEditingMode}
        openModal={openModal} setOpenModal={setOpenModal}/>

         {taskData === null ? '' :
              taskData.map((row) => (
                <ToDo {...props} row={row} setOpenModal={setOpenModal} editMode={editMode} setIsEdit={setIsEdit}/>
              ))}  

        </Container>
      );
}

export default TableComp
