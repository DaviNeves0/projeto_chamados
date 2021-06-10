import { Switch } from 'react-router-dom';
import Route from './Route';


import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" Component={SignIn}/>
            <Route exact path="/register" Component={SignUp}/>
            <Route exact path="/dashboard" Component={Dashboard} isPrivate/>
            <Route exact path="/profile" Component={Profile} isPrivate/>
        </Switch>
    )
}