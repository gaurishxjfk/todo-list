import React, { useEffect, useState } from 'react';
import {TextField,Button,   ListItemButton, ListItemText, Collapse, List,  Checkbox} from '@mui/material';
import {Snackbar,Grid,Paper,Typography} from '@mui/material'
import { UserState } from '../context';
import { userData } from '../config/data';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import UpcomingTasks from './UpcomingTasks';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TodaysTasks from './TodaysTasks';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


    //function to sort Done todos
    export const compare = ( a, b ) => {
        if ( a.isDone < b.isDone){
        return -1;
        }
        if ( a.isDone > b.isDone ){
        return 1;
        }
        return 0;
    }

    //styles
    export const styles = {
        paper : {
            padding : 20,
            height : '70vh',
            width : '50vh',
            margin : '30px auto'
        },
        doneTask:{
            textDecoration: 'line-through' ,
            color : 'grey'
        },
        pendingTask:{
            textDecoration: 'none' 
        }
    }

    export const todayDate = new Date()//.toLocaleDateString()

const Addtask = () => {

    const getTasks = () => {
        const result = localStorage.getItem(`task-${userID}`);
        if(result){
            return JSON.parse(result)
        }else{
            return []
        }        
    }       
    

    const {userID,setIsLoggedIn} = UserState();

    const [taskId, setTaskId] = useState('');
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState(getTasks().sort( compare ));
    const [isEditing, setIsEditing] = useState(false);
    const [alert, setAlert] = useState(false);
    const [dateValue, setDateValue] = useState(todayDate);
    const [openModal, setOpenModal] = useState(false);
    const [searchTask, setSearchTask] = useState('');
    const [tabValue, setTabValue] = useState('1');
    const [openFilter, setOpenFilter] = useState(false);
    const [isDoneFilter, setIsDoneFilter] = useState(false);

    const addTasks = () => {
        if(!task){}
        else{
            checkDuplicacy(task,dateValue).length > 0 ? setAlert(true)   :                                           
                setTaskList([...taskList,addTask(task,dateValue)])
                setTask('')   
                setDateValue(todayDate)                                     
        }        
    }

    const addTask = (itask,idate) => {
        const id = Math.floor(Math.random() * 10000) + 1;
        return {id:id,
                name:itask,
                isDone: false,
                date: idate
                }
    }

    const deleteTask = (id) => {
        const result = taskList.filter(i => i.id !== id)
        setTaskList(result)
        setAlert(false)
    }     
    
    const updateTask = (id) => {
        setIsEditing(true)
        const result =taskList.filter(i => i.id === id)
        setTaskId(result[0].id)
        setTask(result[0].name)
        setDateValue(result[0].date)
        setAlert(false)
    }  

    const updateTaskList = () => {  
        setAlert(false);

       if(checkDuplicacy(task,dateValue).length > 0){
            setAlert(true)
       }else{
            const result =taskList.map((i) => (i.id === taskId ? {...i, name : task,date : dateValue}  : i  ))
            setTaskList(result)
       }       
        setIsEditing(false)
        setTask('')
        setDateValue(todayDate)   
    }  

    const checkDuplicacy = (text,day) =>{
        
       return taskList.filter((itask) =>
           itask.name.toLowerCase() === text.toLowerCase()  
           &&  
           itask.date === day
        )
        
    }

    //set todo done 
    const checkDone = (id) => { 
        setTaskList(taskList.map((i) => (i.id === id ? {...i,isDone : !i.isDone}: i)))
    }

    const handleClose = (event, reason) => {
        setOpenModal(false);
        if (reason === 'clickaway') {
          return;
        }
    }

    useEffect(() => {
        localStorage.setItem(`task-${userID}`,JSON.stringify(taskList));     
    }, [task, taskList, userID]);       

    const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
    };

    const filteredResults = //isDoneFilter ? 
    taskList.filter(i => i.name.includes(searchTask) && i.isDone === isDoneFilter)
     //   :
    // taskList.filter(i => i.name.includes(searchTask) )

     const handleClickFilter = () => {
    setOpenFilter(!openFilter);
    setIsDoneFilter(false)
   
  };

  const userDtls = userData.filter(i => i.id === userID)
  
    
    return (
        <Grid>
            <Button variant="outlined"  onClick={() => setIsLoggedIn(false) } fullWidth>Logout</Button> 
            <Paper elevation={10} style={styles.paper}>
                <Grid align='center'>
                     <img src={userDtls[0].avatar} alt="" style={{borderRadius : '10rem',height:'3rem',width: 'auto'}}/>
                    <Typography variant="h5">Hello {userDtls[0].first_name}</Typography> 
                </Grid> 
                <Grid  align='center'  > 
                  <TextField id="outlined-basic" label="Enter Task..." variant="outlined" 
                        onChange={(e) => {setTask(e.target.value) 
                                        setAlert(false)
                                    }} 
                        value={task}
                        fullWidth   
                    />
                    <Grid container mt={2} justifyContent='space-evenly'>   
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DesktopDatePicker
                                    label="Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={dateValue}
                                    minDate={todayDate}
                                    onChange={(e) => {setDateValue(e) ;
                                            setAlert(false)
                                        }} 
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" 
                                onClick={isEditing?updateTaskList:addTasks} 
                                style={{height:'3.55rem'}}>
                                {isEditing?'Update':'Add'}
                            </Button>  
                        </Grid>
                    </Grid>
                </Grid>             
                    <Snackbar
                        open={alert}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="Task already added..."
                    />

                    <Paper elevation={4} sx={{mt : 2,display:'flex',flexDirection:'row' , justifyContent:'space-between'}}>
                    <Grid item lg={12} p={1}>
                            <TextField id="outlined-basic" label="Search Task..." variant="outlined" type='search'                               
                                 fullWidth        onChange={e => setSearchTask(e.target.value)} size="small"
                            />
                            </Grid>
                            <Grid >
                             <ListItemButton onClick={handleClickFilter}>
                            <ListItemText primary="Filter" />
                                    {openFilter ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openFilter} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Done Tasks" />
                                        <Checkbox defaultChecked={isDoneFilter} onChange={e => setIsDoneFilter(!isDoneFilter)} />
                                    </ListItemButton>
                                    </List>
                                </Collapse>
                                </Grid>
                    </Paper>
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
                                            updateTask={updateTask}
                                            setOpenModal={setOpenModal}
                                            deleteTask={deleteTask}
                                            handleClose={handleClose}
                                            openModal={openModal}                                        
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <UpcomingTasks  taskList={filteredResults} 
                                            checkDone={checkDone} 
                                            updateTask={updateTask}
                                            setOpenModal={setOpenModal}
                                            deleteTask={deleteTask}
                                            handleClose={handleClose}
                                            openModal={openModal}
                            />
                        </TabPanel>
                    </TabContext>

                  { }
        </Paper>
    </Grid>
    )
}

export default Addtask
