import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  const navigate = useNavigate();
  const redirectToLogin = ()=>{
    navigate("/login");
  }
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login");
    }
  })
  return (
    <div>
      {isAuthenticated ?? (
        <p>Bienvenue sur votre profil</p>
      )}
    </div>
  );
};

export default Profile;