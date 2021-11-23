import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation,useHistory } from 'react-router-dom';
import { getTasks } from '../Pages/Homepage';
import ToDo from './ToDo';

const UserStats = (props) => {

    const {userName,userID} = props;
    const [taskList, setTaskList] = useState(getTasks(userID));

    

    return (
        <Container sx={{display : 'flex' , flexWrap : 'wrap' , justifyContent : 'space-around'}}>
                                  { taskList.map((taskData) => (
                                      <ToDo  key={taskData.id} taskData={taskData}  {...props}/>
                                  ))} 
              </Container>
    )
}

export default UserStats
