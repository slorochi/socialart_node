import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function PostUnique() {

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
            {isLoading ? <div>loading</div> : <div style={{ height: 'calc(100% - 60px)' }} className=" border-2 border-[#b15f5f] w-11/12 flex-col relative top-[60px]">
                <div className="w-full h-10 flex items-center">        <button className="mx-4 w-20 h-6 w-auto text-[#b15f5f]" onClick={() => { console.log("cc") }}><BsArrowLeftCircleFill size={22} /></button>
                    <div className="text-2xl text-[#b15f5f]">post</div>                    </div>

                <div style={{ height: 'calc(100% - 44px)'}} className="flex w-full h-full"><div style={{ height: "100%", backgroundImage: `url(http://localhost:3001/uploads/${post.File.name})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="w-9/12"></div>
                <div className="flex flex-col items-center w-3/12"><h1 className="text-2xl text-white text-center font-semibold">commentaires</h1></div></div>
            </div>}



        </div>
    )
}
export default PostUnique;