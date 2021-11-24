import { Card, CardContent, Grid,  Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const styles= {
    card : { 
        width : 475,
        paddingTop : 1,
        padding: 1,
        marginBottom : 3,
        marginLeft : 0,
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
    const { taskData , updateTask , delModalOpen } = props; 
    
    return (
       <Card sx={styles.card}>
           <Grid sx={{...styles.innerCard , borderLeft : '3px solid red'}}>
                <CardContent sx={styles.cardContainer}>
                    <Grid>
                                <Typography variant="h5" fontWeight="bold">
                                    {taskData.Task}
                                </Typography> 
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {taskData.Description}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="red">
                                    {new Date(taskData.date).toLocaleDateString()}
                                </Typography>                                                    
                    </Grid>
                    <Grid sx={styles.cardIconSection}>
                        <EditIcon onClick={e => updateTask(taskData.id)}/> 
                        <DeleteIcon onClick={e => delModalOpen(taskData.id)}/>
                    </Grid>            
                    
                </CardContent>
            </Grid>
       </Card> 
        
    )
}

export default ToDo
