import React from 'react';
import { Container, Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TodayIcon from '@mui/icons-material/Today';
import ListIcon from '@mui/icons-material/List';
import GridOnIcon from '@mui/icons-material/GridOn';
import Tasks from './Tasks';
import AddTaskModal from './AddTaskModal';
import ToDo from './ToDo';
import Calender from './Calender';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} centered>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const TabMenuListBar = (props) => {

  const {isDoneFilter,taskList,searchTask,setTaskList} = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //set todo done 
  const checkDone = (id) => { 
    setTaskList(taskList.map((i) => (i.id === id ? {...i,isDone : !i.isDone}: i)))
}  


  const filteredResults = isDoneFilter ? 
                          taskList.filter(i => ((i.Task.includes(searchTask)) || (i.date.includes(searchTask))) && i.isDone === isDoneFilter)
                          :
                          taskList.filter(i => (i.Task.includes(searchTask)) || (i.date.includes(searchTask)));


    return (
    <>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered >
            <Tab icon={<ListIcon/>} iconPosition="end" label="List View" style={{ marginLeft :10, marginRight: 10 }}/>
            <Tab icon={<TodayIcon/>} iconPosition="end" label="Calender" style={{ marginLeft :10, marginRight: 10 }}/>
            <Tab icon={<GridOnIcon/>} iconPosition="end" label="Task Sheet" style={{ marginLeft :10, marginRight: 10 }}/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <>
              <AddTaskModal  {...props}/>
              <Container sx={{display : 'flex' , flexWrap : 'wrap' , justifyContent : 'space-around'}}>
                                  { filteredResults.map((taskData) => (
                                      <ToDo  key={taskData.id} taskData={taskData} checkDone={checkDone} {...props}/>
                                  ))} 
              </Container>
          </>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Calender {...props}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tasks {...props}/>
      </TabPanel>
      </>
    )
}

export default TabMenuListBar
