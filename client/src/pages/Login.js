import React, { useContext, useEffect } from 'react';
import LoginForm from '../components/login/LoginForm';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';


const Login = () => {

  const navigate = useNavigate();
  const { setTriggerUserConnexion } = useContext(AuthContext);
  const {userAuthenticated } = useContext(AuthContext);

  useEffect(()=>{
    console.log(userAuthenticated);
    if(userAuthenticated){navigate("/profile")};
   })
  return(
    <div className="flex flex-col items-center pt-2">
      {userAuthenticated ? null : <>
        <h1 className="font-bold text-4xl mb-2">Connexion</h1>
    <LoginForm setTriggerUserConnexion={setTriggerUserConnexion} navigate={navigate}/></>}
  
</div>
  )
};
export default Login;