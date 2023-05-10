import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <div>
      {isAuthenticated ? (
        <p>Bienvenue sur votre profil</p>
      ) : (
        <p>Veuillez vous connecter pour accéder à cette page</p>
      )}
    </div>
  );
};

export default Profile;