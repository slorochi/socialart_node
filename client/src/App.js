import "./App.css";
import React, {useState, useEffect} from 'react'
import {BrowserRouter, Link, Route, Routes, Redirect} from "react-router-dom";
 


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

// Contexts
import { ThemeContext } from "./contexts/ThemeContext";
import { AuthContext } from "./contexts/AuthContext";
//lib decrypt
import { decrypt } from "./utils/encrypt";

//compo 
import Navbar from "./components/Navbar.jsx";
import PostUnique from "./pages/PostUnique";
import Profile from "./pages/Profile"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
library.add(faHome, faHeart, faUser, );

// potential colors: #1c1d24 #f6eedf

function App(){
    const [darkMode, setDarkMode] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const [triggerUserConnexion, setTriggerUserConnexion] = useState(false);

    useEffect(() => {
      axios
        .get(`http://localhost:3001/users/getcookie`, {
          withCredentials: true,
        })
        .then((resp) => {
          let cookies = resp.data;
          const decryptedCookie = decrypt(cookies);
          // recherche l'utilsateur correspondant au cookie
          if (decryptedCookie) {
            axios
              .get(`http://localhost:3001/users/byEmail/${decryptedCookie.email}`)
              .then((response) => {
                let userAuthInfos = response.data;
                userAuthInfos.accessToken = decryptedCookie.accessToken;
                setUserAuthenticated(userAuthInfos);
              });
          }
        });
    }, [triggerUserConnexion]);
  
    //dark mode
    useEffect(()=>{
      let bodyClass;
      if(darkMode){
        bodyClass="dark";
      }
      else bodyClass="light";
      document.body.className = bodyClass;

    },[darkMode])  

   
  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
    <AuthContext.Provider value={{ userAuthenticated, setUserAuthenticated, triggerUserConnexion, setTriggerUserConnexion}}>
    <BrowserRouter className="">
      <Navbar />
     {/*  <header className="h-[60px] w-screen px-10 flex items-center justify-between">
    <Link className="font-semibold text-zinc-600	 text-4xl h-10  mb-0" to='/'>Social Art</Link>
    <input type="search" placeholder="Rechercher" className="searchInput" onChange={(e)=>{handleSearch(e)}}/>
      { !userAuthenticated ?     <div className=" font-bold flex">
<Link to='login' className="py-1.5 px-2.5 text-white h-10 rounded w-30 bg-indigo-600 flex items-center hover:bg-indigo-700"><FontAwesomeIcon className="mr-2" icon="user"/>Connexion</Link>
      <Link to='signup' className="py-1.5 px-2.5  rounded w-30 text-indigo-600 flex items-center">Inscription</Link></div>
    :  <Link to='signout' className="py-1.5 px-2.5 text-white rounded w-30 bg-indigo-600 flex items-center hover:bg-indigo-700"><FontAwesomeIcon className="mr-2" icon="user"/>Déconnexion</Link>}
    </header> */}
    <Routes >
      <Route path='/'  element={<Home/>} />
      <Route path="/post/:id"  element={<PostUnique/>}/>
      <Route path='/login'   element={<Login/>}/>
      <Route path='/signup'   element={<Signup/>}/>
      <Route path="/profile"  element={<Profile/>}/>
    </Routes>
  </BrowserRouter>
  </AuthContext.Provider></ThemeContext.Provider>
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

