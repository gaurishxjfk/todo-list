import React from 'react'
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styles } from './ToDo'

const UserCard = (props) => {

    const { First_name, Last_name ,uID,delUser,Username,openUser } = props;

    const history = useHistory()



    return (
        <Card sx={styles.card}>
            <Grid sx={{...styles.innerCard}}>
                <CardContent sx={styles.cardContainer}>
                    <Avatar alt={First_name} src={props.Avatar} /> 
                    <Grid>
                            <Typography variant="h5" fontWeight="bold">
                                  {First_name} {Last_name}
                            </Typography> 
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    @{Username}
                                </Typography>  
                                                                       
                    </Grid>
                    <Grid sx={styles.cardIconSection}>
                        <DeleteIcon onClick={e => delUser(uID)}
                                    style={{cursor : 'pointer'}}/>
                        <ChevronRightIcon  onClick={e => openUser(uID,Username)}
                                        style={{cursor : 'pointer'}}/>
                    </Grid>  
                </CardContent>
            </Grid>
        </Card>
    )
}

export default UserCard
