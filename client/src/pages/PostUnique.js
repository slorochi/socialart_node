import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { ThemeContext } from '../contexts/ThemeContext';
function PostUnique() {

    const { darkMode } = useContext(ThemeContext);
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const postId = params.id;
    const navigate = useNavigate();
    // further feature: add the users comments in the top of the post (personnal comment);

    useEffect(() => {
        console.log(postId);
        axios.get(`http://localhost:3001/posts/${postId}`).then((response) => {
            console.log(response.data);
            setPost(response.data);
            setIsLoading(false);
        }).catch(err => console.log(err));
    }, [])
    return (
        <div className="main flex flex-col max-h-screen relative top-[0px] h-screen  items-center ">
            {isLoading ? <div>loading</div> :
                <div style={{ height: 'calc(100% - 60px)' }} className="  w-full flex-col relative top-[60px]">


                    <div className="flex w-full h-full">
                        <div className="w-9/12 flex justify-center bg-[#00000038]">
                            <div style={{ height: "100%", backgroundImage: `url(http://localhost:3001/uploads/${post.File.name})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} 
                            className="w-11/12">
                                <div className="w-full h-10 flex items-center">
                                    <button className="mx-4 w-20 h-6 w-auto text-[#b15f5f]" onClick={() => { navigate("/") }}><BsArrowLeftCircleFill size={22} /></button>
                                    <div className="text-2xl text-[#b15f5f]">post</div>                    
                                </div>
                            </div>
                        </div>
                        <div className={`${darkMode ? 'bg-[#23252b]' : 'bg-[#faf5ed]'} flex flex-col items-center w-3/12`}><h1 className="text-2xl text-white text-center font-semibold">commentaires</h1></div></div>
                </div>}



        </div>
    )
}
export default PostUnique;