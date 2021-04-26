import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import NotFound from './components/NotFound/NotFound';
import SignUp from './components/SignUp/SignUp';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/destination/:id">
            <Destination></Destination>
          </PrivateRoute>

          <Route path="/signup">
            <SignUp></SignUp>
          </Route>

          <Route path="/">
            <Home></Home>
          </Route>

          <Route exact path="/">
            <Home></Home>
          </Route>
          
          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
