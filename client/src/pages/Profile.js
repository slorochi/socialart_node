import React, { useState,useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {Button, Modal} from 'antd';
//components
import Mediatheque from '../components/mediatheque/Mediatheque';

const Profile = () => {
  const { userAuthenticated } = useContext(AuthContext);
  console.log(userAuthenticated);
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
   if(!userAuthenticated){
      navigate("/login");
    } 
  })
  return (
    
    <div className="flex relative top-[60px] z-10 flex-col w-full items-center">
        {/* banner */}
        <div className="h-[500px] w-full flex items-end p-10 justify-center" style={{
    background: `url(${process.env.PUBLIC_URL}/25_04_01.png) no-repeat center  fixed`,
    backgroundSize: "cover",
  }}>
    <button className="w-[140px] text-sm h-[35px] border-2 transition ease-in-out duration-200 border-[#f1f1f18c] rounded-[20px] text-[#f1f1f18c] hover:border-white hover:text-white"  onClick={showModal}>
        Modifier
      </button>
      <Modal title="Importer un fichier" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col items-center">
          <Mediatheque userAuthenticated={userAuthenticated}/>
        </div>
      </Modal>
  </div>
        <p className=" w-full" style={{}}>Bienvenue sur votre profil</p>
       
    </div>
  );
};

export default Profile;