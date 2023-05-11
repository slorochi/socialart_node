import "./App.css";
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
 


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// authContext
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar.jsx";
import Profile from "./pages/Profile"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

library.add(faHome, faHeart, faUser, );


function App(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleSearch =(e)=>{
      console.log(e.target.value);
    }
    useEffect(() => {
      console.log(isAuthenticated);
      
    },[isAuthenticated])
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <BrowserRouter className="">
      <header className="h-[60px] w-screen px-10 flex items-center justify-between">
    <Link className="font-semibold text-zinc-600	 text-4xl mb-8 h-10  mb-0" to='/'>Social Art</Link>
    <input type="search" placeholder="Rechercher" className="searchInput" onChange={(e)=>{handleSearch(e)}}/>
      { !isAuthenticated ?     <div className=" font-bold flex">
<Link to='login' className="py-1.5 px-2.5 text-white h-10 rounded w-30 bg-indigo-600 flex items-center hover:bg-indigo-700"><FontAwesomeIcon className="mr-2" icon="user"/>Connexion</Link>
      <Link to='signup' className="py-1.5 px-2.5  rounded w-30 text-indigo-600 flex items-center">Inscription</Link></div>
    :  <Link to='signout' className="py-1.5 px-2.5 text-white rounded w-30 bg-indigo-600 flex items-center hover:bg-indigo-700"><FontAwesomeIcon className="mr-2" icon="user"/>Déconnexion</Link>}
    </header>
    <Routes>
      <Route path='/' className="bg-[#E8E6E2]" element={<Home/>} />
      <Route path='/login'  className="bg-[#E8E6E2]" element={<Login/>}/>
      <Route path='/signup'  className="bg-[#E8E6E2]" element={<Signup/>}/>
      <Route path="/profile"  className="bg-[#E8E6E2]" element={<Profile/>}/>
    </Routes>
  </BrowserRouter>
  </AuthContext.Provider>
  )
    
   
   {/*  <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<div><Login /></div>} />
        
          <Route path="*" element={<h1> error 404</h1>} />
        </Routes> */}
        {/* <Footer/>  */}
 
}

export default App 

