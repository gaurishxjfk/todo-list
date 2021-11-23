import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Alert, Button, Container, Grid, Snackbar, TextField } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';
import { todayDate } from '../Pages/Homepage';


const AddTask = (props) => {    

  

    const { register, handleSubmit,  formState: { errors,isSubmitSuccessful },reset } = useForm();

    const onSubmit = (data) => {
        if(props.isEditing){            
            props.updateTaskList(data.taskname)
        }else{
            props.setTaskList([...props.taskList,addTask(data.taskname,props.dateValue)])
        }
        props.setTodoForm(false)
        handleClick();
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
    }, [isSubmitSuccessful , reset , props]);

    


    useEffect(() => {
        localStorage.setItem(`task-${props.userID}`,JSON.stringify(props.taskList));     
    }, [props.task, props.taskList, props.userID]); 

    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    return (
    <Container >
        <Grid container direction='row' justifyContent='flex-end' mt={4}>            
                <Button variant="outlined" color="success" onClick={(e) => (props.setTodoForm(true))}>Add New</Button>
            
        </Grid>
        <Grid container style={{display : props.todoForm ? 'block' : 'none'}} direction='row' width={'100%'}>    
               
            <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
                
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
                    
                
                <Grid  md={12} sm={12} xs={12} spacing={{ xs: 2, md: 3 }}>
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
                                style={{height:'3.55rem'}} type="submit">
                                {props.isEditing?'Update':'Add'}
                                
                            </Button>  
                            </Item>
                </Grid>
                        
            </form>
            
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Task {props.isEditing ? 'Updated' : 'Added'} Successfully!!
             </Alert>
        </Snackbar>
        </Container>

    )
}

export default AddTask
