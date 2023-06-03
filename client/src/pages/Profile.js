import React, { useState, useContext, useEffect } from 'react';
//contexts
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Modal } from 'antd';
//components
import CustomModal from '../components/Modal/CustomModal';
import Mediatheque from '../components/mediatheque/Mediatheque';
const axiosInstance = axios.create({
  withCredentials: true
})
const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const { userAuthenticated } = useContext(AuthContext);
  console.log(userAuthenticated);
  const navigate = useNavigate();

  const [idFileUploaded, setIdFileUploaded] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [changedUserData, setChangedUserData] = useState(false);

  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPpOpen, setIsModalPpOpen] = useState(false);
  const [isModalUserInfoOpen, setIsModalUserInfoOpen] = useState(false);

  // from modals
  const [urlFileChosen, setUrlFileChosen] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  // upload file chosen
  const handleOk = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log("uploading...");
      setSelectedFile(null);
      axios.post('http://localhost:3001/files/upload', formData)
        .then((res) => {
          console.log(res.data.id);
          const id_banner = res.data.id;
          console.log(res.data.id);
          console.log(user.id);
          axios.put(`http://localhost:3001/users/${user.id}`, { id_banner: id_banner }).then((res) => { console.log(res); window.location.reload(); })

          // Traitez la réponse du serveur ici si nécessaire
        })
        .catch((err) => {
          console.error(err);
          // Gérez les erreurs ici si nécessaire
        });
      setUrlFileChosen();

    };

    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setSelectedFile(null);
    setIsModalOpen(false);
    setUrlFileChosen();

  };

  // upload file chosen
  const handlePpOk = () => {
    if (selectedFile) {
      console.log("selectedFIle :")
      console.log(selectedFile);
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log("uploading...");
      setSelectedFile(null);
      axios.post('http://localhost:3001/files/upload', formData)
        .then((res) => {
          console.log(res.data.id);
          const id_profile_pic = res.data.id;
          console.log(res.data.id);
          console.log(user.id);
          axios.put(`http://localhost:3001/users/${user.id}`, { id_profile_pic: id_profile_pic }).then((res) => { console.log(res); window.location.reload(); })

          // Traitez la réponse du serveur ici si nécessaire
        })
        .catch((err) => {
          console.error(err);
          // Gérez les erreurs ici si nécessaire
        });
    };

    setIsModalPpOpen(false);
    setUrlFileChosen();

  }

  const handlePpCancel = () => {
    setSelectedFile(null);
    setIsModalPpOpen(false);
    setUrlFileChosen();
  };

  useEffect(() => {
    if (!userAuthenticated) {
      navigate("/login");
    }
    else {
      console.log(userAuthenticated.email);
      axios.get(`http://localhost:3001/users//byEmail/${userAuthenticated.email}`).then((response) => {
        console.log(response.data);
        console.log(response.data.id);
        setUser(response.data);
        if(response.data.bio){
          console.log("????")
        }
        if(!response.data.bio){
          console.log("n obiop")
        }
        setBio(response.data.bio);
        setUsername(response.data.username);
        setIsLoading(false);
      })
    }
  }, [changedUserData])

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const showModalUserInfos = () => {
    setIsModalUserInfoOpen(true);
  }
  const handleUserInfoOk = () => {
    axios.put(`http://localhost:3001/users/${user.id}`, { bio, username })
      .then((response) => {
        console.log(response.data);
        window.location.reload()

        // Afficher un message de succès ou effectuer une action supplémentaire si nécessaire
      })
      .catch((error) => {
        console.log(error);
        // Afficher un message d'erreur ou effectuer une action supplémentaire si nécessaire
      });

    setIsModalUserInfoOpen(false);
    
    

  }

  const handleUserInfoCancel = () => {
    setIsModalUserInfoOpen(false);
  };
  return (
    isLoading ?
      <p>loading...</p> :
      <div className="flex relative top-[60px] z-10 flex-col w-full items-center">
        {/* banner */}

        <div className="h-[500px] w-full flex flex-col items-center  justify-end" style={{
          backgroundImage: user?.banner ? `url(http://localhost:3001/uploads/${user.banner.name})` : `url(${process.env.PUBLIC_URL}/25_04_01.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}><button className="w-[100px] text-sm h-[35px] border-2 relative top-[40px] transition ease-in-out duration-200 border-[#f1f1f18c] rounded-[20px] text-[#f1f1f18c] hover:border-white hover:text-white" onClick={showModal}>
            Modifier
          </button>
          <CustomModal width={520} height={400} title="Modifier votre bannière" isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} darkMode={darkMode}>

            <Mediatheque urlFileChosen={urlFileChosen} darkMode={darkMode} setUrlFileChosen={setUrlFileChosen} userFile={user?.banner} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
          </CustomModal>
          {/* profile pic */}
          <div className="h-36 w-36 relative top-[72px] cursor-pointer scale-100	transition ease-in-out duration-200 hover:scale-105 rounded-[50px]"
            style={{
              backgroundImage: user?.profile_pic ? `url(http://localhost:3001/uploads/${user.profile_pic.name})` : `url(${process.env.PUBLIC_URL}/25_04_01.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            onClick={() => { setIsModalPpOpen(true) }}></div>
          <CustomModal width={520} height={400} title="Modifier votre image de profil" isOpen={isModalPpOpen} onOk={handlePpOk} onCancel={handlePpCancel} darkMode={darkMode}>
            <div className="flex flex-col items-center ">
              <Mediatheque userAuthenticated={userAuthenticated} urlFileChosen={urlFileChosen} darkMode={darkMode} setUrlFileChosen={setUrlFileChosen} userFile={user?.profile_pic} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            </div>
          </CustomModal>
        </div>
       { /* user infos */}
        <div className="flex flex-col items-center relative top-[72px] w-full">
          <div>
            <p className=" w-full font-semibold text-2xl mb-2 mt-1" style={{}}>{user.username} </p>
          </div>
          <hr className=" border-[#454649] w-5/12"></hr>
          <p className="w-5/12 text-center my-3">{!user.bio  ?  "ajouter une description" : user.bio}</p>
          <hr className="border-[#454649] w-5/12"></hr>
          <button onClick={showModalUserInfos} className="w-[90px] mt-2 text-sm h-[35px] border-2 transition ease-in-out duration-200 border-[#f1f1f18c] rounded-[20px] text-[#f1f1f18c] hover:border-white hover:text-white">Editer</button>

          {/* modal edit */}
          
        </div>
        <CustomModal width={520} height={400} title="Modifier vos informations" isOpen={isModalUserInfoOpen} onOk={handleUserInfoOk} onCancel={handleUserInfoCancel} darkMode={darkMode}>
            <div className="flex flex-col items-center w-full">
              <div className="w-9/12 flex-col flex">
                <label  htmlFor="bio">Bio:</label>
                <textarea maxlength="254" id="bio" className="outline-none bg-transparent border border-[#924a4a] p-2" value={bio} onChange={handleBioChange} />
              </div>
              <div className="w-9/12 mt-2 flex-col flex">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username " className="outline-none border border-[#924a4a] bg-transparent p-2" value={username} onChange={handleUsernameChange} />
              </div>
            </div>
          </CustomModal>
            </div>
  );
};

export default Profile;