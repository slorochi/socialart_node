import React , {useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { NavLink } from 'react-router-dom';
import axios from "axios";
//icons
import {MdDarkMode,MdLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Navbar() {

  const {userAuthenticated } = useContext(AuthContext);
  const {darkMode, setDarkMode } = useContext(ThemeContext);

  console.log(userAuthenticated)
  const handleSearch = (e) => {
    console.log(e.target.value);
  }
  useEffect(()=>{
    console.log(userAuthenticated);
    if(userAuthenticated){
      axios.get(`http://localhost:3001/users/byEmail/${userAuthenticated.email}`).then((response) => {
        console.log(response.data);
      })
    }
  })
  return (

    <nav className={`h-[60px] w-full z-20 fixed ${darkMode ? 'bg-[#23252b]' : 'bg-[#fcf6eb]'}`} 
    >
      <ul className='h-full w-full flex items-center justify-between px-10'>

        <li className="w-[240px]">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active font-semibold text-zinc-600 text-4xl h-10  mb-0" : "navLink font-semibold text-zinc-600 text-4xl h-10  mb-0")} >
            Social Art
          </NavLink>
        </li>
        <li>
          <input type="search" placeholder="Rechercher" className={`searchInput ${darkMode ? '  text-[#919197]' :'  text-[#434346]' } border-[#424040] border-2 `} onChange={(e) => { handleSearch(e) }} />
        </li>
        <li className="w-[240px] flex justify-end">
          <button className="mr-3 flex items-center justify-center text-[#b15f5f] border hover:bg-[#b15f5f] hover:text-white ease-in-out duration-200 border-[#b15f5f] w-10 h-10 rounded-[20px]" onClick={()=>{setDarkMode(!darkMode)}}> {darkMode ? <MdDarkMode size={16}/> : <MdLightMode size={16}/>}</button>
          {!userAuthenticated ? <div className=" font-bold flex">
            <NavLink to='login' className="py-1.5 px-2.5 text-white h-10 rounded w-30 bg-[#b15f5f] ease-in-out duration-200 flex items-center hover:bg-[#924a4a]"><FontAwesomeIcon className="mr-2" icon="user" />Connexion</NavLink>
            <NavLink to='signup' className="py-1.5 px-2.5  rounded w-30 text-[#b15f5f] hover:text-[#8b4545] ease-in-out duration-200 flex items-center">Inscription</NavLink></div>
            : <div className='flex'><NavLink to='profile' className="mr-3 flex items-center justify-center text-[#b15f5f] border hover:bg-[#8b4545] hover:text-white ease-in-out duration-200 border-[#b15f5f] w-10 h-10 rounded-[20px]"><FaUser /></NavLink> <button onClick={()=>{}} className="py-1.5 px-2.5 text-white ease-in-out duration-200 rounded w-30 bg-[#b15f5f] flex items-center hover:bg-[#8b4545]"><FontAwesomeIcon className="mr-2" icon="user" />Déconnexion</button>
            </div>}
        </li>

      </ul>
    </nav>
  );
}

