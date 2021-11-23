import { Fade, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useLocation , useHistory } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import AddUser from './AddUser';
import ManageUsers from './ManageUsers';
import UserStats from './UserStats';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    borderRadius : 2,
    boxShadow: 54,
    p: 4,
    pt:6
  };


const AdminPage = (props) => {

    let location = useLocation();

    const history = useHistory()

    const [userPage, setUserPage] = useState(false);
    const [userName, setUserName] = useState('');
    const [userID, setUserID] = useState('');
    const [addUserModal, setAddUserModal] = useState(false);

    useEffect(() => {
        location.pathname === '/admin/add-user' ? setAddUserModal(true) : setAddUserModal(false);
    }, [location])
   
    // useEffect(() => {
    //     location.pathname !== `/admin/${userName}` && history.push('/admin');
    //     console.log(location.pathname !== `/admin/${userName}`,'jale re')
    // }, [location,userName,history])
    //userName === '' && history.push('/admin')

    

    const addUserOpenModal = () => {
        setAddUserModal(true)
        history.push('/admin/add-user')
    };

    const addUserhandleCloseModal = () => {
        setAddUserModal(false);
        history.push('/admin')
    };

    const openUser = (user_id,user_name) => {
        setUserID(user_id)
        setUserName(user_name)
        history.push(`/admin/${user_name}`)
    }


    useEffect(() => {
        location.pathname === `/admin/${userName}` ? setUserPage(true) : setUserPage(false);        
    }, [userName,location])
    

    
    return (
        <>
            <Homepage addUserOpenModal={addUserOpenModal}/>
            {userPage? <UserStats userName={userName} userID={userID}/>:<ManageUsers openUser={openUser}/>}
            <Modal open={addUserModal}
                    onClose={addUserhandleCloseModal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    BackdropProps={{
                        timeout: 100,
                      }}>
                        <Fade in={addUserModal}>
                <Box sx={style}>
                    <AddUser addUserhandleCloseModal={addUserhandleCloseModal}/>
                </Box>
                </Fade>
            </Modal>
            
        </>
    )
}

export default AdminPage
