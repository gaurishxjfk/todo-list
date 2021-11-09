import React, { useState } from 'react';
import {Button, Grid,Paper, Avatar,List, ListItemButton, ListItemText, Collapse} from '@mui/material';
import { styles } from './Login';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { userData } from '../config/data';
//import { compare } from './Addtask';
import { UserState } from '../context';

const AdminPage = () => {

    const {setIsLoggedIn} = UserState();

    // const getTasks = (userID) => {
    //     const result = localStorage.getItem(`task-${userID}`);
    //     if(result){
    //         return JSON.parse(result)
    //     }else{
    //         return []
    //     }        
    // }     
   
    const [openFilter, setOpenFilter] = useState(false);
    //const [userID, setUserId] = useState('');
  //  const [taskList, setTaskList] = useState(getTasks().sort( compare ));

    const handleClickFilter = (id) => {
        setOpenFilter(!openFilter);
        
      };
      
    return (
        <Grid>
            <Button variant="outlined"  onClick={() => setIsLoggedIn(false) } fullWidth>Logout</Button> 
            <Paper elevation={11} style={styles.paper}>
                <Grid align='center'>
                    <Avatar>A</Avatar>
                </Grid>  
               <List>
                    {
                    userData.map((i) => (
                    <div key={i.id}>
                        <ListItemButton onClick={e => handleClickFilter(i.id)}>
                            <ListItemText primary={i.username}/>
                                    {openFilter ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openFilter} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={i.name} />
                                    </ListItemButton>
                                    </List>
                                </Collapse>
                    </div>))}
               </List>
                                
            </Paper>
        </Grid>
    )
}

export default AdminPage
