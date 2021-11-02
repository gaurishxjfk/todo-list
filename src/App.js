import { useState } from 'react';
import './App.css';
import axios from 'axios'
import { userData } from './config/data';
import Login from './components/Login';
import Addtask from './components/Addtask';
import {  BrowserRouter as Router,  Switch,  Route,  Redirect} from "react-router-dom";
import { UserState } from './context';
import {Button, Container} from '@mui/material';


function App() {

  const { isLoggedIn,setIsLoggedIn,username,password } = UserState();

  var userArr = userData.map(i => i.username);
  var passArr = userData.map(i => i.password);

  const [users, setUsers] = useState();
  
  

const logout = () => {
  setIsLoggedIn(false)
}
  
  return (
    <Router className="App">
       <Switch>
            <Route path="/" exact>
              <Login />
              </Route>   
              <Route to="/tasks">
                {isLoggedIn?<Addtask/>: <Redirect to="/" />}
              </Route>    
        </Switch>      
    </Router>
  );
}

export default App;
