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
    useEffect(() => {
      console.log(isAuthenticated);
      
    },[isAuthenticated])
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    <BrowserRouter className="">
    <Link className="font-semibold text-zinc-600	 text-4xl mb-8" to='/'>Social Art</Link>
    <div className=" font-bold flex"><Link to='login' className="py-1.5 px-2.5 text-white rounded w-30 bg-indigo-600"><FontAwesomeIcon className="mr-2" icon="user"/>Connexion</Link>
    <Link to='signup' className="py-1.5 px-2.5  rounded w-30 text-indigo-600">Inscription</Link></div>
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/profile" element={<Profile/>}/>
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

