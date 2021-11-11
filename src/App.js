import './App.css';
import Login from './components/Login';
import {  BrowserRouter as Router,  Switch,  Route,  Redirect} from "react-router-dom";
import { UserState } from './context';
//import AdminPage from './components/AdminPage';
import Homepage from './Pages/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import Notfound from './components/Notfound';
//import ProtectedAdmin from './components/ProtectedAdmin';

function App() {

  const { isLoggedIn } = UserState();
  
  return (
    <Router >
       <Switch>
            <Route path="/" exact>
                {isLoggedIn?<Redirect to="/tasks" />:<Login/> }
              </Route>   
              <ProtectedRoute path="/tasks" component={Homepage}/>   
              {/* <ProtectedAdmin path="/admin" component={AdminPage}/> */}
              <Route >
                  <Notfound/>
              </Route> 
        </Switch>      
    </Router>
  );
}

export default App;
