import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { PostsContext } from "../contexts/PostsContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { NavLink } from "react-router-dom";
import axios from "axios";
//icons
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useDebounce from "../hooks/useDebounce";

const API_PORT = process.env.REACT_APP_API_PORT;
const API_HOST = process.env.REACT_APP_API_HOST;

export default function Navbar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { userAuthenticated, setTriggerUserConnexion } =
    useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { setListOfFilteredPosts, listOfPosts } = useContext(PostsContext);

  console.log(userAuthenticated);

  useEffect(() => {
    console.log(userAuthenticated);
    if (userAuthenticated) {
      axios
        .get(
          `http://${API_HOST}:${API_PORT}/users/byEmail/${userAuthenticated.email}`
        )
        .then((response) => {
          console.log(response.data);
        });
    }
  });

  useEffect(
    () => {
      console.log(window.location.href);
      console.log(listOfPosts);
      const newListOfPosts = listOfPosts.filter((post) =>
        `${post.title} ${post.description} ${post.User.email} ${post.User.username}`.includes(
          searchTerm
        )
      );
      setListOfFilteredPosts(newListOfPosts);
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  const handleDeleteCookie = () => {
    console.log("azerjazrizjaripzarjop");
    Cookies.remove("remember");
    setTriggerUserConnexion(false);
    window.location.reload();
  };
  const onChange = (values) => {
    if (window.location.href == "http://localhost:3000/") {
      const filter = values.target.value.trim();
      console.log("onChange");
      setSearchTerm(filter);
    } else {
      const filter = values.target.value.trim();
      console.log("onChange");
      setSearchTerm(filter);
      navigate("/");
    }
  };

  return (
    <nav
      style={{ boxShadow: "0px 0px 16px -7px #0d0d0d" }}
      className={`h-[60px] w-full z-20 fixed ${
        darkMode ? "bg-[#23252b]" : "bg-[#fcf6eb]"
      }`}
    >
      <ul className="h-full w-full flex items-center justify-between px-10">
        <li className="w-[240px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active font-semibold text-zinc-600 text-4xl h-10  mb-0"
                : "navLink font-semibold text-zinc-600 text-4xl h-10  mb-0"
            }
          >
            Social Art
          </NavLink>
        </li>
        <li>
          <input
            type="text"
            id="search"
            name="search"
            onChange={(value) => onChange(value)}
            placeholder="Rechercher"
            className={`searchInput ${
              darkMode ? "  text-[#919197]" : "  text-[#434346]"
            } border-[#424040] border-2 `}
          />
        </li>
        <li className="w-[240px] flex justify-end">
          <button
            className="mr-3 flex items-center justify-center text-[#b15f5f] border hover:bg-[#b15f5f] hover:text-white ease-in-out duration-200 border-[#b15f5f] w-10 h-10 rounded-[20px]"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {" "}
            {darkMode ? <MdDarkMode size={16} /> : <MdLightMode size={16} />}
          </button>
          {!userAuthenticated ? (
            <div className=" font-bold flex">
              <NavLink
                to="login"
                className="py-1.5 px-2.5 text-white h-10 rounded w-30 bg-[#b15f5f] ease-in-out duration-200 flex items-center hover:bg-[#924a4a]"
              >
                <FontAwesomeIcon className="mr-2" icon="user" />
                Connexion
              </NavLink>
              <NavLink
                to="signup"
                className="py-1.5 px-2.5  rounded w-30 text-[#b15f5f] hover:text-[#8b4545] ease-in-out duration-200 flex items-center"
              >
                Inscription
              </NavLink>
            </div>
          ) : (
            <div className="flex">
              <NavLink
                to="profile"
                className="mr-3 flex items-center justify-center text-[#b15f5f] border hover:bg-[#8b4545] hover:text-white ease-in-out duration-200 border-[#b15f5f] w-10 h-10 rounded-[20px]"
              >
                <FaUser />
              </NavLink>{" "}
              <button
                onClick={handleDeleteCookie}
                className="py-1.5 px-2.5 text-white ease-in-out duration-200 rounded w-30 bg-[#b15f5f] flex items-center hover:bg-[#8b4545]"
              >
                <FontAwesomeIcon className="mr-2" icon="user" />
                Déconnexion
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
