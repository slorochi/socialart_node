import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { Select, Modal } from "antd";
import Dropzone from "dropzone";
import "./Mediatheque.css";
import { AuthContext } from '../../contexts/AuthContext';

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
  const [dropMessage, setDropMessage] = useState("no-class");
  /* const socket = useContext(SocketContext); */
  const { userAuthenticated } = useContext(AuthContext);


  console.log(userAuthenticated)
  const dropzoneRef = useRef("");
  const myDropzone = useRef("");

  useEffect(() => {
    // afin de ne pas avoir l'id de l'utilisateur dans le context, on utilise l'email:
    console.log(userAuthenticated.email);
    let email = userAuthenticated.email
    axios.get(`http://localhost:3001/files/byUserEmail/${email}`).then((response) => {
      setListOfFiles(response.data);
    });
    postDropzone();
  }, []);

  // dropzone div

  //actualiser la liste des épisodes lors d'un changement
  /* socket.on("refreshMediathequeUi", function (data) {
    console.log(data);
    setListOfFiles(data);
    setListOfFilteredFiles(data);
  });
 */

  /* #TODO: vérifier sur le delete d'un file qu'il n'est pas lié à un post*/
  /* const deleteFile = (id) => {
    axios.delete(`${API_URL}/files/${id}`).then((response) => {
      console.log(response);
    });
  }; */
  const postDropzone = () => {
    if (!myDropzone.current) {
      myDropzone.current = new Dropzone(dropzoneRef.current, dropzoneOptions);
      // si on ajoute un fichier, display none le message dans la dropbox
      myDropzone.current.on("addedfile", (file) => {
        setDropMessage("dz-message");
      });
      // myDropzone.current.on("error", (file) => console.log("erreur", file));
      // si on annule un fichier le message s'affiche a nouveau
      myDropzone.current.on("removedfile", () => setDropMessage("no-class"));
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
          /* socket.emit("askRefresh"); */
          console.log(response);
        });
      });
      myDropzone.current.on("error", (err) => {
        console.log(err);
      });
    }
  };


  return (
    <>
      <div
        style={{
          /*   border: "2px solid black", */
          padding: "18px 28px",
          borderRadius: 4,
          boxShadow: " 0px 0px 12px -4px rgb(122,122,122)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "360px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Télécharger votre fichier</h2>
        <div
          className="dropzone drop-container"
          /*    id="drop-form" */
          ref={dropzoneRef}
        ></div>
      </div>
      <div
        style={{
          boxShadow: " 0px 0px 12px -4px rgb(122,122,122)",
          marginTop: 22,
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
