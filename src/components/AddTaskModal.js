import { Modal } from '@mui/material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Typography from '@mui/material/Typography';
import React from 'react'
import AddTaskForm from './AddTaskForm';
import Fade from '@mui/material/Fade';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius : 2,
    boxShadow: 54,
    p: 4,
  };
const   AddTaskModal = (props) => {
    
    const handleOpenModal = () => props.setOpenModal(true);
    const handleCloseModal = () => props.setOpenModal(false);
    
    return (
        <div>
        <AddTaskIcon onClick={handleOpenModal} />
         
            <Modal open={props.openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    BackdropProps={{
                        timeout: 500,
                      }}>
                        <Fade in={props.openModal}>
                <Box sx={style}>
                    <AddTaskForm {...props} />
                </Box>
                </Fade>
            </Modal>
            
        </div>
    )
}

export default AddTaskModal
