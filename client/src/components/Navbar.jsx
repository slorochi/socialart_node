import React , {useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import axios from "axios";
//icons
import { FaUser } from "react-icons/fa" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Navbar() {

  const {userAuthenticated } = useContext(AuthContext);

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

    <nav className="h-[60px] w-full z-20 fixed bg-[#fff]  "
    >
      <ul className='h-full w-full flex items-center justify-between px-10'>

        <li className="w-[224px]">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active font-semibold text-zinc-600 text-4xl h-10  mb-0" : "navLink font-semibold text-zinc-600 text-4xl h-10  mb-0")} >
            Social Art
          </NavLink>
        </li>
        <li>
          <input type="search" placeholder="Rechercher" className="searchInput" onChange={(e) => { handleSearch(e) }} />
        </li>
        <li className="w-[224px] flex justify-end">
          {!userAuthenticated ? <div className=" font-bold flex">
            <NavLink to='login' className="py-1.5 px-2.5 text-white h-10 rounded w-30 bg-indigo-600 ease-in-out duration-200 flex items-center hover:bg-indigo-700"><FontAwesomeIcon className="mr-2" icon="user" />Connexion</NavLink>
            <NavLink to='signup' className="py-1.5 px-2.5  rounded w-30 text-indigo-600 hover:text-indigo-700 ease-in-out duration-200 flex items-center">Inscription</NavLink></div>
            : <div className='flex'><NavLink to='profile' className="mr-3 flex items-center justify-center text-indigo-600 border hover:bg-indigo-600 hover:text-white ease-in-out duration-200 border-indigo-600 w-10 h-10 rounded-[20px]"><FaUser /></NavLink> <button onClick={()=>{}} className="py-1.5 px-2.5 text-white ease-in-out duration-200 rounded w-30 bg-indigo-600 flex items-center hover:bg-indigo-700"><FontAwesomeIcon className="mr-2" icon="user" />Déconnexion</button>
            </div>}
        </li>

      </ul>
    </nav>
  );
}

