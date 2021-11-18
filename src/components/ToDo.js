import { Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import React, { Fragment } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserState } from '../context';

const styles= {
    card : { 
        width : 775,
        paddingTop : 1,
        padding: 1,
        marginBottom : 3,
        marginLeft : 0
    },
    innerCard : { 
        maxWidth: 475 ,
        minWidth: 275 , 
        
    },
    cardContainer : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    cardTypoSection : {

    },
    cardIconSection : {
        marginTop : 2,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between'
    }
}






const ToDo = (props) => { 
    return (
       <Card sx={styles.card}>
           <Grid sx={{...styles.innerCard , borderLeft : '3px solid red'}}>
                <CardContent sx={styles.cardContainer}>
                    <Grid>
                                <Typography variant="h5" fontWeight="bold">
                                    {props.row.Task}
                                </Typography> 
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {props.row.Description}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="red">
                                    {new Date(props.row.date).toLocaleDateString()}
                                </Typography>                                                    
                    </Grid>
                    <Grid sx={styles.cardIconSection}>
                        <EditIcon color='text.secondary' onClick={e => props.editMode(props.row.id)}/>
                        <DeleteIcon/>
                    </Grid>
                    
                    
                </CardContent>
            </Grid>
       </Card> 
        
    )
}

export default ToDo
