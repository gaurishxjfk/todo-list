import './App.css';
import Login from './components/Login';
import {  BrowserRouter as Router,  Switch,  Route,  Redirect} from "react-router-dom";
import { UserState } from './context';
import AdminPage from './components/AdminPage';
import Homepage from './Pages/Homepage';

function App() {

  const { isLoggedIn } = UserState();

  
  return (
    <Router className="App">
       <Switch>
            <Route path="/" exact>
                {isLoggedIn?<Redirect to="/tasks" />:<Login/> }
              </Route>   
              <Route to="/tasks">
                {isLoggedIn?<Homepage  />: <Redirect to="/" />}
              </Route>   
              <Route to="/admin" exact>
                  <AdminPage/>
              </Route> 
        </Switch>      
    </Router>
  );
}

export default App;
