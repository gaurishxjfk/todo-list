import {  Card, Container, Grid, TextField } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from '@mui/material/Button';

 const getTaskErrMsg = (type) => {
     if(type === 'maxLength'){
         return 'Task name should not exceed 15 characters'
     }if(type === 'pattern'){
        return 'Only alphabets and number allowed'
     }if(type === 'required'){
        return 'Task name is required'
     }
 }

 const getDescErrMsg = (type) => {
    if(type === 'maxLength'){
        return 'Description should not exceed 50 characters'
    }if(type === 'required'){
       return 'Description is required'
    }
}



const AddTaskForm = (props) => {

    const { isEditing , taskList , taskId , setTaskList , setIsEditing , setOpenModal } = props;

    const { register, handleSubmit, formState: { errors },reset } = useForm();

    var id = Math.floor(Math.random() * 10000) + 1;

    const onSubmit = (data) => {
        if(isEditing){
          let result =  taskList.map((task) => (
                task.id === taskId ? { ...data , 
                                    date : startDate, 
                                    id : taskId, 
                                    isDone :false, 
                                    isEditing : false } 
                                : {...task}
            ))
            setTaskList(result)
            setIsEditing(false)  
            setOpenModal(false);           
        }else{
            setTaskList([ ...taskList, { ...data , 
                                    date : startDate, 
                                    id : id, 
                                    isDone :false, 
                                    isEditing : false }]);
                                    
            setOpenModal(false);           
        }
    };

    useEffect(() => {        
        if(isEditing){
            const result = taskList.filter(i => i.id === taskId)  
            reset({ Task : result[0].Task,  Description : result[0].Description  })
            setStartDate(result[0].date)
        }
    }, [taskList,isEditing,taskId,reset])  
    
    
    const [startDate, setStartDate] = useState(new Date());

    return (
        
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{padding : 2,display : 'flex', flexDirection : 'column',justifyContent : 'space-between',height : 300}}>
                <div >
                    <TextField type="text" placeholder="Task" fullWidth
                        {...register("Task", {required: true, max: 15, maxLength: 15, pattern: /^[a-zA-Z0-9_.-]*$/i})} 
                        helperText={errors.Task ? getTaskErrMsg(errors.Task.type) :false}
                        error={errors.Task ? true : false} />
                </div>   
                <div>       
                    <TextField type="text" placeholder="Description"  fullWidth
                        {...register("Description", {required: true, maxLength: 50})} 
                        helperText={errors.Description ? getDescErrMsg(errors.Description.type) :false}
                        error={errors.Description ? true : false}/>
                </div>   
                <div>       
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                            label='Date'
                            format="dd/MMM/yyyy"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            disablePast={true}
                            required
                            style={{width:'100%'}}
                        />
                    </MuiPickersUtilsProvider>
                </div>   
                <div>       
                    <Button type="submit" disabled={String(startDate) === 'Invalid Date' ? true : false} className='add-btn'>
                        {isEditing ? 'Update' : 'Add'}
                    </Button>    
                </div>   
            </Container>

            </form>
      );
}

export default AddTaskForm
