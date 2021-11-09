import './App.css';
import Login from './components/Login';
import Addtask from './components/Addtask';
import {  BrowserRouter as Router,  Switch,  Route,  Redirect} from "react-router-dom";
import { UserState } from './context';
import AdminPage from './components/AdminPage';

function App() {

  const { isLoggedIn } = UserState();
  
  return (
    <Router className="App">
       <Switch>
            <Route path="/" exact>
                <Login/>
              </Route>   
              <Route to="/tasks">
                {isLoggedIn?<Addtask/>: <Redirect to="/" />}
              </Route>   
              <Route to="/admin" exact>
                  <AdminPage/>
              </Route> 
        </Switch>      
    </Router>
  );
}

export default App;
