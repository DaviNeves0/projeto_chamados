
import {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../contexts/auth'

export default function RouteWrapper({
    Component: Component,
    isPrivate,
    ...rest
}){
    
    const { signed, load } = useContext(AuthContext)

   

    if(load){
        return(
            <div></div>
        )
    }

    if(!signed && isPrivate){
        return <Redirect to="/"/>
    }

    if(signed && !isPrivate){
        return <Redirect to="/dashboard"/>
    }


    return(
        <Route
        {...rest}
        render={ props => (
            <Component {...props}/>
        )}
        />
    )
}
