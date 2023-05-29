import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Select, Modal } from "antd";
import Dropzone from "dropzone";
import "./Mediatheque.css";
import { AuthContext } from '../../contexts/AuthContext';

// icons
import { MdDownload } from 'react-icons/md'
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
  props
) {
  const { selectedFile, setSelectedFile, userFile, urlFileChosen, setUrlFileChosen, darkMode } = props;

  console.log(userFile);

  const inputRef = useRef(null)


  const styleInput = {
    position: "absolute",
    marginTop: 3,
    marginLeft: 3,
    height: 1,
    width: 1,
    zIndex: -5,
  }
  const handleCallClickInput = (e) => {
    inputRef.current.click();
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();

    // L'événement déclenché lorsque la lecture est complète
    reader.onload = function (e) {
      console.log(e.target.result);
      setUrlFileChosen(e.target.result);
      // On change l'URL de l'image (base64)
    }

    // On lit le fichier "picture" uploadé
    reader.readAsDataURL(event.target.files[0])
    console.log(selectedFile);
  };


  return (
    <>

      <input style={styleInput} type="file" ref={inputRef} onChange={handleFileChange} />
      <div
        onClick={handleCallClickInput}
        className=" h-[50px] rounded-[50px] mb-4"
      ><div className={`${darkMode ? 
      'btn-slide-dark' : 'btn-slide-light'} btn-slide2 cursor-pointer`} >
          <span className="circle2 text-white flex items-center justify-center">
            <MdDownload size={20} /></span><span className="title2">Upload</span>
          <span className="title-hover2">Click here</span>
        </div>

      </div>
      {urlFileChosen ? <img src={`${urlFileChosen}`} className="h-[200px] w-auto" height="200" width={"auto"} alt="Prévisualisation de l'image…" /> :
        <img className="h-[200px] w-auto" src={`http://localhost:3001/uploads/${userFile?.name}`} height="200" width={"auto"} alt="Prévisualisation de l'image…" />}

    </>
  );
}

export default Mediatheque;
