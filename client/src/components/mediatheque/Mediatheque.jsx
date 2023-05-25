import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Select, Modal } from "antd";
import Dropzone from "dropzone";
import "./Mediatheque.css";
import { AuthContext } from '../../contexts/AuthContext';

// icons
import {MdDownload} from 'react-icons/md'
/* import { SocketContext } from "../utils/socket";
 */

/* const API_URL = process.env.REACT_APP_API_URL; */

// dropzone options
const dropzoneOptions = {
  maxFilesize: 150000, // MB
  addRemoveLinks: true,
  dictRemoveFile: "Annuler",
  dictCancelUpload: "Annuler",
  chunking: true,
  forceChunking: true,
  retryChunks: true,
  retryChunksLimit: 3,
  chunkSize: 10000000,
  acceptedFiles: ".mp4, image/*, application/pdf ",
  url: `http://localhost:3001/files/upload-chunk`,
};

function Mediatheque(
  
) {
  const [listOfFiles, setListOfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  /* const socket = useContext(SocketContext); */
  const { userAuthenticated } = useContext(AuthContext);

  const inputRef = useRef(null)

  console.log(userAuthenticated)


  useEffect(() => {
    // afin de ne pas avoir l'id de l'utilisateur dans le context, on utilise l'email:
    console.log(userAuthenticated.email);
    let email = userAuthenticated.email
    axios.get(`http://localhost:3001/files/byUserEmail/${email}`).then((response) => {
      setListOfFiles(response.data);
    });
  }, []);

  const styleInput= {
    position: "absolute",
    marginTop: 3,
    marginLeft: 3,
    height: 1,
    width: 1,
    zIndex: -5,
}
  const handleCallClickInput = (e)=>{inputRef.current.click()
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };
 /*  const postDropzone = () => {
    if (!myDropzone.current) {
      myDropzone.current = new Dropzone(dropzoneRef.current, dropzoneOptions);
      myDropzone.current.on("success", (file) => {
        console.log(file);
        console.log("success");
        console.log(file);
        let json = {
          dztotalchunkcount: file.upload.totalChunkCount,
          dzuuid: file.upload.uuid,
          size: file.size,
          filename: file.name,
          mime_type: file.type,
        };
        axios.post(`http://localhost:3001/files/merge-chunk`, json).then((response) => {
          console.log(response);
        });
      });
      myDropzone.current.on("error", (err) => {
        console.log(err);
      });
    }
  };
 */
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:3001/upload', formData)
      .then((res) => {
        console.log(res.data);
        // Traitez la réponse du serveur ici si nécessaire
      })
      .catch((err) => {
        console.error(err);
        // Gérez les erreurs ici si nécessaire
      });
  };
  return (
    <>
     <input style={styleInput} type="file" ref={inputRef} onClick={()=>{console.log("hello")}} onChange={handleFileChange} />
        <div
          onClick={handleCallClickInput}
          className=" h-[50px] rounded-[50px]"
        ><div className=" btn-slide2 cursor-pointer" > 
          <span className="circle2 flex items-center justify-center">
            <MdDownload size={20}/></span><span className="title2">Upload</span>  
          <span className="title-hover2">Click here</span>
        </div>
      
        </div>
      <div
        style={{
          boxShadow: " 0px 0px 12px -4px rgb(122,122,122)",
          marginTop: 52,
          width: "100%",
          padding: "18px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
       
        <div
          className="Mediatheque"
          style={{
            overflowY: "auto",
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            padding: 8,
            marginTop: 12,
            borderRadius: 2,
            maxHeight: 700,
            borderTop: "2px solid dodgerblue",
          }}
        >
          {listOfFiles.map((file, key) => {
            return (
                <div>{file.name}</div>
             
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Mediatheque;
