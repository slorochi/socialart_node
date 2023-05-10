import React from 'react';

import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import Auth, { AuthContext } from "../contexts/AuthContext";


export default function Navbar() {

  const { isAuthenticated} = useContext(AuthContext);

  return (

        <>
        
              <NavLink to="/"  className={({ isActive }) => (isActive ? "active ont-semibold text-4xl mb-8" : "navLink ont-semibold text-4xl mb-8")} >
                Social Art
              </NavLink>
              <NavLink style={{fontWeight:600,fontSize:20, }} className={({ isActive }) => (isActive ? "active" : "navLink")} to="/recherche" >
              </NavLink>
              {isAuthenticated ? <NavLink className="w-20 bg-indigo-500 font-bold text-white" to="/profile"/> : <NavLink className="w-20 bg-indigo-500 font-bold" to="/connexion"/>}
              
              </>
  );
}

