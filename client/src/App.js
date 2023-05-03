import "./App.css";
import React from 'react'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
 
import CreateChapter from "./pages/CreateChapter";


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faHome, faHeart, faUser, );


function App(){
  
  
  return <div className="App">
    <header  className="header">
    <BrowserRouter className="">
      <Link className ="p-2 bg-neutral-700	" to='/createMangas'>Create a Manga</Link>
      <Link to='/'>Home</Link>
      <Link to='login'><FontAwesomeIcon icon="user"/></Link>
      <Routes>
        <Route path='/createMangas' element={<CreateMangas/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/manga/:id' element={<Manga/>}/>
        <Route path='/createChapter/:id' element={<CreateChapter/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
    </BrowserRouter>
    </header>
  </div>
}

export default App 

