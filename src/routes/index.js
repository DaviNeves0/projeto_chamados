import { Switch } from 'react-router-dom';
import Route from './Route';


import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import New from '../pages/New';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" Component={SignIn}/>
            <Route exact path="/register" Component={SignUp}/>
            <Route exact path="/dashboard" Component={Dashboard} isPrivate/>
            <Route exact path="/profile" Component={Profile} isPrivate/>
            <Route exact path="/customers" Component={Customers} isPrivate/>
            <Route exact path="/new" Component={New} isPrivate/>
            <Route exact path="/new/:id" Component={New} isPrivate/>
        </Switch>
    )
}