import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Col, Divider, Row, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline }  from 'react-icons/md';

function Home() {

  const [listOfMangas, setListOfMangas] = useState([]);
  const navigate = useNavigate();

  const style = { background: 'dodgerBlue', padding: '8px 0', textAlign: 'center', color: '#fff', fontWeight: 600, fontSize: '16px', cursor: 'pointer', "&:hover": { color: "#fff" } };
  
  useEffect(() => {
    axios.get("http://localhost:3001/mangas").then((response) => {
      setListOfMangas(response.data);
    });
  }, []);
  return (<div style={{height:'100vh',background:'rgb(50 50 50)'}}className="contMangaPage flex flex-col items-center ">

    {/* banderole liste des mangas + filtre */}
    <div className="h-10 text-center flex items-center justify-center w-full" style={{background:'rgb(65 72 86)'}}>

    <h1  className="text-white ">SocialArt</h1>
    </div>
    
    {/* container grid  */}
    <div className=" w-11/12">
    {/* grid map mangas */}
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4	lg:grid-cols-5  xl:grid-cols-6 2xl:grid-cols-7">
      
      {listOfMangas.map((value, key) => {
        return (
          <div
          className=""
            key={key}
            onClick={() => navigate(`/manga/${value.id}`,)}
           >
            <button className="flex justify-center items-center flex-row bg-red-700 h-9 w-9 rounded-[18px] z-10	absolute hover:bg-red-600/90"style={{cursor:'pointer',}}><MdOutlineDeleteOutline  size={20}/></button>
            <div className='mangasCard'>
              <div className="h-[43px] overflow-hidden flex items-start  " style={{  fontFamily: 'quantum',fontWeight:400,width:'calc(100% )',fontSize:26,lineHeight:'2.15rem',textShadow:'#000000 1px 1px 8px',backdropFilter:'blur(5px)'}}>
                <span className='left-[36px] relative text-ellipsis	' style={{width:'calc(100% - 36px)'}}>{value.title}</span>
              </div>
              <div className='flex items-center justify-center h-full' ><p className="description text-justify px-3">{value.description}</p></div>
            </div>
            
          </div>
        )
      }
      )
      }
    </div>
    </div>
  </div>
  )
}
export default Home;