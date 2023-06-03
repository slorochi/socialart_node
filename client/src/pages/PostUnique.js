import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";

// contexts
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
function PostUnique() {
    const { userAuthenticated } = useContext(AuthContext);

    const commentRef = useRef();
    const { darkMode } = useContext(ThemeContext);
    const [post, setPost] = useState();
    const [user, setUser] = useState();

    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const postId = params.id;
    const navigate = useNavigate();
    // further feature: add the users comments in the top of the post (personnal comment);

    useEffect(() => {
        if (userAuthenticated) {
            console.log(userAuthenticated.email);
            axios.get(`http://localhost:3001/users/byEmail/${userAuthenticated.email}`).then((response) => {
                console.log(response.data);
                console.log(response.data.id);
                setUser(response.data);

            })
        }
       
    }, [userAuthenticated])

    useEffect(()=>{
        console.log(postId);
        axios.get(`http://localhost:3001/posts/${postId}`).then((response) => {
            console.log(response.data);
            setPost(response.data);
            setIsLoading(false);

        }).catch(err => console.log(err));
    },[postId])
    const handlePushComment = () => {
        const comm = commentRef.current.value;
        const commToPub = { content: comm, UserId: user.id, PostId: parseInt(postId, 10) };
        console.log(commToPub);
        axios.post("http://localhost:3001/comments", commToPub).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="main flex flex-col max-h-screen relative top-[0px] h-screen  items-center ">
            {isLoading ? <div>loading</div> :
                <div style={{ height: 'calc(100% - 60px)' }} className="  w-full flex-col relative top-[60px]">


                    <div className="flex w-full h-full">
                        {/* cont image */}
                        <div className="w-9/12 flex justify-center bg-[#00000038]">
                            <div style={{ height: "100%", backgroundImage: `url(http://localhost:3001/uploads/${post.File.name})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                                className="w-11/12">
                                <div className="w-full h-10 flex items-center">
                                    <button className="mx-4 w-20 h-6 w-auto text-[#b15f5f]" onClick={() => { navigate("/") }}><BsArrowLeftCircleFill size={22} /></button>
                                    <div className="text-2xl text-[#b15f5f]">post</div>
                                </div>
                            </div>
                        </div>
                        {/* cont commentaires */}
                        <div className={`${darkMode ? 'bg-[#23252b]' : 'bg-[#faf5ed]'} flex flex-col overflow-auto w-3/12 p-3`}>
                            <div className="flex items-center justify-start">
                                <div className="h-20 w-20 rounded-[20px] mr-2" style={{ backgroundImage: post.User.profile_pic ? `url(http://localhost:3001/uploads/${post.User.profile_pic.name})` : `url(${process.env.PUBLIC_URL}/25_04_01.png)`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>
                                <span className={`${darkMode ? 'text-white' : 'text-[#46474e]'} text-xl font-semibold`}>{post.User.username} test </span>
                            </div>
                            {/*  */}
                            <hr className={`  mt-2 border-1 rounded-md border-[#46474e] `}></hr>
                            <hr className={` mb-2   border-1 rounded-md border-[#46474e] `}></hr>
                            <h1 className="text-center  min-h-[32px] overflow-auto max-h-[64px] text-2xl mb-2 text-[#676e7c] font-bold">{post.title}</h1>
                            <hr className={`  mt-2 border-1 rounded-md border-[#46474e] `}></hr>
                            <hr className={` mb-2   border-1 rounded-md border-[#46474e] `}></hr>
                            <p className="max-h-[216px]  min-h-[32px]  overflow-auto ">{post.description}</p>
                            <hr className={`  my-2 border-1 rounded-md border-[#46474e] `}></hr>
                            <div>
                                {user ?
                                    <div className="flex min-h-20 h-auto items-center w-full">
                                        <div className="h-12 w-12 rounded-[14px] mr-2" style={{ backgroundImage: user.profile_pic ? `url(http://localhost:3001/uploads/${user.profile_pic.name})` : `url(${process.env.PUBLIC_URL}/25_04_01.png)`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                                        </div>
                                        <div style={{ width: " calc(100% - 56px)" }} className="h-full flex justify-between items-center">
                                            <textarea ref={commentRef} style={{ width: "calc(100% - 100px)", height: "auto", overflowWrap: "break-word" }}
                                                className="bg-inherit min-h-14 outline-none h-auto "
                                                placeholder="répondre quelque chose"></textarea>
                                            <button type="button" className=" h-8 w-[81px] text-sm font-medium rounded-[17px] text-white bg-[#b15f5f]" onClick={() => { handlePushComment() }} >répondre</button>
                                        </div>
                                    </div> : <div>conectez vous afin de publier</div>}
                                <hr className={`  my-2 border-1 rounded-md border-[#46474e] `}></hr>
                                {post.Comments.slice(0, 20).map((comment) => {
                                    return (
                                        <><div key={comment.id} className="flex min-h-20 h-auto items-center w-full">
                                            <div className="h-10 w-10 rounded-[20px] mr-2" style={{ backgroundImage: comment.User.profile_pic ? `url(http://localhost:3001/uploads/${comment.User.profile_pic.name})` : `url(${process.env.PUBLIC_URL}/25_04_01.png)`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                                            </div>
                                            <div style={{ width: " calc(100% - 56px)" }} className="h-full flex flex-col ">
                                                <p className="text-[#65676d] break-words">{comment.User.username ? comment.User.username : "utilisateur"}</p>
                                                <p className="ml-2 break-words">{comment.content}</p>
                                            </div>

                                        </div><hr className={`  my-2 border-1 rounded-md border-[#46474e] `}></hr></>

                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>}



        </div>
    )
}
export default PostUnique;