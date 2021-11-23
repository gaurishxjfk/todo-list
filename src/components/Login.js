import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {TextField,Button, FormControl,Grid,Paper, Avatar,Typography,Snackbar} from '@mui/material';
import {LockOutlined} from '@mui/icons-material';
import { UserState } from '../context';
import { userData } from '../config/data';
import arrayCheck from '../Pages/Homepage'


export const styles = {
    paper : {
        padding : 20,
        height : '70vh',
        width : '50vh',
        margin : '30px auto'
    },
    form : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'spaceAround',
        gap : 5
    }
}

const Login = () => {

    const {  setIsLoggedIn, setUserId,setUserList} = UserState();

    const history = useHistory();

    var userArr = arrayCheck(userData) && userData.map(i => i.username);
    var passArr = arrayCheck(userData) && userData.map(i => i.password);
    
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const checkUserName = (text) =>{
        return userArr.includes(text)
    }     
    
     const checkPassword = (text) =>{
      return passArr.includes(text)
    }

    const validateLogin = () => {

        if(checkUserName(username)&&checkPassword(password)){    
            arrayCheck(userData) && 
                userData.find((i) => ((i.username === username) && setUserSession(i.id,i.username)));             
        }else{
            setAlert(true)
            setAlertMsg('Incorrect Credentials')
        }

    }

    const setUserSession = (user,uname) => {
        setIsLoggedIn(true); 
        setUserId(user);
        setUserList({id : user, isLoggedIn :true, isAdmin: uname === 'admin' ? true : false})
        uname === 'admin' ? history.push('/admin') : history.push('/tasks');
    }
    
    return (
        <Grid>
            <Paper elevation={11} style={styles.paper}>
                <Grid align='center'>
                    <Avatar><LockOutlined/></Avatar>
                    <Typography variant="h3">Login</Typography>
                </Grid>  
                <FormControl align='center' style={styles.form}>  
                    <TextField  id="outlined-required" label="Username" onChange={(e) => {setUsername(e.target.value); setAlert(false)}} fullWidth required/>
                     <TextField  id="outlined-password-input" label="Password" type="password" onChange={(e) => {setPassword(e.target.value); setAlert(false)}} fullWidth required/>   
                     <Button variant="outlined" type="submit" onClick={validateLogin} fullWidth>Login</Button> 
                     </FormControl>  
                     <Snackbar
                        open={alert}
                        autoHideDuration={2000}
                        message={alertMsg}
                        onClose={(e) => setAlert(false)}
                    />             
            </Paper>
        </Grid>
    )
}

export default Login
