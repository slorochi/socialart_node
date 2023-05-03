import "./App.css";
import React from 'react'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
 


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Home from "./pages/Home";
import Login from "./pages/Login";

library.add(faHome, faHeart, faUser, );


function App(){
  
  
  return <div className="App">
    <header  className="header">
    <BrowserRouter className="">
      <Link to='/'>Home</Link>
      <Link to='login'><FontAwesomeIcon icon="user"/></Link>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </BrowserRouter>
    </header>
  </div>
}

export default App 

