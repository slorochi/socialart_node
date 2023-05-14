import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Col, Divider, Row, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
  <>
    {isLoading ? <h1>Chargement des données</h1> : <div style={{ height: '100vh', background: 'rgb(50 50 50)' }} className="w-screen flex flex-col items-center ">

<div className="bg-[#e8e6e2] min-h-screen w-11/12 flex flex-col items-center ">
<div className="flex justify-center flex-col w-11/12">
  
  {/* container posts */}
  <div className="rounded-xl w-full bg-[#BCBCBC] py-10 px-7 flex">

    {
      listOfPosts.length === 0 ?
        <tr>
          <td >no records found</td>
        </tr>
        : listOfPosts.map((value) => {
          <>
            <div className="bg-[#D4D4D4] rounded-lg h-52 w-[216px]">
              <div className="items-center h-10 flex flex-row relative left-[-10px] top-[-19px]">
                <div className="losange rotate-45 h-12 w-12 bg-[#E2E2E2] shadow-[1px_-1px_6px_-1px_rgba(0,0,0,0.3)] z-20 rounded-md"></div>
                <div className="text-sm text-slate-500 relative left-[-10px] bg-[#E2E2E2] h-[20px] w-40 rounded-sm shadow flex justify-center items-center">{value.title}</div>
              </div>
            </div>
            <tr>
              <td>{value.title}</td>
              <td>{value.likes}</td>
              <td>{value.type}</td>
            </tr>
          </>
        })}



  </div>
</div>

</div>
</div>}
    
  </>
  )
}
export default Home;