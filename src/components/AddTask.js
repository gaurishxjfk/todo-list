import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Container, Grid, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { todayDate } from '../Pages/Homepage';
import { experimentalStyled as styled } from '@mui/material/styles';

const AddTask = (props) => {

    const [todoForm, setTodoForm] = useState(false)

    const { register, handleSubmit,  formState: { errors,isSubmitSuccessful },reset,setFocus } = useForm();

    const onSubmit = (data) => {
        if(props.isEditing){            
            props.updateTaskList(data.taskname)
        }else{
            props.setTaskList([...props.taskList,addTask(data.taskname,props.dateValue)])
        }
        setTodoForm(false)
    };

    const addTask = (itask,idate) => {
        const id = Math.floor(Math.random() * 10000) + 1;
        return { id:id, name:itask, isDone: false, date: idate }
    }

    const Item = styled(Grid)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

     

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({ taskname: '' });
          props.setDateValue(todayDate) 
        }else if(props.isEditing){

            reset({ taskname: props.task });
            
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful , reset , props.setDateValue,props.isEditing]);

    


    useEffect(() => {
        localStorage.setItem(`task-${props.userID}`,JSON.stringify(props.taskList));     
    }, [props.task, props.taskList, props.userID]); 

    return (
    <Container >

        <Grid container direction='row' justifyContent='flex-end' mt={4}>            
                <Button variant="outlined" color="success" onClick={(e) => (setTodoForm(true))}>Add New</Button>
            
        </Grid>
        <Grid container style={{display : todoForm ? 'block' : 'none'}} direction='row' width={'100%'}>    
               
            <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
                <Grid item md={6} sm={12} xs={12}>
                    <Item>
                    <TextField
                        label="Enter Task..." variant="outlined"  
                        {...register("taskname", {
                        required: true,
                        maxLength: 20,
                        })}
                        fullWidth
                    />
                    {errors?.taskname?.type === "required" && <p style={{color : 'red'}}>This field is required</p>}
                    {errors?.taskname?.type === "maxLength" && (<p style={{color : 'red'}}>Task name cannot exceed 20 characters</p>)}
                    </Item>
                </Grid>
                <Grid item md={6} sm={12} xs={12} spacing={{ xs: 2, md: 3 }}>
                <Item>
                    <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
                            <DesktopDatePicker
                                    label="Date"
                                    inputFormat="dd/MM/yyyy"
                                    minDate={todayDate}
                                    value={props.dateValue}
                                    onChange={(e) => (props.setDateValue(e) )}
                                    renderInput={(params) => <TextField {...params} />}   
                                    fullWidth                                 
                                    />
                            </LocalizationProvider>

                            <Button variant="outlined" 
                                //onClick={isEditing?updateTaskList:addTasks} 
                                style={{height:'3.55rem'}} type="submit">
                                {props.isEditing?'Update':'Add'}
                                
                            </Button>  
                            </Item>
                </Grid>
                        
            </form>
            
        </Grid>
        </Container>
    )
}

export default AddTask
