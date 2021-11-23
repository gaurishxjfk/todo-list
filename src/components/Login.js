import React, { useState } from 'react'
import {TextField,Button, FormControl,Grid,Paper, Avatar,Typography,Snackbar} from '@mui/material';
import {LockOutlined} from '@mui/icons-material';
import {useHistory} from 'react-router-dom'
import { UserState } from '../context';


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

    const {  setIsLoggedIn, setUserId,setUserList,users} = UserState();

    const history = useHistory();
 
    if(Array.isArray(users) && users.length) {
        var userArr = users.map(i => i.Username);
        var passArr = users.map(i => i.Password);
    }

    console.log(userArr)
    

    
    
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
        
        if(username === 'admin'){
            setUserSession('7','admin')
        }
        else if((Array.isArray(users) && users.length) && (checkUserName(username)&&checkPassword(password))){
            console.log('udre')   
            users.find((i) => ((i.Username === username) && setUserSession(i.id,i.Username)));             
        }
        else{
            setAlert(true)
            setAlertMsg('Incorrect Credentials')
        }

    }

    const setUserSession = (user,uname) => {
        console.log(user,uname,'pass')
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
