import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import {AuthContext} from '../contexts/AuthContext';
import {ThemeContext} from '../contexts/ThemeContext';

//components
import CustomModal from "../components/Modal/CustomModal";
import PublishPostForm from "../components/Posts/PublishForm";

function Home() {

  const {darkMode} = useContext(ThemeContext);
  const {userAuthenticated} = useContext(AuthContext);

  const [listOfPosts, setListOfPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // pour afficher le media sélectionné dans mediatheque
  const [urlFileChosen, setUrlFileChosen] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user,setUser]=useState();
  console.log(userAuthenticated);

  useEffect(() => {
    console.log(userAuthenticated);

    axios.get("http://localhost:3001/posts").then((response) => {
      console.log(response.data);
      setListOfPosts(response.data);
    });
      if (userAuthenticated) {
        console.log(userAuthenticated.email);
        axios.get(`http://localhost:3001/users//byEmail/${userAuthenticated.email}`).then((response) => {
          console.log(response.data);
          console.log(response.data.id);
          setUser(response.data);
          setIsLoading(false);
        })
      }
      setIsLoading(false);

        
      
  }, [userAuthenticated,isModalOpen ]);

  
  const showModal = () => {
    setIsModalOpen(true);
  };
  // upload file chosen
  const handleOk = () => {
    setUrlFileChosen();
    setSelectedFile();
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setUrlFileChosen();
    setSelectedFile();
  };
  return (
  <>
    {isLoading ? <h1>Chargement des données</h1> : <div  className="w-screen flex relative top-[60px] flex-col items-center ">

<div className=" min-h-screen w-11/12 flex flex-col items-center ">
<div className="flex items-center flex-col w-11/12">
  {user &&  <> <button onClick={showModal}className="bg-[#b15f5f] hover:bg-[#a15252] transition ease-in-out duration-200 w-32 h-10 rounded text-white">Publier</button>
  
  <CustomModal width={600} height={550} title="Publier" isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} darkMode={darkMode}>
            <PublishPostForm selectedFile={selectedFile} setSelectedFile={setSelectedFile} userId={user.id} urlFileChosen={urlFileChosen} darkMode={darkMode} setUrlFileChosen={setUrlFileChosen}/>
        </CustomModal></>
}
  {/* container posts */}
  <div className="rounded-xl w-full mt-4 py-10 px-7 flex">
    

    {
      listOfPosts.length === 0 ?
        <tr>
          <td >no records found</td>
        </tr>
        : listOfPosts.map((value) => {
          return(
          <>
            <div style={{backgroundImage:`url(http://localhost:3001/uploads/${value.File.name}`}} className={` bg-center bg-no-repeat bg-cover rounded-lg h-52 w-[216px]`}>
              <div className="items-center h-10 flex flex-row relative left-[-10px] top-[-19px]">
                <div style={{backgroundImage:`url(http://localhost:3001/uploads/${value.User.profile_pic.name}`}} className={`losange rotate-[-10deg] h-12 w-12 bg-center bg-no-repeat bg-cover shadow-[1px_-1px_6px_-1px_rgba(0,0,0,0.3)] z-20 rounded-md`}></div>
                <div className="text-sm text-white relative left-[-10px] bg-[#a56363] h-[20px] w-40 rounded-sm shadow flex justify-center items-center">{value.User.username ? <div></div> : <div>utilisateur</div>}</div>
              </div>
            </div>
            {/*  */}
          </>)
        })}
 


  </div>
</div>

</div>
</div>}
    
  </>
  )
}
export default Home;