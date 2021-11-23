import React from 'react'
import { Card, CardContent, Checkbox, Grid,  Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export const styles= {
    card : { 
        width : 475,
        paddingTop : 1,
        padding: 1,
        marginBottom : 3,
        marginLeft : 0,
        backgroundColor : '#fafafa'
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
       marginTop : -2,
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between',
        alignItems : 'center'
    }
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ToDo = (props) => { 
    const { taskData , updateTask , delModalOpen,checkDone } = props; 

    const todoColor = (date) => {
        if(new Date(date).toLocaleDateString() < new Date().toLocaleDateString()) {
            return 'hsl(358,62%,52%)'
        } else if(new Date(date).toLocaleDateString() > new Date().toLocaleDateString()) {
            return 'hsl(206,100%,40%)'
        } else{
            return 'hsl(140,40%,55%)'
        } 
    }
    
    
    return (
       <Card sx={styles.card}>
           <Grid sx={{...styles.innerCard , borderLeft : `3px solid ${todoColor(taskData.date)}`}}>
                <CardContent sx={styles.cardContainer}>
                    <Grid>
                                <Typography variant="h5" fontWeight="bold">
                                    {taskData.Task}
                                </Typography> 
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {taskData.Description}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color={todoColor(taskData.date)}>
                                    {new Date(taskData.date).toLocaleDateString()}
                                </Typography>                                                    
                    </Grid>
                   
                    <Grid sx={styles.cardIconSection}>
                        <Checkbox {...label}  
                                    icon={<BookmarkBorderIcon />}  
                                    checkedIcon={<BookmarkIcon />} 
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 30,color:`${todoColor(taskData.date)}` } }}                                     
                                    onChange={e => checkDone(taskData.id)} 
                                    defaultChecked={taskData.isDone}/>
                        <EditIcon onClick={e => updateTask(taskData.id)}/> 
                        <DeleteIcon onClick={e => delModalOpen(taskData.id)}/>
                    </Grid>            
                    
                </CardContent>
            </Grid>
       </Card> 
        
    )
}

export default ToDo
