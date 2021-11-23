import React from 'react'
import { Container, IconButton, Modal } from '@mui/material'
import Box from '@mui/material/Box';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Fade from '@mui/material/Fade';
import AddTaskForm from './AddTaskForm';

 const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius : 2,
    boxShadow: 54,
    p: 4,
    pt:6
  };


const AddTaskModal = (props) => {
    
    const handleOpenModal = () => props.setOpenModal(true);
    
    const handleCloseModal = () => {
        props.setOpenModal(false);
        props.setIsEditing(false);
    };
    
    return (
        <Container>
        <IconButton variant="contained" 
                onClick={handleOpenModal}                 
                style={{width : '100%'}}>
                    <AddTaskIcon  sx={{fontSize : '2rem',backgroundColor : '#1976d2',borderRadius : '50%',p:1,color : '#ffffff'}}/>
                    </IconButton>
    
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
            
        </Container>
    )
}

export default AddTaskModal
