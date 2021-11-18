import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { UserState } from '../context';
import { compare, getTasks } from '../Pages/Homepage';

 const getTaskErrMsg = (type) => {
     if(type === 'maxLength'){
         return 'Task name should not exceed 15 characters'
     }
     if(type === 'pattern'){
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
    const { register, handleSubmit, formState: { errors } } = useForm();
    var id = Math.floor(Math.random() * 10000) + 1;
    const onSubmit = data => props.setTaskData([...props.taskData,{...data,date : startDate,id : id,isDone :false,isEditing : false }]);
//[...props.taskList,addTask(data.taskname,props.dateValue)]
    const {userID} = UserState();
    
    const [startDate, setStartDate] = useState(new Date());
   
    

    

    /*admin: false  checkDone: id => {…}  deleteTask: id => {…}  handleClose: (event, reason) => {…}
isDoneFilter: false    isEditing: false   onDelete: id => {…}   openModal: false    rows: (2) [{…}, {…}]
setIsDoneFilter: ƒ ()    setOpenModal: ƒ ()    setTaskId: ƒ ()   taskId: ""    updateTask: id => {…} */

    
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <TextField type="text" placeholder="Task" 
                    {...register("Task", {required: true, max: 15, min: 1, maxLength: 15, pattern: /^[a-zA-Z0-9_.-]*$/i})} 
                    helperText={errors.Task ? getTaskErrMsg(errors.Task.type) :false}
                    error={errors.Task ? true : false} />

          
            <TextField type="text" placeholder="Description"  
                    {...register("Description", {required: true, maxLength: 50})} 
                    helperText={errors.Description ? getDescErrMsg(errors.Description.type) :false}
                    error={errors.Description ? true : false}/>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                    label='Date'
                    format="dd/MMM/yyyy"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    disablePast={true}
                    required
                />
            </MuiPickersUtilsProvider>

          <Button type="submit" disabled={String(startDate) === 'Invalid Date' ? true : false}>Add</Button>

        </form>
      );
}

export default AddTaskForm
