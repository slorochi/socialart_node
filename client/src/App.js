import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, Redirect } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

// Contexts
import { ThemeContext } from "./contexts/ThemeContext";
import { AuthContext } from "./contexts/AuthContext";
import { PostsContext } from "./contexts/PostsContext";

//lib decrypt
import { decrypt } from "./utils/encrypt";

//compo
import Navbar from "./components/Navbar.jsx";
import PostUnique from "./pages/PostUnique";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
library.add(faHome, faHeart, faUser);

// potential colors: #1c1d24 #f6eedf
const API_PORT = process.env.REACT_APP_API_PORT;
const API_HOST = process.env.REACT_APP_API_HOST;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfFilteredPosts, setListOfFilteredPosts] = useState([]);

  const [userAuthenticated, setUserAuthenticated] = useState(null);
  const [triggerUserConnexion, setTriggerUserConnexion] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${API_HOST}:${API_PORT}/users/getcookie`, {
        withCredentials: true,
      })
      .then((resp) => {
        let cookies = resp.data;
        const decryptedCookie = decrypt(cookies);
        // recherche l'utilsateur correspondant au cookie
        if (decryptedCookie) {
          axios
            .get(
              `http://${API_HOST}:${API_PORT}/users/byEmail/${decryptedCookie.email}`
            )
            .then((response) => {
              let userAuthInfos = response.data;
              userAuthInfos.accessToken = decryptedCookie.accessToken;
              setUserAuthenticated(userAuthInfos);
            });
        }
      });
  }, [triggerUserConnexion]);

  //posts
  useEffect(() => {
    axios.get(`http://${API_HOST}:${API_PORT}/posts`).then((response) => {
      console.log(response.data);
      setListOfPosts(response.data);
      setListOfFilteredPosts(response.data);
    });
  }, [darkMode]);

  //dark mode
  useEffect(() => {
    let bodyClass;
    let labelClass;
    if (darkMode) {
      bodyClass = "dark";
      labelClass = "darkLabel";
    } else {
      bodyClass = "light";
      labelClass = "lightLabel";
    }
    document.body.className = bodyClass;
    /* document.label.className = labelClass; */
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <PostsContext.Provider
        value={{
          listOfPosts,
          setListOfPosts,
          listOfFilteredPosts,
          setListOfFilteredPosts,
        }}
      >
        <AuthContext.Provider
          value={{
            userAuthenticated,
            setUserAuthenticated,
            triggerUserConnexion,
            setTriggerUserConnexion,
          }}
        >
          <BrowserRouter className="">
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostUnique />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </PostsContext.Provider>
    </ThemeContext.Provider>
  );

  {
    /*  <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<div><Login /></div>} />
        
          <Route path="*" element={<h1> error 404</h1>} />
        </Routes> */
  }
  {
    /* <Footer/>  */
  }
}

export default App;
