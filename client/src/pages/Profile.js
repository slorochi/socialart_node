import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

//components
import Mediatheque from '../components/mediatheque/Mediatheque';

const Profile = () => {
  const { userAuthenticated } = useContext(AuthContext);
  console.log(userAuthenticated);
  const navigate = useNavigate();

  useEffect(()=>{
   if(!userAuthenticated){
      navigate("/login");
    } 
  })
  return (
    <div className="flex relative top-[-60px] z-10 flex-col w-full items-center">
        {/* banner */}
        <div className="h-[500px] w-full" style={{
    background: `url(${process.env.PUBLIC_URL}/25_04_01.png) no-repeat center  fixed`,
    backgroundSize: "cover",
  }}></div>
        <p className="h-[1600px] w-full" style={{}}>Bienvenue sur votre profil</p>
        <Mediatheque userAuthenticated={userAuthenticated}/>
    </div>
  );
};

export default Profile;