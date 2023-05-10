import React from "react";
import { useContext } from "react";
import Auth from "../contexts/Auth";
import { Route, Redirect} from "react-router-dom";
const AuthenticatedRoute = ({path,component})=>{
    const { isAuthenticated} = useContext(Auth);
    return /* isAuthenticated ? (
        <Route exact path ={path} component={component}
        /> ): (<Redirect to="/login"/>) */
    
}
export default AuthenticatedRoute;