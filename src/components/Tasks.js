import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Container, Tab } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import TodaysTasks from './TodaysTasks'
import UpcomingTasks from './UpcomingTasks'
import arrayCheck from '../Pages/Homepage'

const Tasks = (props) => {

    
    
    const [tabValue, setTabValue] = useState('1');

    const [openModal, setOpenModal] = useState(false);

        const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
        };

        //set todo done 
        const checkDone = (id) => { 
            props.setTaskList(props.taskList.map((i) => (i.id === id ? {...i,isDone : !i.isDone}: i)))
        }        

        const handleClose = (event, reason) => {
            setOpenModal(false);
            if (reason === 'clickaway') {
              return;
            }
        }

        const filteredResults = props.isDoneFilter ? 
        arrayCheck(props.taskList) && 
          props.taskList.filter(i => (
                (i.Task.includes(props.searchTask)) || (i.date.includes(props.searchTask))) 
                && 
                i.isDone === props.isDoneFilter)
        : 
        arrayCheck(props.taskList) && 
          props.taskList.filter(i => (
                i.Task.includes(props.searchTask)) || (i.date.includes(props.searchTask)));


    return (
        <Container>
        <TabContext value={tabValue}>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                        <TabList onChange={handleTabChange} aria-label="lab API tabs example" >
                            <Tab label="Today" value="1" />
                            <Tab label="Upcoming" value="2" />                           
                        </TabList>
                       
                </Box>

                <TabPanel value="1">
                        <TodaysTasks    taskList={filteredResults} 
                                            checkDone={checkDone} 
                                            updateTask={props.updateTask}
                                            setOpenModal={setOpenModal}
                                            deleteTask={props.deleteTask}
                                            handleClose={handleClose}
                                            openModal={openModal} 
                                            taskId={props.taskId} 
                                            setTaskId={props.setTaskId}  
                                            isDoneFilter={props.isDoneFilter} 
                                            isEditing={props.isEditing}  
                                            setIsDoneFilter={props.setIsDoneFilter}                                  
                        />
                </TabPanel>

                <TabPanel value="2">
                        <UpcomingTasks  taskList={filteredResults} 
                                            checkDone={checkDone} 
                                            updateTask={props.updateTask}
                                            setOpenModal={setOpenModal}
                                            deleteTask={props.deleteTask}
                                            handleClose={handleClose}
                                            openModal={openModal}
                                            taskId={props.taskId} 
                                            setTaskId={props.setTaskId}
                                            isDoneFilter={props.isDoneFilter} 
                                            isEditing={props.isEditing} 
                                            setIsDoneFilter={props.setIsDoneFilter}   
                        />
                </TabPanel>
                
                
        </TabContext>
        </Container>
    )
}

export default Tasks
